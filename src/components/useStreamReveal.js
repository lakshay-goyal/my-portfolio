import { useEffect } from "react";

const STEP_MS = 70;
const MIN_STEP_MS = 24;

// Streams every [data-reveal] element inside `rootRef` into view one at a time,
// in document order (top to bottom). Elements already on screen when the page
// loads stream immediately; elements further down stream as they scroll in.
// Content rendered later (e.g. fetched blog posts) is picked up automatically.
export default function useStreamReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reveal = (node) => node.setAttribute("data-revealed", "");
    const pending = () => root.querySelectorAll("[data-reveal]:not([data-revealed])");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      const revealAll = () => pending().forEach(reveal);
      revealAll();
      const mutations = new MutationObserver(revealAll);
      mutations.observe(root, { childList: true, subtree: true });
      return () => mutations.disconnect();
    }

    const queue = [];
    const observed = new WeakSet();
    let timer = null;

    const flush = () => {
      const node = queue.shift();
      if (!node) {
        timer = null;
        return;
      }
      reveal(node);
      // Speed up when a lot is waiting (fast scroll) so nothing lags behind.
      timer = window.setTimeout(flush, Math.max(MIN_STEP_MS, STEP_MS - queue.length * 6));
    };

    const intersections = new IntersectionObserver((entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target);
      if (!entering.length) return;
      entering.forEach((node) => intersections.unobserve(node));
      queue.push(...entering);
      queue.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      if (!timer) timer = window.setTimeout(flush, 0);
    }, { rootMargin: "0px 0px -6% 0px" });

    const observeNew = () => {
      pending().forEach((node) => {
        if (observed.has(node)) return;
        observed.add(node);
        intersections.observe(node);
      });
    };

    observeNew();
    const mutations = new MutationObserver(observeNew);
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      intersections.disconnect();
      mutations.disconnect();
    };
  }, [rootRef]);
}

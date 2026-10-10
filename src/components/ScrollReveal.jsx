import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "" }) {
  const element = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });
    observer.observe(element.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={element} className={`translate-y-[18px] opacity-0 transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : ""} ${className}`}>{children}</div>;
}

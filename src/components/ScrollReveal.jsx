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

  return <div ref={element} className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import ThemeContext from "./theme-context";

const THEME_STORAGE_KEY = "portfolio-theme";
const TRANSITION_DURATION = 1000;

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === "light" ? "light" : "dark";
};

const getReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const playFlickerSound = (direction) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioContext = new AudioContext();
  const now = audioContext.currentTime;
  const masterGain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  const frequencies = direction === "to-light" ? [180, 420, 760] : [760, 420, 170];

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(900, now);
  filter.Q.setValueAtTime(7, now);
  masterGain.gain.setValueAtTime(0.0001, now);
  masterGain.gain.exponentialRampToValueAtTime(0.12, now + 0.015);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);

  filter.connect(masterGain);
  masterGain.connect(audioContext.destination);

  frequencies.forEach((frequency, index) => {
    const start = now + index * 0.075;
    const oscillator = audioContext.createOscillator();
    const pulseGain = audioContext.createGain();

    oscillator.type = index % 2 === 0 ? "square" : "sawtooth";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.32, start + 0.045);
    pulseGain.gain.setValueAtTime(0.0001, start);
    pulseGain.gain.exponentialRampToValueAtTime(0.22, start + 0.01);
    pulseGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.065);

    oscillator.connect(pulseGain);
    pulseGain.connect(filter);
    oscillator.start(start);
    oscillator.stop(start + 0.075);
  });

  window.setTimeout(() => audioContext.close(), 500);
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("portfolio-light", theme === "light");
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  const toggleTheme = useCallback(
    (triggerElement) => {
      if (isTransitioning) return;

      const nextTheme = theme === "light" ? "dark" : "light";
      const rect = triggerElement?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const direction = nextTheme === "light" ? "to-light" : "to-dark";
      playFlickerSound(direction);

      window.clearTimeout(timeoutRef.current);
      setIsTransitioning(true);

      const commitTheme = () => {
        flushSync(() => setTheme(nextTheme));
      };

      if (getReducedMotion() || !document.startViewTransition) {
        commitTheme();
        timeoutRef.current = window.setTimeout(() => setIsTransitioning(false), 150);
        return;
      }

      document.documentElement.dataset.themeTransition = direction;
      const viewTransition = document.startViewTransition(commitTheme);

      viewTransition.ready
        .then(() => {
          const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`];
          document.documentElement.animate(
            {
              clipPath: direction === "to-light" ? clipPath : [...clipPath].reverse(),
            },
            {
              duration: TRANSITION_DURATION,
              easing: "cubic-bezier(0.72, 0, 0.22, 1)",
              fill: "both",
              pseudoElement: direction === "to-light" ? "::view-transition-new(root)" : "::view-transition-old(root)",
            }
          );
        })
        .catch(() => {
          setIsTransitioning(false);
          delete document.documentElement.dataset.themeTransition;
        });

      viewTransition.finished.finally(() => {
        setIsTransitioning(false);
        delete document.documentElement.dataset.themeTransition;
      });
    },
    [isTransitioning, theme]
  );

  const value = useMemo(
    () => ({
      isLight: theme === "light",
      isTransitioning,
      theme,
      toggleTheme,
    }),
    [isTransitioning, theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider };

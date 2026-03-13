import { useState, useEffect, useRef } from "react";

export default function useTyping(lines, deps) {
  const [displayed, setDisplayed] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayed([]);
    let i = 0;

    function next() {
      if (i >= lines.length) return;
      const idx = i;
      i++;
      setDisplayed((prev) => [...prev, lines[idx]]);
      const isEmpty =
        lines[idx].length === 0 ||
        (lines[idx].length === 1 && lines[idx][0] === "");
      const delay = isEmpty ? 6 : 16 + Math.random() * 8;
      timerRef.current = setTimeout(next, delay);
    }

    next();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return displayed;
}

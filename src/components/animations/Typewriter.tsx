import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  speed?: number;
  erase?: boolean;
  onDone?: () => void;
};

export default function Typewriter({
  text,
  speed = 45,
  erase = false,
  onDone,
}: TypewriterProps) {
  const [display, setDisplay] = useState(erase ? text : "");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout: any;
    if (!erase) {
      // Digitando
      if (display.length < text.length) {
        timeout = setTimeout(() => setDisplay(text.slice(0, display.length + 1)), speed);
      } else if (!done) {
        setDone(true);
        onDone?.();
      }
    } else {
      // Apagando
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(text.slice(0, display.length - 1)), speed / 1.5);
      } else if (!done) {
        setDone(true);
        onDone?.();
      }
    }
    return () => clearTimeout(timeout);
  }, [display, text, speed, erase, done, onDone]);

  useEffect(() => {
    setDisplay(erase ? text : "");
    setDone(false);
    // eslint-disable-next-line
  }, [erase, text]);

  return <span>{display}</span>;
}

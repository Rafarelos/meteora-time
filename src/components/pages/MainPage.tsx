import MinClockAnalog from "@/components/MinClockAnalog";
import Typewriter from "@/components/animations/Typewriter";
import FadeInOut from "@/components/animations/FadeInOut";
import { useState, useEffect } from "react";

type Props = {
  aoAvancar: () => void;
};

export default function MainPage({ aoAvancar }: Props) {
  const [showDesc, setShowDesc] = useState(false);
  const [eraseTitle, setEraseTitle] = useState(false);
  const [eraseDesc, setEraseDesc] = useState(false);
  const [hideClock, setHideClock] = useState(false);

  // controle animação do título
  useEffect(() => {
    if (!eraseTitle && !eraseDesc) {
      const timer = setTimeout(() => setShowDesc(true), 900);
      return () => clearTimeout(timer);
    }
  }, [eraseTitle, eraseDesc]);

  // Controle das animações
  function handleAvancar() {
    setEraseDesc(true);
    setTimeout(() => setEraseTitle(true), 500);
    setTimeout(() => setHideClock(true), 900);
    setTimeout(() => aoAvancar(), 1700);
  }

  return (
    <div
      onClick={handleAvancar}
      className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 cursor-pointer w-full select-none"
    >
      <div className="mb-8 text-4xl font-mono text-white">
        <Typewriter text="Meteora Time" erase={eraseTitle} speed={38} />
      </div>
      <FadeInOut show={!hideClock} className="mb-8">
        <MinClockAnalog />
      </FadeInOut>
      <div className="text-neutral-400 text-lg font-mono min-h-[32px] mt-4">
        {showDesc && (
          <Typewriter
            text="Clique em qualquer lugar da tela para inicializar"
            erase={eraseDesc}
            speed={17}
          />
        )}
      </div>
    </div>
  );
}

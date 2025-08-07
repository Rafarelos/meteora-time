import { Globe, Timer, Hourglass, AlarmClock } from "lucide-react";
import { useState, useEffect } from "react";
import MinClockAnalogMini from "@/components/MinClockAnalogMini";
import Cronometro from "@/components/pages/Cronometro";
import Temporizador from "@/components/pages/Temporizador";
import RelMundi from "@/components/pages/RelMundi";
import FadeInOut from "@/components/animations/FadeInOut";
import Typewriter from "@/components/animations/Typewriter";
import SlideDoCentro from "@/components/animations/SlideDoCentro";
import SlidePagina from "@/components/animations/SlidePagina";

const abas = [
  { value: "relogioMundial", icon: Globe },
  { value: "cronometro", icon: Timer },
  { value: "timer", icon: Hourglass },
  { value: "alarme", icon: AlarmClock },
];

export default function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState("relogioMundial");
  const [abaAnterior, setAbaAnterior] = useState("relogioMundial");

  // Controle dos fades
  const [showMiniClock, setShowMiniClock] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  // Animações graduais ao entrar
  useEffect(() => {
    setTimeout(() => setShowMiniClock(true), 500);
    setTimeout(() => setShowTitle(true), 1200);
    setTimeout(() => setShowFooter(true), 2800);
  }, []);

  // Determina direção do slide (baseado no índice da aba)
  const direcaoSlide =
    abas.findIndex((a) => a.value === abaAtiva) >
    abas.findIndex((a) => a.value === abaAnterior)
      ? "direita"
      : "esquerda";

  function trocarAba(novaAba: string) {
    setAbaAnterior(abaAtiva);
    setAbaAtiva(novaAba);
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-4">
      <header className="flex items-center justify-between w-full px-6 py-4">
        <div className="flex items-center gap-3">
          <FadeInOut show={showMiniClock} duration={0.7}>
            <MinClockAnalogMini />
          </FadeInOut>
          <div className="ml-2 text-4xl font-mono text-white">
            {showTitle && <Typewriter text="Meteora Time" speed={42} />}
          </div>
        </div>
      </header>
      <main className="flex-1 flex justify-center items-center w-full px-4 py-8 mb-16 relative overflow-x-hidden">
        <SlidePagina direcao={direcaoSlide} keyPagina={abaAtiva}>
          {abaAtiva === "relogioMundial" && <RelMundi />}
          {abaAtiva === "cronometro" && <Cronometro />}
          {abaAtiva === "timer" && <Temporizador />}
          {abaAtiva === "alarme" && (
            <div className="text-neutral-400 font-mono text-xl">
              Alarme (em breve!)
            </div>
          )}
        </SlidePagina>
      </main>
      <footer className="w-full flex justify-around items-center py-3 bg-neutral-950 fixed bottom-0 left-0 z-20">
        {abas.map(({ value, icon: Icon }, i) => (
          <SlideDoCentro
            key={value}
            show={showFooter}
            duration={0.7}
            direction={i < 2 ? "left" : "right"}
            delay={i * 0.13}
          >
            <button
              onClick={() => trocarAba(value)}
              className={`flex flex-col items-center justify-center px-2 py-1 rounded transition-colors ${
                abaAtiva === value ? "text-[#ca8a04]" : "text-neutral-500"
              } focus:outline-none focus:ring-0`}
              style={{ background: "none", border: "none" }}
              aria-label={value}
            >
              <Icon size={38} strokeWidth={1.2} />
            </button>
          </SlideDoCentro>
        ))}
      </footer>
    </div>
  );
}

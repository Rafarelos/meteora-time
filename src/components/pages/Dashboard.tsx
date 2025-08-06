import { Globe, Timer, Hourglass, AlarmClock } from "lucide-react";
import { useState } from "react";
import MinClockAnalogMini from "@/components/MinClockAnalogMini";
import Cronometro from "@/components/pages/Cronometro";
import Temporizador from "@/components/pages/Temporizador";

let abas = [
  { value: "relogioMundial", icon: Globe },
  { value: "cronometro", icon: Timer },
  { value: "timer", icon: Hourglass },
  { value: "alarme", icon: AlarmClock },
];

export default function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState("relogioMundial");
  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-4">
      <header className="flex items-center justify-between w-full px-6 py-4">
        <div className="flex items-center gap-3">
          <MinClockAnalogMini />
          <span className="font-mono text-2xl text-white tracking-tight">
            Meteora Time
          </span>
        </div>
      </header>
      {/* Espaço para o conteúdo das funcionalidades */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8 mb-16">
        {/* Relógio com Fusos Horários Mundial */}
        {abaAtiva === "relogioMundial" && (
          <div className="text-neutral-400 font-mono text-xl">
            Relógio Mundial (em breve!)
          </div>
        )}

        {/* Cronômetro */}
        {abaAtiva === "cronometro" && <Cronometro />}

        {/* Temporizador */}
        {abaAtiva === "timer" && <Temporizador />}

        {/* Alarme de cria */}
        {abaAtiva === "alarme" && (
          <div className="text-neutral-400 font-mono text-xl">
            Alarme (em breve!)
          </div>
        )}
      </main>

      <footer className="w-full flex justify-around items-center py-3 bg-neutral-950 fixed bottom-0 left-0 z-20">
        {abas.map(({ value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setAbaAtiva(value)}
            className={`flex flex-col items-center justify-center px-2 py-1 rounded transition-colors ${
              abaAtiva === value ? "text-[#ca8a04]" : "text-neutral-500"
            } focus:outline-none focus:ring-0`}
            style={{ background: "none", border: "none" }}
            aria-label={value}
          >
            <Icon size={38} strokeWidth={1.2} />
          </button>
        ))}
      </footer>
    </div>
  );
}

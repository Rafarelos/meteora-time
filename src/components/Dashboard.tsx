import { Globe, Timer, Clock, AlarmClock } from "lucide-react";
import { useState } from "react";
import MinClockAnalogMini from "@/components/MinClockAnalogMini";

let abas = [
  { value: "relogioMundial", icon: Globe },
  { value: "cronometro", icon: Timer },
  { value: "timer", icon: Clock },
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
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8">
        <div className="text-neutral-400 font-mono text-xl">
          Escolha uma funcionalidade abaixo
        </div>
      </main>
      <footer className="w-full flex justify-around items-center py-3 bg-neutral-950 border-t border-neutral-800 fixed bottom-0 left-0 z-20">
        {abas.map(({ value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setAbaAtiva(value)}
            className={`flex flex-col items-center justify-center px-2 py-1 rounded transition-colors ${
              abaAtiva === value ? "text-[#ca8a04]" : "text-neutral-500"
            }`}
            style={{ background: "none", border: "none" }}
            aria-label={value}
          >
            <Icon size={28} strokeWidth={2.2} />
          </button>
        ))}
      </footer>
    </div>
  );
}

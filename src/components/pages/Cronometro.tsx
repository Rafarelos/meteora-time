import { useEffect, useRef, useState } from "react";

export default function Cronometro() {
  const [rodando, setRodando] = useState(false);
  const [tempo, setTempo] = useState(0); // em segundos

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (rodando) {
      intervalRef.current = setInterval(() => {
        setTempo(t => t + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [rodando]);

  // Formatação do tempo (h:m:s)
  function formatarTempo(segundos: number) {
    const h = String(Math.floor(segundos / 3600)).padStart(2, "0");
    const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
    const s = String(segundos % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  // Progresso do círculo
  const progressoMinuto = (tempo % 60) / 60;
  const tamanho = 300; // px
  const centro = tamanho / 2;
  const raio = centro - 10; // 10px de margem pra stroke
  const circunferencia = 2 * Math.PI * raio;
  const progressoStroke = progressoMinuto * circunferencia;

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative" style={{ width: tamanho, height: tamanho }}>
        <svg width={tamanho} height={tamanho} className="absolute left-0 top-0">
          
          {/* Círculo de fundo */}
          <circle
            cx={centro}
            cy={centro}
            r={raio}
            stroke="#333"
            strokeWidth={10}
            fill="none"
          />
          
          {/* Barra de progresso */}
          <circle
            cx={centro}
            cy={centro}
            r={raio}
            stroke="#ca8a04"
            strokeWidth={10}
            fill="none"
            strokeDasharray={circunferencia}
            strokeDashoffset={circunferencia - progressoStroke}
            strokeLinecap="round"
            style={{ 
              transition: "stroke-dashoffset 0.7s cubic-bezier(0.6,0,0.4,1)", 
              transform : "rotate(-90deg)",
              transformOrigin: "50% 50%"
            }}
          />
        </svg>
        {/* Cronometro em números */}
        <span className="font-mono text-5xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 select-none">
          {formatarTempo(tempo)}
        </span>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setRodando(v => !v)}
          className={`px-7 py-2 rounded text-lg font-mono transition-colors
            ${rodando ? "bg-red-800 text-white" : "bg-[#ca8a04] text-black"}
            shadow hover:scale-105 active:scale-95`}
        >
          {rodando ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={() => { setTempo(0); setRodando(false); }}
          className="px-7 py-2 rounded text-lg font-mono bg-neutral-800 text-white transition-colors hover:bg-neutral-700 shadow"
          disabled={tempo === 0}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

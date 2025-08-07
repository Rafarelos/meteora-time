import { useEffect, useRef, useState } from "react";

// Modal simples para editar o temporizador
function ModalEditarTempo({
  aberto,
  onClose,
  onSalvar,
  hInicial,
  mInicial,
  sInicial,
}: {
  aberto: boolean;
  onClose: () => void;
  onSalvar: (h: number, m: number, s: number) => void;
  hInicial: number;
  mInicial: number;
  sInicial: number;
}) {
  const [h, setH] = useState(hInicial);
  const [m, setM] = useState(mInicial);
  const [s, setS] = useState(sInicial);

  useEffect(() => {
    setH(hInicial);
    setM(mInicial);
    setS(sInicial);
  }, [hInicial, mInicial, sInicial, aberto]);

  if (!aberto) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-neutral-900 rounded-lg p-8 shadow-lg w-[320px]">
        <h2 className="font-mono text-xl mb-4 text-white">
          Editar Temporizador
        </h2>
        <div className="flex gap-2 mb-6">
          <input
            type="number"
            min={0}
            max={23}
            value={h}
            onChange={(e) => setH(Number(e.target.value))}
            className="w-14 p-2 rounded bg-neutral-800 text-white text-center font-mono text-lg"
            placeholder="hh"
          />
          <span className="text-white text-xl font-mono">:</span>
          <input
            type="number"
            min={0}
            max={59}
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
            className="w-14 p-2 rounded bg-neutral-800 text-white text-center font-mono text-lg"
            placeholder="mm"
          />
          <span className="text-white text-xl font-mono">:</span>
          <input
            type="number"
            min={0}
            max={59}
            value={s}
            onChange={(e) => setS(Number(e.target.value))}
            className="w-14 p-2 rounded bg-neutral-800 text-white text-center font-mono text-lg"
            placeholder="ss"
          />
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-neutral-700 text-white font-mono"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSalvar(h, m, s)}
            className="px-4 py-2 rounded bg-[#ca8a04] text-black font-mono"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Temporizador() {
  // Tempo inicial definido pelo usuário (em segundos)
  const [tempoInicial, setTempoInicial] = useState(5 * 60); // começa com 5 min
  const [tempoRestante, setTempoRestante] = useState(tempoInicial);
  const [rodando, setRodando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  // NOVO: Modal de alerta de tempo esgotado + áudio em loop
  const [modalAlertaAberto, setModalAlertaAberto] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Atualiza tempo restante quando o usuário altera o tempo inicial
  useEffect(() => {
    setTempoRestante(tempoInicial);
  }, [tempoInicial]);

  // Lógica de contagem regressiva
  useEffect(() => {
    if (rodando && tempoRestante > 0) {
      intervalRef.current = setInterval(() => {
        setTempoRestante((t) => Math.max(t - 1, 0));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [rodando, tempoRestante]);

  // Alerta ao finalizar (sonoro + modal)
  useEffect(() => {
    if (tempoRestante === 0 && rodando) {
      setRodando(false);
      setModalAlertaAberto(true);
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/Cute-Chime-1.mp3");
        audioRef.current.loop = true;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    // eslint-disable-next-line
  }, [tempoRestante, rodando]);

  // Formatação do tempo (h:m:s)
  function formatarTempo(segundos: number) {
    const h = String(Math.floor(segundos / 3600)).padStart(2, "0");
    const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
    const s = String(segundos % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  // Progresso do círculo: 1 → 0
  const progresso = tempoRestante / tempoInicial;
  const tamanho = 300;
  const centro = tamanho / 2;
  const raio = centro - 10;
  const circunferencia = 2 * Math.PI * raio;
  const progressoStroke = progresso * circunferencia;

  // Temporizador numérico
  const h = Math.floor(tempoRestante / 3600);
  const m = Math.floor((tempoRestante % 3600) / 60);
  const s = tempoRestante % 60;

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Modal Alert*/}
      {modalAlertaAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-neutral-900 rounded-lg p-8 shadow-lg w-[320px] flex flex-col items-center">
            <h2 className="font-mono text-2xl mb-4 text-[#ca8a04] text-center">
              Tempo Esgotado!
            </h2>
            <button
              onClick={() => {
                setModalAlertaAberto(false);
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
              }}
              className="mt-2 px-6 py-2 rounded bg-[#ca8a04] text-black font-mono text-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      <ModalEditarTempo
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
        onSalvar={(h, m, s) => {
          const novoTempo = h * 3600 + m * 60 + s;
          setTempoInicial(novoTempo > 0 ? novoTempo : 1); // não deixa zerar
          setModalAberto(false);
        }}
        hInicial={h}
        mInicial={m}
        sInicial={s}
      />
      <div className="mb-8 mt- text-3xl font-mono text-neutral-200 tracking-tight text-center flex items-center justify-center gap-4 w-full">
        <span>Temporizador</span>
      </div>
      {/* Temporizador */}
      <div className="relative" style={{ width: tamanho, height: tamanho }}>
        <svg width={tamanho} height={tamanho} className="absolute left-0 top-0">
          {/* Círculo dourado (fundo) */}
          <circle
            cx={centro}
            cy={centro}
            r={raio}
            stroke="#ca8a04"
            strokeWidth={10}
            fill="none"
          />

          {/* Barra de progresso */}
          <circle
            cx={centro}
            cy={centro}
            r={raio}
            stroke="#333"
            strokeWidth={11}
            fill="none"
            strokeDasharray={circunferencia}
            strokeDashoffset={progressoStroke}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.7s cubic-bezier(0.6,0,0.4,1)",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>

        {/* Temporizador Numérico */}
        <button
          className={`font-mono text-5xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 select-none bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer ${
            rodando ? "pointer-events-none opacity-80" : "hover:text-[#ca8a04]"
          }`}
          onClick={() => !rodando && setModalAberto(true)}
          disabled={rodando}
          tabIndex={0}
        >
          {formatarTempo(tempoRestante)}
        </button>
      </div>

      {/* Botões */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setRodando((v) => !v)}
          className={`px-7 py-2 rounded text-lg font-mono transition-colors
            ${rodando ? "bg-red-800 text-white" : "bg-[#ca8a04] text-black"}
            shadow hover:scale-105 active:scale-95`}
          disabled={tempoRestante === 0}
        >
          {rodando ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={() => {
            setTempoRestante(tempoInicial);
            setRodando(false);
          }}
          className="px-7 py-2 rounded text-lg font-mono bg-neutral-800 text-white transition-colors hover:bg-neutral-700 shadow"
          disabled={tempoRestante === tempoInicial}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

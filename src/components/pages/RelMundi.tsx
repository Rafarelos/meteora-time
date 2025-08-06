import { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";

// Fusos horários manuais
const timezones = [
  {
    nome: "São Paulo",
    pais: "Brasil",
    timezone: "America/Sao_Paulo",
    bandeira: "🇧🇷",
  },
  {
    nome: "Nova York",
    pais: "EUA",
    timezone: "America/New_York",
    bandeira: "🇺🇸",
  },
  {
    nome: "Londres",
    pais: "Inglaterra",
    timezone: "Europe/London",
    bandeira: "🇬🇧",
  },
  { nome: "Tóquio", pais: "Japão", timezone: "Asia/Tokyo", bandeira: "🇯🇵" },
  { nome: "Paris", pais: "França", timezone: "Europe/Paris", bandeira: "🇫🇷" },
  {
    nome: "Sydney",
    pais: "Austrália",
    timezone: "Australia/Sydney",
    bandeira: "🇦🇺",
  },
];

function fetchHoraCidade(timezone: string): Promise<string> {
  return fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
    .then((res) => res.json())
    .then((data) => data.datetime?.slice(11, 16) ?? "--:--")
    .catch(() => "--:--");
}

export default function RelogioMundial() {
  const [cidades, setCidades] = useState(timezones.slice(0, 4)); // Começa com 4 cidades
  const [modalAdd, setModalAdd] = useState(false);
  const [novaCidade, setNovaCidade] = useState<string>(timezones[0].timezone);

  // Atualiza os horários a cada 5s
  useEffect(() => {
    let ativo = true;
    async function atualizarHoras() {
      const atualizadas = await Promise.all(
        cidades.map(async (cidade) => ({
          ...cidade,
          horario: await fetchHoraCidade(cidade.timezone),
        }))
      );
      if (ativo) setCidades(atualizadas);
    }
    atualizarHoras();
    const interval = setInterval(atualizarHoras, 5_000);
    return () => {
      ativo = false;
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [cidades.length]);

  // Adiciona cidade
  function adicionarCidade() {
    if (!novaCidade) return;
    const info = timezones.find((tz) => tz.timezone === novaCidade);
    if (!info || cidades.some((c) => c.timezone === novaCidade)) return;
    setCidades([...cidades, info]);
    setModalAdd(false);
  }

  // Remove cidade
  function removerCidade(idx: number) {
    setCidades(cidades.filter((_, i) => i !== idx));
  }

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-4 relative">
      <div className="mb-6 mt-4 text-3xl font-mono text-neutral-200 tracking-tight text-center flex items-center justify-center gap-4 w-full">
        <span>Relógio Mundial</span>
        {/* Botão add cidade - mobile */}
        <button
          className="block lg:hidden ml-2 px-3 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border-2 border-[#22c55e] flex items-center justify-center transition"
          onClick={() => setModalAdd(true)}
          title="Adicionar cidade"
        >
          <Plus size={28} color="#22c55e" />
        </button>
      </div>

      {/* Modal add cidade */}
      {modalAdd && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-lg p-8 flex flex-col gap-4 shadow-lg w-[340px]">
            <h2 className="font-mono text-2xl text-white mb-2">
              Adicionar cidade
            </h2>
            <select
              className="p-2 rounded font-mono bg-neutral-800 text-white text-lg"
              value={novaCidade}
              onChange={(e) => setNovaCidade(e.target.value)}
            >
              <option value="">-- selecione --</option>
              {timezones
                .filter(
                  (tz) => !cidades.some((c) => c.timezone === tz.timezone)
                )
                .map((tz) => (
                  <option key={tz.timezone} value={tz.timezone}>
                    {tz.nome} — {tz.pais}
                  </option>
                ))}
            </select>
            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 px-4 py-2 rounded bg-[#22c55e] text-black font-mono"
                onClick={adicionarCidade}
              >
                Adicionar
              </button>
              <button
                className="flex-1 px-4 py-2 rounded bg-neutral-700 text-white font-mono"
                onClick={() => setModalAdd(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards das cidades */}
      <div className="flex flex-col gap-4 items-center">
        {cidades.map((cidade, idx) => (
          <div
            key={cidade.timezone}
            className="bg-neutral-900/80 rounded-xl p-6 flex flex-col shadow-lg min-w-[350px] max-w-[520px] w-full"
          >
            <span className="text-3xl font-mono text-white flex items-center gap-2">
              {cidade.bandeira} {cidade.horario ?? "--:--"}
            </span>
            <span className="text-lg text-neutral-300">
              {cidade.nome} — {cidade.pais}
            </span>
            <div className="flex gap-2 mt-5 justify-end">
              {/* Botão Pencil (para futura edição, ainda não abre modal) */}
              <button
                className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-full flex items-center justify-center transition border border-neutral-700"
                title="Editar cidade (em breve)"
                disabled
              >
                <Pencil size={24} color="#ca8a04" />
              </button>
              {/* Botão Excluir */}
              <button
                className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-full flex items-center justify-center transition border border-neutral-700"
                onClick={() => removerCidade(idx)}
                title="Remover cidade"
              >
                <Trash size={24} color="#ca0404ff" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botão add cidade - desktop */}
      <button
          className="hidden lg:flex fixed bottom-28 right-12 w-20 rounded-full bg-neutral-900 hover:bg-neutral-800 border-2 border-[#22c55e] flex items-center justify-center transition"
          onClick={() => setModalAdd(true)}
          title="Adicionar cidade"
        >
          <Plus size={48} color="#22c55e" />
        </button>
    </div>
  );
}

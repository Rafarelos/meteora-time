import { useEffect, useState } from "react";

function getAngulo(valor: number, max: number) {
  return ((valor / max) * 360) - 90;
}

export default function RelogioMinimalista() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const hr = agora.getHours() % 12;
  const min = agora.getMinutes();
  const seg = agora.getSeconds();

  // Tamanhos e posições
  const raio = 70;
  const centro = 80;

  const anguloHr = getAngulo(hr * 5 + min / 12, 60);
  const anguloMin = getAngulo(min, 60);
  const anguloSeg = getAngulo(seg, 60);

  function ponteiro(angulo: number, tamanho: number, cor: string, largura: number) {
    const rad = (Math.PI / 180) * angulo;
    const x = centro + Math.cos(rad) * tamanho;
    const y = centro + Math.sin(rad) * tamanho;
    return (
      <line
        x1={centro}
        y1={centro}
        x2={x}
        y2={y}
        stroke={cor}
        strokeWidth={largura}
        strokeLinecap="round"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={160} height={160} className="drop-shadow-lg">
        {/* Marcador horas */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angulo = ((i / 12) * 2 * Math.PI) - Math.PI / 2;
          const raioExterno = 72;
          const raioInterno = 60;
          const x1 = centro + Math.cos(angulo) * raioInterno;
          const y1 = centro + Math.sin(angulo) * raioInterno;
          const x2 = centro + Math.cos(angulo) * raioExterno;
          const y2 = centro + Math.sin(angulo) * raioExterno;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#b2b2b2ff"
              strokeWidth={6}
              strokeLinecap="round"
            />
          );
        })}
        {/* Ponteiro hr */}
        {ponteiro(anguloHr, raio * 0.5, "#fff", 5)}
        {/* Ponteiro min */}
        {ponteiro(anguloMin, raio * 0.75, "#eee", 3)}
        {/* Ponteiro seg */}
        {ponteiro(anguloSeg, raio * 0.9, "#ca8a04", 2)}
        {/* Bolinha do centro */}
        <circle cx={centro} cy={centro} r={4} fill="#ca8a04" />
      </svg>
    </div>
  );
}

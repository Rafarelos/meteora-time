import { useEffect, useState } from "react";

export default function MiniRelogioAnalogo({ tamanho = 36 }: { tamanho?: number }) {
  const [agora, setAgora] = useState(new Date());
  useEffect(() => {
    const intervalo = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const horas = agora.getHours() % 12;
  const minutos = agora.getMinutes();
  const segundos = agora.getSeconds();

  const centro = tamanho / 2;
  const raio = tamanho / 2 - 2;

  function ponteiro(angulo: number, tamanhoRel: number, cor: string, largura: number) {
    const rad = (Math.PI / 180) * angulo;
    const x = centro + Math.cos(rad) * (raio * tamanhoRel);
    const y = centro + Math.sin(rad) * (raio * tamanhoRel);
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

  function getAngulo(valor: number, max: number) {
    return ((valor / max) * 360) - 90;
  }

  const anguloHora = getAngulo(horas * 5 + minutos / 12, 60);
  const anguloMinuto = getAngulo(minutos, 60);
  const anguloSegundo = getAngulo(segundos, 60);

  return (
    <svg width={tamanho} height={tamanho}>
      {/* Traços das horas */}
      {Array.from({ length: 12 }).map((_, i) => {
        const ang = ((i / 12) * 2 * Math.PI) - Math.PI / 2;
        const rExterno = raio;
        const rInterno = raio * 0.8;
        const x1 = centro + Math.cos(ang) * rInterno;
        const y1 = centro + Math.sin(ang) * rInterno;
        const x2 = centro + Math.cos(ang) * rExterno;
        const y2 = centro + Math.sin(ang) * rExterno;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
          />
        );
      })}
      {/* Ponteiros */}
      {ponteiro(anguloHora, 0.5, "#fff", 3)}
      {ponteiro(anguloMinuto, 0.7, "#eee", 2)}
      {ponteiro(anguloSegundo, 0.9, "#ca8a04", 1)}
      <circle cx={centro} cy={centro} r={2} fill="#ca8a04" />
    </svg>
  );
}
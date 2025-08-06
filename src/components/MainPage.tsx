import MinClockAnalog from "@/components/MinClockAnalog";

type Props = {
  aoAvancar: () => void
}

export default function MainPage({ aoAvancar }: Props) {
  return (
    <div
      onClick={aoAvancar}
      className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 cursor-pointer w-full"
    >
      <h1 className="text-4xl font-mono text-white mb-9">Meteora Time</h1>
      <MinClockAnalog />
      <p className="text-neutral-400 text-lg mt-7">
        Clique em qualquer lugar da tela para inicializar
      </p>
    </div>
  );
}

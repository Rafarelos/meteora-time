import { motion, AnimatePresence } from "framer-motion";

type SlidePaginaProps = {
  children: React.ReactNode;
  direcao: "esquerda" | "direita";
  keyPagina: string | number; // Mudando a key, faz animar!
};

export default function SlidePagina({ children, direcao, keyPagina }: SlidePaginaProps) {
  const eixoX = direcao === "direita" ? 150 : -150;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyPagina}
        initial={{ opacity: 0, x: eixoX }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -eixoX }}
        transition={{
          duration: 0.6,
          ease: [0.5, 0, 0.5, 1],
        }}
        className="w-full h-full flex justify-center items-center"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
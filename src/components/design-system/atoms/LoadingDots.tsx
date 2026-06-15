import { motion } from "framer-motion";

const Dot = ({ delay = 0 }: { delay?: number }) => (
  <motion.span
    className="h-2 w-2 rounded-full bg-contentPrimary"
    animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
    transition={{
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

export function LoadingDots() {
  return (
    <div className="flex items-center gap-2" role="status">
      <Dot delay={0} />
      <Dot delay={0.15} />
      <Dot delay={0.3} />
    </div>
  );
}

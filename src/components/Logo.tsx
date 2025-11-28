import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  animated?: boolean;
}

const Logo = ({ className = "", animated = true }: LogoProps) => {
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      }
    })
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 0.6,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      }
    }
  };

  if (!animated) {
    return (
      <div className={`relative inline-block ${className}`}>
        <span className="font-black text-2xl md:text-3xl tracking-tight">
          <span className="text-foreground">Es</span>
          <span className="text-primary ml-1">Venture</span>
        </span>
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="flex items-baseline overflow-hidden">
        <motion.span
          className="font-black text-2xl md:text-3xl tracking-tight text-foreground"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={letterVariants}
        >
          Es
        </motion.span>
        <motion.span
          className="font-black text-2xl md:text-3xl tracking-tight text-primary ml-1"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={letterVariants}
        >
          Venture
        </motion.span>
      </div>
      <motion.div
        className="absolute -bottom-1 left-0 w-full h-1 bg-primary origin-left"
        initial="hidden"
        animate="visible"
        variants={underlineVariants}
      />
    </div>
  );
};

export default Logo;

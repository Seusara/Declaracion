import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [rejectionCount, setRejectionCount] = useState(0);
  const [accepted, setAccepted] = useState<boolean>(() => {
    return localStorage.getItem("acceptedDate") !== null;
  });
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [acceptedDate, setAcceptedDate] = useState<string>(() => {
    return localStorage.getItem("acceptedDate") || "";
  });

  const sadMessages = [
    "¿Por qué no, Daisy? 😿",
    "Piénsalo otra vez...",
    "Me vas a romper el corazoncito 💔",
    "Daisy, dale una oportunidad... 🥺",
    "¿Segura? 😢",
    "Ay no, por favor... 😭",
    "Solo di que sí, Daisy... 🙏",
    "No me hagas esto 😿",
    "Cada 'No' me rompe el alma 💔",
  ];

  const catImages = [
    "/cats/1.jpg",
    "/cats/2.jpg",
    "/cats/3.jpg",
    "/cats/4.jpg",
    "/cats/5.jpg",
    "/cats/6.jpg",
    "/cats/7.jpg",
    "/cats/8.jpg",
    "/cats/9.jpg",
  ];

  const handleNoHover = () => {
    const maxX = window.innerWidth > 768 ? 200 : 100;
    const maxY = window.innerWidth > 768 ? 200 : 100;
    const randomX = Math.random() * maxX * (Math.random() > 0.5 ? 1 : -1);
    const randomY = Math.random() * maxY * (Math.random() > 0.5 ? 1 : -1);

    setNoButtonPosition({ x: randomX, y: randomY });
    setRejectionCount((prev) => prev + 1);
    setNoButtonSize((prev) => Math.max(0.3, prev - 0.1));
  };

  const handleYes = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setAcceptedDate(dateStr);
    localStorage.setItem("acceptedDate", dateStr);
    setAccepted(true);

    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFB6C1', '#FF69B4', '#FFC0CB', '#FF1493'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFB6C1', '#FF69B4', '#FFC0CB', '#FF1493'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  useEffect(() => {
    if (accepted) {
      const hearts = setInterval(() => {
        confetti({
          particleCount: 2,
          angle: 90,
          spread: 45,
          origin: { x: Math.random(), y: 1.2 },
          colors: ['#FFB6C1', '#FF69B4'],
          gravity: -0.5,
          scalar: 1.5,
        });
      }, 300);

      return () => clearInterval(hearts);
    }
  }, [accepted]);

  if (accepted) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 overflow-hidden relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center z-10 px-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <img
              src="/cats/9.jpg"
              alt="Happy cat"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full mx-auto shadow-2xl border-8 border-white"
            />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl mb-4 text-pink-600"
          >
            ¡Sabía que dirías que sí, Daisy! 💖
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl text-pink-500"
          >
            Me haces muy feliz 🐶✨
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-pink-400 mt-2"
          >
            💑 Novios desde el {acceptedDate}
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="mt-8 flex justify-center gap-4"
          >
            <Heart className="text-pink-500 fill-pink-500 w-12 h-12" />
            <Sparkles className="text-yellow-400 fill-yellow-400 w-12 h-12" />
            <Heart className="text-pink-500 fill-pink-500 w-12 h-12" />
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ y: -20, x: Math.random() * window.innerWidth }}
              animate={{
                y: window.innerHeight + 20,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Heart className="text-pink-300 fill-pink-300 w-6 h-6 opacity-60" />
            </motion.div>
          ))}
        </div>

        <footer className="absolute bottom-6 text-center w-full text-pink-400 text-sm">
          Hecho con cariño por Aaron 💕
        </footer>
      </div>
    );
  }

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-100 to-blue-50 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Heart className="text-pink-200 fill-pink-200 w-8 h-8 opacity-30" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center z-10 px-6 max-w-3xl"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl mb-4 text-pink-600">
            Daisy... 🌸
          </h1>
          <p className="text-3xl md:text-5xl text-pink-500 mb-4">
            ¿Quieres ser mi novia?
          </p>
          <Sparkles className="text-yellow-400 fill-yellow-400 w-12 h-12 mx-auto" />
        </motion.div>

        <AnimatePresence mode="wait">
          {rejectionCount > 0 && (
            <motion.div
              key={rejectionCount}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="mb-8"
            >
              <img
                src={catImages[(rejectionCount - 1) % catImages.length]}
                alt="Sad cat"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-3xl mx-auto shadow-xl border-4 border-white mb-4"
              />
              <p className="text-2xl md:text-3xl text-pink-500">
                {sadMessages[(rejectionCount - 1) % sadMessages.length]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-6 justify-center items-center flex-wrap mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            style={{ fontSize: `${Math.min(1 + rejectionCount * 0.15, 2.5)}rem` }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-12 py-6 rounded-full shadow-2xl hover:shadow-pink-300 transition-all"
          >
            Sí 💖
          </motion.button>

          <motion.button
            onHoverStart={handleNoHover}
            onClick={handleNoHover}
            animate={{
              x: noButtonPosition.x,
              y: noButtonPosition.y,
              scale: noButtonSize,
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 px-12 py-6 rounded-full shadow-lg text-2xl md:text-3xl relative"
            style={{ touchAction: 'none' }}
          >
            No 💔
          </motion.button>
        </div>
      </motion.div>

      <footer className="absolute bottom-6 text-center w-full text-pink-400 text-sm">
        Hecho con cariño por Aaron 💕
      </footer>
    </div>
  );
}
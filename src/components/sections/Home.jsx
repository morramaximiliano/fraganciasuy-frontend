import React from "react";
import ProductsContainer from "../ProductsContainer";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 text-gray-100 selection:bg-purple-500 selection:text-white">
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop"
            alt="Perfume de lujo"
            className="w-full h-full object-cover object-center blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-transparent to-gray-950"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-purple-900/50 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-5 border border-purple-800"
          >
            LAS MEJORES FRAGANCIAS DE URUGUAY
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-tight"
          >
            Descubrí Tu <span className="text-purple-400">Esencia</span> Única
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-xl text-gray-300 max-w-3xl leading-relaxed"
          >
            Explorá nuestra curada selección de fragancias internacionales y de
            autor. Encontrá el perfume que define tu personalidad y deja una
            huella inolvidable.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row gap-6"
          >
            <NavLink
              to="/products"
              className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl text-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/30 transform hover:-translate-y-1"
            >
              Ver Catálogo
            </NavLink>
          </motion.div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <ProductsContainer />
      </main>
    </div>
  );
};

export default Home;

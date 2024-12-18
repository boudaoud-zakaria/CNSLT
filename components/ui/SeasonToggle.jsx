import React, { useState, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaSun, FaSnowflake } from "react-icons/fa";
import sun from "@/public/sun.png";
import Image from "next/image";

const Snowflake = memo(({ flake }) => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      y: "400%",
      opacity: [0, 0.5, 1, 0.5, 0],
      transition: {
        duration: 5,
        delay: flake.delay,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls, flake.delay, flake.speed]);

  return (
    <motion.div
      className="h-2"
      style={{ left: `${flake.x}%` }}
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
    >
      <FaSnowflake size={6} color="white" />
    </motion.div>
  );
});

export default function SeasonToggle({ summer, setSummer }) {
  const [selectedSection, setSelectedSection] = useState("Haute saison");
  const snowflakes = Array.from({ length: 20 }, () => ({
    delay: Math.random() * 5,
    speed: 200,
    x: Math.random() * 100 - 50,
  }));

  return (
    <div
      className="text-2xl font-body shadow-lg w-[600px] h-12 bg-gray-500 bg-opacity-20 rounded-full p-2 flex justify-around items-center cursor-pointer"
      onClick={() => setSummer(!summer)}
    >
      {/* <motion.div
        className={`absolute z-20 w-28 h-10 ${
          selectedSection === "Haute saison"
            ? "bg-primary1 text-white"
            : selectedSection === "Basse saison"
            ? "bg-secondary2 text-white"
            : "bg-black text-white"
        } rounded-full`}
        initial={{ x: selectedSection === "Evenements" ? "100%" : selectedSection === "Basse saison" ? "50%" : "-50%" }}
        animate={{ x: selectedSection === "Evenements" ? "100%" : selectedSection === "Basse saison" ? "50%" : "-50%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      /> */}

      {!summer ? (
        <motion.div className="py-1 absolute w-64 h-10 z-10 flex px-2 justify-around ">
          {snowflakes.map((flake, index) => (
            <Snowflake key={index} flake={flake} />
          ))}
        </motion.div>
      ) : (
        <div className="absolute w-64 h-10 flex justify-end p-1">
          <motion.div
            className="w-8 h-8"
            animate={{
              rotate: 360,
              opacity: [0, 0.5, 1, 0.8, 0.5, 0.2, 0],
              x: [0, -10, -20, -30, -40, -50, -60, -70],
              y: [0, -2, -5, -7, -5, -2, 0, 10],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear",
            }}
            whileHover={{
              scale: 1.2,
              boxShadow: "0px 0px 20px 5px rgba(255, 223, 0, 0.7)",
            }}
          >
            <Image src={sun} alt="sun" className="rounded-full" />
          </motion.div>
        </div>
      )}

      <div className="flex w-full justify-around z-30">
        <label className="relative py-1 w-1/3 flex justify-center items-center rounded-2xl cursor-pointer">
          <input
            type="radio"
            name="section"
            value="Haute saison"
            checked={selectedSection === "Haute saison"}
            onChange={() => setSelectedSection("Haute saison")}
            className="hidden"
          />
          <div
            className={`${
              selectedSection === "Haute saison"
                ? "bg-primary1 text-white"
                : "bg-gray-500 bg-opacity-20 text-gray-50"
            } rounded-2xl px-4 py-1`}
          >
            Haute saison
          </div>
        </label>
        <label className="relative py-1 w-1/3 flex justify-center items-center rounded-2xl cursor-pointer">
          <input
            type="radio"
            name="section"
            value="Basse saison"
            checked={selectedSection === "Basse saison"}
            onChange={() => setSelectedSection("Basse saison")}
            className="hidden"
          />
          <div
            className={`${
              selectedSection === "Basse saison"
                ? "bg-primary1 text-white"
                : "bg-gray-500 bg-opacity-20 text-gray-50"
            } rounded-2xl px-4 py-1`}
          >
            Basse saison
          </div>
        </label>
        <label className="relative py-1 w-1/3 flex justify-center items-center rounded-2xl cursor-pointer">
          <input
            type="radio"
            name="section"
            value="Evenements"
            checked={selectedSection === "Evenements"}
            onChange={() => setSelectedSection("Evenements")}
            className="hidden"
          />
          <div
            className={`${
              selectedSection === "Evenements"
                ? "bg-primary1 text-white"
                : "bg-gray-500 bg-opacity-20 text-gray-50"
            } rounded-2xl px-4 py-1`}
          >
            Événements
          </div>
        </label>
      </div>
    </div>
  );
}

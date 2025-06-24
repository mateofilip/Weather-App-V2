import { useState } from "react";
import TimeMachineModal from "./TimeMachineModal.tsx";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <footer
      className="bottom-0 flex flex-col items-center px-4 pb-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-32"
      ref={parent}
    >
      <p className="max-w-4xl pb-6 text-center text-xs text-slate-800 sm:text-sm md:text-base lg:text-sm xl:text-base dark:text-slate-200">
        Built in{" "}
        <a
          href="https://code.visualstudio.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-semibold text-slate-700 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-slate-700 after:transition-all after:duration-300 hover:after:w-full dark:text-slate-300 dark:after:bg-slate-300"
        >
          Visual Studio Code,
        </a>{" "}
        powered by{" "}
        <a
          href="https://astro.build/"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-semibold text-slate-700 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-slate-700 after:transition-all after:duration-300 hover:after:w-full dark:text-slate-300 dark:after:bg-slate-300"
        >
          Astro
        </a>
        , styled using{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-semibold text-slate-700 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-slate-700 after:transition-all after:duration-300 hover:after:w-full dark:text-slate-300 dark:after:bg-slate-300"
        >
          Tailwind CSS
        </a>
        , and delivered by{" "}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-semibold text-slate-700 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-slate-700 after:transition-all after:duration-300 hover:after:w-full dark:text-slate-300 dark:after:bg-slate-300"
        >
          Vercel
        </a>
        . All encapsulated within the{" "}
        <a
          href="https://www.fontshare.com/fonts/satoshi"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-semibold text-slate-700 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-slate-700 after:transition-all after:duration-300 hover:after:w-full dark:text-slate-300 dark:after:bg-slate-300"
        >
          Satoshi
        </a>{" "}
        font with the help of some AI generated icons. Data is brought by{" "}
        <a
          href="https://openweathermap.org/api"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-semibold text-slate-700 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-slate-700 after:transition-all after:duration-300 hover:after:w-full dark:text-slate-300 dark:after:bg-slate-300"
        >
          OpenWeatherMap API
        </a>
        .
      </p>

      <button
        className="grid place-items-end"
        onClick={() => setShowModal(true)}
      >
        <img
          src="/icons/timemachine.png"
          alt="Time Machine"
          className="w-12 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32"
        />
      </button>

      {showModal && <TimeMachineModal setShowModal={setShowModal} />}
    </footer>
  );
}

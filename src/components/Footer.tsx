export default function Footer() {
  return (
    <footer className="bottom-0 flex flex-col items-center px-10 pb-0">
      <p className="pb-5 text-center text-xs md:w-2/3 md:text-sm">
        Roughly laid out in{" "}
        <a
          href="https://www.figma.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-medium text-orange-400 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          Figma
        </a>
        , brought to life in{" "}
        <a
          href="https://code.visualstudio.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-medium text-orange-400 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          Visual Studio Code
        </a>{" "}
        by yours truly. Powered by{" "}
        <a
          href="https://astro.build/"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-medium text-orange-400 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          Astro
        </a>
        , styled with{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-medium text-orange-400 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          Tailwind CSS
        </a>
        , and shipped with{" "}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-medium text-orange-400 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          Vercel
        </a>
        . All wrapped up in the{" "}
        <a
          href="https://www.fontshare.com/fonts/satoshi"
          target="_blank"
          rel="noreferrer noopener"
          className="relative cursor-pointer font-medium text-orange-400 transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-1/15 after:w-0 after:rounded-full after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          Satoshi
        </a>{" "}
        typeface.
      </p>
      <a
        href="https://mf-weather-app.vercel.app/"
        target="_blank"
        rel="noreferrer noopener"
        className="grid place-items-end"
      >
        <img
          src="./src/assets/time-machine.png"
          alt="Time Machine"
          className="w-1/2 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-5 hover:scale-105 md:mr-3 md:mb-5 md:w-1/12"
        />
      </a>
    </footer>
  );
}

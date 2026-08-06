import { Image } from "@lonik/oh-image/react";
import { motion } from "motion/react";

interface TimeMachineModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeMachineModal({
  setShowModal,
}: TimeMachineModalProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 z-50 grid h-dvh w-dvw place-items-center bg-black/25 backdrop-blur-3xl"
      onClick={() => setShowModal(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="glass-surface relative grid h-5/6 max-h-[90dvh] w-5/6 place-items-center overflow-y-auto rounded-3xl p-3 md:h-3/4 md:w-3/4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <button
          className="text-ink/40 hover:text-ink/60 absolute top-3 right-3 z-50 grid h-7 w-7 cursor-pointer place-items-center transition-colors duration-200 ease-out active:scale-95"
          onClick={() => setShowModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="currentColor"
          >
            <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
          </svg>
        </button>

        <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-6 sm:p-8 md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10 md:p-10 lg:p-12">
          <a
            href="https://old-mf-weather-app.vercel.app/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open the original version of this app"
            className="group mx-auto w-full max-w-md"
          >
            <figure className="m-0">
              <div className="glass-chip flex items-center justify-center overflow-hidden rounded-2xl p-2 transition-all duration-200 ease-out group-hover:-rotate-1">
                <Image
                  src="/icons/v1site.avif"
                  alt="Screenshot of the original version"
                  className="relative rounded-xl"
                  width={2992}
                  height={1880}
                  priority
                />
              </div>
              <figcaption className="text-ink/50 mt-3 text-center text-xs font-medium">
                Click to open the original build
              </figcaption>
            </figure>
          </a>

          <div className="flex w-full max-w-md flex-col items-center gap-4 text-center md:items-start md:text-left">
            <h2 className="text-ink text-2xl font-semibold tracking-tight sm:text-3xl">
              Where it all started
            </h2>
            <p className="text-ink/60 text-sm leading-relaxed sm:text-base">
              This was my very first project, and I keep it here on purpose. It
              reminds me how much I've improved as a developer since those early
              builds.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

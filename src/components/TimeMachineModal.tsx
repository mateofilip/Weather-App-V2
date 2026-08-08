import { Image } from "@lonik/oh-image/react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useDialog } from "../hooks/useDialog";

interface TimeMachineModalProps {
  setShowModal: (open: boolean) => void;
}

export default function TimeMachineModal({
  setShowModal,
}: TimeMachineModalProps) {
  const { dialogProps } = useDialog(true, () => setShowModal(false), "Time machine");

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
        {...dialogProps}
        onClick={(e) => e.stopPropagation()}
        className="glass-surface relative grid h-5/6 max-h-[90dvh] w-5/6 place-items-center overflow-y-auto rounded-3xl p-3 focus:outline-none md:h-3/4 md:w-3/4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <button
          className="hover:text-ink absolute top-3 right-3 z-50 grid h-7 w-7 cursor-pointer place-items-center rounded-full text-neutral-500 transition-colors duration-200 ease-out active:scale-95 focus-visible:ring-ink/30 focus-visible:ring-2 focus-visible:outline-none"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
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

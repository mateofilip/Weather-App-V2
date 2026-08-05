import { Image } from "@lonik/oh-image/react";

interface TimeMachineModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeMachineModal({
  setShowModal,
}: TimeMachineModalProps) {
  return (
    <div
      className="fixed top-0 left-0 z-50 grid h-dvh w-dvw place-items-center bg-black/66 backdrop-blur-3xl"
      onClick={() => setShowModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid h-5/6 w-5/6 max-h-[90dvh] place-items-center overflow-y-auto rounded-3xl border border-slate-50/25 bg-slate-50/80 p-3 shadow-sm ring-1 ring-slate-50/30 ring-inset backdrop-blur-xl md:h-3/4 md:w-3/4 dark:border-slate-50/10 dark:bg-neutral-950/60 dark:ring-slate-50/10"
      >
        <button
          className="absolute top-3 right-3 z-50 grid h-7 w-7 cursor-pointer place-items-center text-neutral-950/40 transition-colors duration-200 ease-out hover:text-neutral-950/60 active:scale-95 dark:text-slate-50/40 dark:hover:text-slate-50/70"
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
              <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-slate-50/25 bg-slate-50/40 p-2 shadow-sm ring-1 ring-slate-50/30 ring-inset transition-all duration-200 ease-out group-hover:-rotate-1 group-hover:shadow-md dark:border-slate-50/10 dark:bg-slate-50/10 dark:ring-slate-50/10">
                <Image
                  src="/icons/v1site.avif"
                  alt="Screenshot of the original version"
                  className="relative rounded-xl"
                  width={2992}
                  height={1880}
                  priority
                />
              </div>
              <figcaption className="mt-3 text-center text-xs font-medium text-neutral-950/50 dark:text-slate-50/60">
                Click to open the original build
              </figcaption>
            </figure>
          </a>

          <div className="flex w-full max-w-md flex-col items-center gap-4 text-center md:items-start md:text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl dark:text-slate-50">
              Where it all started
            </h2>
            <p className="text-sm leading-relaxed text-neutral-950/60 sm:text-base dark:text-slate-50/70">
              This was my very first project, and I keep it here on purpose. It
              reminds me how much I've improved as a developer since those
              early builds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

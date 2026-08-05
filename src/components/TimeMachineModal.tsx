import { Image } from "@lonik/oh-image/react";

interface TimeMachineModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeMachineModal({
  setShowModal,
}: TimeMachineModalProps) {
  return (
    <div
      className="fixed top-0 left-0 z-50 grid h-dvh w-dvw place-items-center bg-black/66 backdrop-blur-sm"
      onClick={() => setShowModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid h-5/6 w-5/6 place-items-center rounded-3xl border border-slate-50/25 bg-slate-50/90 p-3 shadow-2xl backdrop-blur-xl md:h-3/4 md:w-3/4 dark:border-slate-50/10 dark:bg-neutral-950/60"
      >
        <button
          className="absolute top-0 right-0 z-50 -mt-7 -mr-7 grid h-7 w-7 cursor-pointer place-items-center rounded-full border-2 border-neutral-950/5 bg-neutral-950/60 text-slate-50 transition-all duration-200 ease-out hover:scale-110 hover:border-neutral-950/5 hover:bg-neutral-950 dark:border-slate-50/10 dark:bg-slate-50/70 dark:text-neutral-950 dark:hover:bg-slate-50"
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
        <div className="flex h-full w-full flex-col place-items-center justify-center gap-3 rounded-2xl border border-slate-50/25 bg-slate-50/50 text-center shadow-lg backdrop-blur-md lg:gap-5 dark:border-slate-50/10 dark:bg-slate-50/15">
          <div className="grid place-items-center gap-5">
            <h2 className="text-center text-2xl font-semibold text-neutral-950 dark:text-slate-50">
              Check this app's previous version!
            </h2>

            <a
              href="https://old-mf-weather-app.vercel.app/"
              target="_blank"
              rel="noreferrer noopener"
              className="group w-10/12 md:w-2/3 lg:w-1/2"
            >
              <div className="overflow-hidden rounded-2xl border-2 border-neutral-950 p-px transition-all duration-200 ease-out group-hover:-rotate-3 group-hover:shadow-2xl dark:border-slate-50">
                <Image
                  src="/icons/v1site.avif"
                  alt="v1 Site"
                  className="relative rounded-xl transition-all duration-200 ease-out group-hover:scale-105 group-hover:blur-sm group-hover:brightness-50"
                  width={2992}
                  height={1880}
                  priority
                />
              </div>

              <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-slate-50 opacity-0 drop-shadow-xl group-hover:opacity-100">
                V1
              </h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

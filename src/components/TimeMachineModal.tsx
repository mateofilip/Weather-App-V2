interface TimeMachineModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeMachineModal({
  setShowModal,
}: TimeMachineModalProps) {
  return (
    <div
      className="fixed top-0 left-0 z-50 grid h-screen w-screen place-items-center bg-black/50 dark:bg-black/60"
      onClick={() => setShowModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="grid h-3/4 w-3/4 place-items-center rounded-2xl bg-white/66 p-3 backdrop-blur-sm dark:bg-slate-700/66"
      >
        <button
          className="absolute top-0 right-0 z-50 -mt-7 -mr-7 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-red-400 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-600"
          onClick={() => setShowModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="white"
          >
            <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
          </svg>
        </button>
        <div className="flex h-full w-full flex-col place-items-center justify-center gap-3 rounded-2xl bg-slate-100 text-center opacity-85 lg:gap-5 dark:bg-slate-800">
          <div className="grid place-items-center gap-5">
            <h2 className="text-center text-2xl font-semibold text-slate-700 dark:text-slate-100">
              Check this app's previous version!
            </h2>

            <a
              href="https://mf-weather-app.vercel.app/"
              target="_blank"
              rel="noreferrer noopener"
              className="group w-10/12 md:w-2/3 lg:w-1/2"
            >
              <div className="rounded-2xl border-2 border-slate-700 p-[1px] dark:border-slate-100">
                <img
                  src="src/icons/v1site.png"
                  alt="v1 Site"
                  className="relative rounded-xl transition-all duration-300 ease-in-out hover:blur-xs hover:brightness-33"
                />
              </div>

              <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-slate-100 opacity-0 drop-shadow-xl group-hover:opacity-100">
                V1
              </h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

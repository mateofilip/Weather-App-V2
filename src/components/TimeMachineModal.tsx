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

        <div className="grid place-items-center gap-5">
          <h2 className="text-center text-2xl font-semibold text-slate-700 dark:text-slate-100">
            Check this app's previous version!
          </h2>

          <a
            href="https://mf-weather-app.vercel.app/"
            target="_blank"
            rel="noreferrer noopener"
            className="group w-1/2"
          >
            <img
              src="src/assets/v1-site-image.png"
              alt="v1 Site"
              className="relative rounded-2xl transition-all duration-300 ease-in-out hover:scale-[103%] hover:blur-xs hover:brightness-50"
            />

            <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-slate-100 opacity-0 drop-shadow-xl group-hover:opacity-100">
              V1
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
}

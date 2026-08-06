import { useState } from "react";
import TimeMachineModal from "./TimeMachineModal.tsx";
import { Image } from "@lonik/oh-image/react";
import { AnimatePresence } from "motion/react";

export default function TimeMachine() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-0 left-0 z-40 px-4 pb-6"
        onClick={() => setShowModal(true)}
        aria-label="Open previous version"
      >
        <Image
          src="/icons/timemachine.gif"
          alt="Time Machine"
          className="w-7 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-2 hover:scale-105 sm:w-12 md:w-16 lg:w-20 xl:w-24 2xl:w-28"
          width={678}
          height={584}
        />
      </button>

      <AnimatePresence>
        {showModal && <TimeMachineModal setShowModal={setShowModal} />}
      </AnimatePresence>
    </>
  );
}

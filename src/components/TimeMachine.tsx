import { lazy, Suspense } from "react";
import { AnimatePresence } from "motion/react";

const TimeMachineModal = lazy(() => import("./TimeMachineModal.tsx"));

export default function TimeMachine({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Suspense fallback={null}>
      <AnimatePresence>
        {open && <TimeMachineModal setShowModal={onOpenChange} />}
      </AnimatePresence>
    </Suspense>
  );
}

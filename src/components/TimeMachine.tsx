import TimeMachineModal from "./TimeMachineModal.tsx";
import { AnimatePresence } from "motion/react";

export default function TimeMachine({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {open && <TimeMachineModal setShowModal={onOpenChange} />}
    </AnimatePresence>
  );
}

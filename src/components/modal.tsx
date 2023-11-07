import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Heading } from "./ui/heading";
import { HeadingLevels } from "@/types/text";
import { cn } from "../../lib/utils";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  titleClassName,
  descriptionClassName,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[100] h-full w-full translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-md border border-neutral-700 bg-tertiary p-24 drop-shadow-md focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[700px] md:px-24 md:py-40">
          <Dialog.Title
            className={cn(
              "mb-4 transform-gpu text-center text-lg font-bold text-body md:transform-cpu",
              titleClassName
            )}
          >
            {title}
          </Dialog.Title>
          {description !== "" ? (
            <Dialog.Description
              className={cn(
                "mb-5 transform-gpu text-center text-sm leading-normal text-gray md:transform-cpu",
                descriptionClassName
              )}
            >
              {description}
            </Dialog.Description>
          ) : null}

          <div className="flex transform-gpu flex-col items-center md:transform-cpu">
            {children}
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Close"
            >
              <Cross1Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

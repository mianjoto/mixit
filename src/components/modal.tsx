import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Heading } from "./ui/heading";
import { HeadingLevels } from "@/types/text";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-background-900/90 fixed inset-0 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 h-full max-h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-md border border-neutral-700 bg-tertiary p-24 drop-shadow-md focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]">
          <Dialog.Title className="mb-4 text-center text-lg font-bold text-body">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-center text-sm leading-normal text-gray">
            {description}
          </Dialog.Description>
          <div className="flex flex-col items-center">{children}</div>
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

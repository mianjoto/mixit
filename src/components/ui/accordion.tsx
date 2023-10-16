/** This is a custom extension of RadixUI's Accordion component unrelated to shadcn's components */

import * as Accordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";
import { cn } from "../../../lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface AccordionItemProps extends Accordion.AccordionItemProps {
  className?: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Accordion.Item
        className={cn(
          "group overflow-hidden ring-offset-background focus-within:relative focus-within:z-10 focus-within:ring-2 focus-within:ring-body/10 focus-within:ring-offset-8",
          className
        )}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </Accordion.Item>
    );
  }
);

interface AccordionTriggerProps extends Accordion.AccordionTriggerProps {
  className?: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Accordion.Header className="flex">
        <Accordion.Trigger
          className={cn(
            "group flex flex-1 cursor-default items-center justify-between py-16 text-lg font-bold uppercase leading-none text-body outline-none group-data-[state=closed]:opacity-60",
            className
          )}
          ref={forwardedRef}
          {...props}
        >
          {children}
          <ChevronDownIcon
            className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] text-body transition-transform duration-300 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
    );
  }
);

interface AccordionContentProps extends Accordion.AccordionContentProps {
  className?: string;
  contentGapClass?: string;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  (
    { children, className, contentGapClass = "gap-24", ...props },
    forwardedRef
  ) => {
    return (
      <Accordion.Content
        className={cn(
          "overflow-hidden text-body data-[state=closed]:animate-accordionSlideUp data-[state=open]:animate-accordionSlideDown",
          className
        )}
        ref={forwardedRef}
        {...props}
      >
        <div className={cn(`flex flex-col py-[10px]`, contentGapClass)}>
          {children}
        </div>
      </Accordion.Content>
    );
  }
);

export { AccordionItem, AccordionTrigger, AccordionContent };

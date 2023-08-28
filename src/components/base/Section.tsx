import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

const sectionVariants = cva("", {
  variants: {
    level: {
      section: "",
      main: "u-container mx-auto",
      article: "",
      aside: "",
      header: "",
      footer: "",
      nav: "",
      figure: "",
      details: "",
      summary: "",
      mark: "",
      time: "",
      dialog: "",
    },
    grid: {
      true: "u-grid auto-rows-min place-content-center",
      false: "",
    },
    padding: {
      true: "px-32 pb-80 pt-64 lg:px-64 lg:py-80",
      false: "",
    },
    sticky: {
      true: "sticky top-0",
      false: "",
    },
  },
  defaultVariants: {
    level: "section",
    grid: false,
    sticky: false,
    padding: false,
  },
});

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  level?:
    | "section"
    | "main"
    | "article"
    | "aside"
    | "header"
    | "footer"
    | "nav"
    | "figure"
    | "details"
    | "summary"
    | "mark"
    | "time"
    | "dialog";
  grid?: boolean;
  padding?: boolean;
  sticky?: boolean;
}

const Section: FC<SectionProps> = ({
  level = "section",
  grid = false,
  padding = false,
  sticky = false,
  className,
  ...props
}) => {
  const SectionElement = ({ ...props }: React.HTMLAttributes<HTMLElement>) =>
    React.createElement(level, props, props.children);
  return (
    <SectionElement
      className={cn(
        sectionVariants({ level, grid, padding, sticky, className })
      )}
      {...props}
    >
      {props.children}
    </SectionElement>
  );
};
Section.displayName = "Section";

export { Section };

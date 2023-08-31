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
      true: "u-grid grid auto-rows-min place-content-center",
      false: "",
    },
    container: {
      true: "u-container mx-auto auto-rows-min place-content-center overflow-hidden",
      false: "",
    },
    padding: {
      true: "px-32 py-64 lg:px-64 lg:py-80",
      false: "",
    },
    fitScreenHeight: {
      true: "min-h-screen",
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
    container: false,
    padding: false,
    fitScreenHeight: false,
    sticky: false,
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
  container = false,
  padding = false,
  fitScreenHeight = false,
  sticky = false,
  className,
  ...props
}) => {
  const SectionElement = ({ ...props }: React.HTMLAttributes<HTMLElement>) =>
    React.createElement(level, props, props.children);
  return (
    <SectionElement
      className={cn(
        sectionVariants({
          level,
          grid,
          container,
          padding,
          sticky,
          fitScreenHeight,
          className,
        })
      )}
      {...props}
    >
      {props.children}
    </SectionElement>
  );
};
Section.displayName = "Section";

export { Section };

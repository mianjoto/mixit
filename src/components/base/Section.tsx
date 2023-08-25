import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

const sectionVariants = cva("mx-auto", {
  variants: {
    level: {
      section: "",
      main: "u-container",
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
      true: "u-grid",
      false: "",
    },
    padding: {
      true: "",
      false: "",
    },
    sticky: {
      true: "sticky top-0",
      false: "",
    },
  },
  defaultVariants: {
    level: "section",
    grid: true,
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
  padding = true,
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

import * as React from "react";

import { cn } from "../../../lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <span
        className={cn(
          "flex items-center justify-between rounded-[8px] bg-secondary text-base text-gray",
          className
        )}
      >
        <input
          type={type}
          className="w-full bg-secondary px-12 py-8 placeholder:text-gray focus-within:border-0 focus-within:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          {...props}
        />
        <MagnifyingGlassIcon
          className="h-[50px] w-[50px] px-12 py-8 text-gray"
          height={30}
          width={30}
        />
      </span>
    );
  }
);
SearchInput.displayName = "Input";

export { SearchInput };

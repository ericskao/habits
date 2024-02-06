"use client";

import { cn } from "@/lib/utils";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import * as React from "react";

const tabVariants = cva(
  "text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Tabs = ({
  classNames,
  variant,
  size,
  options = [],
  onValueChange,
}: {
  classNames?: { root?: string; list?: string };
  variant?: any;
  size?: any;
  options: { value: string; content?: React.ReactNode }[];
  onValueChange?: (e: string) => void;
}) => (
  <RadixTabs.Root
    defaultValue={options[0]?.value}
    className={cn(tabVariants({ variant, size, className: classNames?.root }))}
    onValueChange={(e) => onValueChange?.(e)}
  >
    <RadixTabs.List
      style={{ boxShadow: "0 4px 6px rgb(0 0 0/6%)" }}
      className={cn("flex gap-4 border-b-2 border-[#DDDDDD]", classNames?.list)}
    >
      {options.map((option) => (
        <RadixTabs.Trigger
          key={option.value}
          value={option.value}
          className="h-14 px-4 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#717171] border-b-2 border-transparent transform transition-transform duration-100 active:scale-95 capitalize"
        >
          {option.value}
        </RadixTabs.Trigger>
      ))}
    </RadixTabs.List>
    {options[0]?.content && (
      <div>
        {options.map((option) => (
          <RadixTabs.Content key={option.value} value={option.value}>
            {option.content}
          </RadixTabs.Content>
        ))}
      </div>
    )}
  </RadixTabs.Root>
);

Tabs.displayName = "Tabs";

export { Tabs, tabVariants };

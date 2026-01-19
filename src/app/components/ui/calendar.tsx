import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";

import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = DayPickerProps;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col gap-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(buttonVariants({ variant: "outline" }), "h-8 w-8 p-0"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-mutedForeground rounded w-9 font-semibold text-xs",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal"),
        day_selected: "bg-primary text-primaryForeground hover:bg-primary/90",
        day_today: "bg-accent text-accentForeground",
        day_outside: "text-mutedForeground opacity-50",
        day_disabled: "text-mutedForeground opacity-50",
        day_range_middle: "bg-muted text-foreground",
        day_hidden: "invisible",
        ...classNames
      }}
      {...props}
    />
  );
}


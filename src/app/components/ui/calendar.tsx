import * as React from "react";
import {
  DayPicker,
  type CaptionProps,
  type DayPickerProps,
  useDayPicker,
  useNavigation
} from "react-day-picker";
import { ChevronLeft, ChevronRight } from "../../icons/lucide";

import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = DayPickerProps;

function CalendarMonthCaption({ displayMonth, className }: CaptionProps) {
  const { previousMonth, nextMonth, goToMonth } = useNavigation();
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(displayMonth);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="grid grid-cols-[28px_1fr_28px] items-center px-1 pt-1">
        <button
          type="button"
          aria-label="Go to previous month"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0")}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-center text-sm font-semibold leading-5 text-foreground">{monthLabel}</div>
        <button
          type="button"
          aria-label="Go to next month"
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0")}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function CalendarMonths({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { months, dayPickerProps } = useDayPicker();
  const { previousMonth, nextMonth, goToMonth } = useNavigation();
  const numberOfMonths = dayPickerProps.numberOfMonths ?? 1;
  const isGroupedMonths = numberOfMonths > 1 && months?.length;
  const formatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

  return (
    <div className="flex flex-col gap-3">
      {isGroupedMonths && (
        <div className="grid w-full grid-cols-[28px_1fr_1fr_28px] items-center px-1 pt-1">
          <button
            type="button"
            aria-label="Go to previous month"
            disabled={!previousMonth}
            onClick={() => previousMonth && goToMonth(previousMonth)}
            className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-center text-sm font-semibold leading-5 text-foreground">
            {formatter.format(months[0].date)}
          </div>
          <div className="text-center text-sm font-semibold leading-5 text-foreground">
            {formatter.format(months[months.length - 1].date)}
          </div>
          <button
            type="button"
            aria-label="Go to next month"
            disabled={!nextMonth}
            onClick={() => nextMonth && goToMonth(nextMonth)}
            className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className={className}>{children}</div>
    </div>
  );
}

function CalendarDropdownMonths({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { months, dayPickerProps, classNames } = useDayPicker();
  const { previousMonth, nextMonth, goToMonth } = useNavigation();
  const today = dayPickerProps.today ?? new Date();
  const currentMonth = months?.[0]?.date ?? dayPickerProps.month ?? dayPickerProps.defaultMonth ?? today;
  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth();
  const captionLayout = dayPickerProps.captionLayout ?? "label";
  const showMonthDropdown = captionLayout === "dropdown" || captionLayout === "dropdown-months";
  const showYearDropdown = captionLayout === "dropdown" || captionLayout === "dropdown-years";

  const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startOfYear = (date: Date) => new Date(date.getFullYear(), 0, 1);
  const endOfYear = (date: Date) => new Date(date.getFullYear(), 11, 31);
  const addYears = (date: Date, amount: number) => new Date(date.getFullYear() + amount, date.getMonth(), date.getDate());

  let startMonth = dayPickerProps.startMonth ?? dayPickerProps.fromMonth;
  if (!startMonth && dayPickerProps.fromYear) {
    startMonth = new Date(dayPickerProps.fromYear, 0, 1);
  }
  if (!startMonth && showYearDropdown) {
    startMonth = startOfYear(addYears(today, -100));
  }

  let endMonth = dayPickerProps.endMonth ?? dayPickerProps.toMonth;
  if (!endMonth && dayPickerProps.toYear) {
    endMonth = new Date(dayPickerProps.toYear, 11, 31);
  }
  if (!endMonth && showYearDropdown) {
    endMonth = endOfYear(today);
  }

  const navStart = startMonth ? startOfDay(startOfMonth(startMonth)) : undefined;
  const navEnd = endMonth ? startOfDay(endOfMonth(endMonth)) : undefined;
  const yearOptions =
    navStart && navEnd
      ? Array.from({ length: navEnd.getFullYear() - navStart.getFullYear() + 1 }, (_, index) =>
          navStart.getFullYear() + index
        )
      : [];
  const resolvedYearOptions = dayPickerProps.reverseYears ? [...yearOptions].reverse() : yearOptions;
  const monthOptions = Array.from({ length: 12 }, (_, index) => index);
  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-[252px] items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Go to previous month"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0 text-foreground")}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex flex-1 items-center justify-center gap-2">
          {showYearDropdown && (
            <select
              className={classNames?.years_dropdown}
              value={currentYear}
              onChange={(event) => {
                const nextYear = Number(event.target.value);
                goToMonth(new Date(nextYear, currentMonthIndex, 1));
              }}
              disabled={dayPickerProps.disableNavigation}
            >
              {resolvedYearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
          {showMonthDropdown && (
            <select
              className={classNames?.months_dropdown}
              value={currentMonthIndex}
              onChange={(event) => {
                const nextMonthIndex = Number(event.target.value);
                goToMonth(new Date(currentYear, nextMonthIndex, 1));
              }}
              disabled={dayPickerProps.disableNavigation}
            >
              {monthOptions.map((monthIndex) => (
                <option key={monthIndex} value={monthIndex}>
                  {monthFormatter.format(new Date(currentYear, monthIndex, 1))}
                </option>
              ))}
            </select>
          )}
        </div>
        <button
          type="button"
          aria-label="Go to next month"
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0 text-foreground")}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}

export function Calendar({ className, classNames, showOutsideDays = true, components, ...props }: CalendarProps) {
  const isGroupedMonths = typeof props.numberOfMonths === "number" && props.numberOfMonths > 1;
  const isDropdownLayout = props.captionLayout === "dropdown";
  const resolvedComponents = {
    ...components,
    ...(isDropdownLayout
      ? {
          Months: CalendarDropdownMonths,
          MonthCaption: () => null,
          Nav: () => null
        }
      : {
          Months: CalendarMonths,
          MonthCaption: CalendarMonthCaption,
          Nav: () => null
        })
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      components={resolvedComponents}
      classNames={{
        months: "flex flex-col gap-4",
        month: "flex flex-col items-center gap-3",
        month_caption: isGroupedMonths ? "hidden" : "flex w-[252px] flex-col gap-3",
        caption_label: "sr-only",
        nav: "hidden",
        nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0"),
        nav_button_previous: "text-foreground",
        nav_button_next: "text-foreground",
        button_previous: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0 text-foreground"),
        button_next: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0 text-foreground"),
        dropdowns: "flex items-center justify-center gap-2",
        dropdown_root: "relative",
        dropdown: "relative",
        months_dropdown:
          "h-7 appearance-none rounded-button border border-border bg-background px-2 text-sm font-semibold leading-5 text-foreground",
        years_dropdown:
          "h-7 appearance-none rounded-button border border-border bg-background px-2 text-sm font-semibold leading-5 text-foreground",
        chevron: "h-4 w-4 text-mutedForeground",
        table: "border-collapse",
        month_grid: "w-[252px] border-collapse table-fixed",
        weekdays: "",
        weekday: "w-9 min-w-9 text-center text-sm font-medium leading-5 text-mutedForeground",
        head_row: "",
        head_cell: "w-9 min-w-9 text-center text-sm font-medium leading-5 text-mutedForeground",
        row: "",
        week: "",
        cell: "h-9 w-9 p-0 text-center align-middle",
        day: "h-9 w-9 p-0 text-center align-middle",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-medium text-foreground hover:bg-zigbangOrange50"
        ),
        selected: "bg-primary text-background font-semibold rounded-button [&>button]:text-background",
        today: "bg-accent text-accentForeground font-medium rounded-button [&>button]:text-accentForeground",
        outside: "text-mutedForeground opacity-50",
        disabled: "text-mutedForeground opacity-50",
        range_start:
          "bg-primary text-primaryForeground font-semibold rounded-l-button rounded-r-none [&>button]:text-primaryForeground",
        range_end:
          "bg-primary text-primaryForeground font-semibold rounded-r-button rounded-l-none [&>button]:text-primaryForeground",
        range_middle: "bg-zigbangOrange50 text-primary rounded-none [&>button]:text-primary",
        hidden: "invisible",
        ...classNames
      }}
      {...props}
    />
  );
}


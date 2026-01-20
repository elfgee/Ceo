import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { ChevronDown, Search } from "@/app/icons/lucide";
import { cn } from "../../lib/utils";

type SelectMode = "default" | "search" | "multiple";

const SelectModeContext = React.createContext<SelectMode>("default");
const SelectSearchContext = React.createContext<{ mode: SelectMode; query: string }>({ mode: "default", query: "" });
const SelectMultipleContext = React.createContext<{
  values: string[];
  toggleValue: (value: string) => void;
  isSelected: (value: string) => boolean;
  markPreventClose: () => void;
} | null>(null);

export type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  mode?: SelectMode;
  multipleValues?: string[];
  defaultMultipleValues?: string[];
  onMultipleValuesChange?: (values: string[]) => void;
};

export function Select({
  mode = "default",
  multipleValues,
  defaultMultipleValues,
  onMultipleValuesChange,
  children,
  ...props
}: SelectProps) {
  const isMultiple = mode === "multiple";
  const [internalValues, setInternalValues] = React.useState<string[]>(defaultMultipleValues ?? []);
  const values = multipleValues ?? internalValues;
  const [internalOpen, setInternalOpen] = React.useState(false);
  const preventCloseRef = React.useRef(false);
  const open = props.open ?? internalOpen;

  const updateValues = React.useCallback(
    (next: string[]) => {
      if (!multipleValues) {
        setInternalValues(next);
      }
      onMultipleValuesChange?.(next);
    },
    [multipleValues, onMultipleValuesChange]
  );

  const toggleValue = React.useCallback(
    (value: string) => {
      if (!value) return;
      const exists = values.includes(value);
      const next = exists ? values.filter((v) => v !== value) : [...values, value];
      updateValues(next);
    },
    [updateValues, values]
  );

  const isSelected = React.useCallback((value: string) => values.includes(value), [values]);

  const markPreventClose = React.useCallback(() => {
    preventCloseRef.current = true;
  }, []);

  const multipleContextValue = React.useMemo(
    () => ({ values, toggleValue, isSelected, markPreventClose }),
    [isSelected, markPreventClose, toggleValue, values]
  );

  return (
    <SelectModeContext.Provider value={mode}>
      <SelectMultipleContext.Provider value={multipleContextValue}>
        <SelectPrimitive.Root
          {...props}
          open={isMultiple ? open : props.open}
          onOpenChange={(nextOpen) => {
            props.onOpenChange?.(nextOpen);
            if (!isMultiple) {
              if (props.open === undefined) setInternalOpen(nextOpen);
              return;
            }
            if (props.open !== undefined) return;
            if (!nextOpen && preventCloseRef.current) {
              preventCloseRef.current = false;
              setInternalOpen(true);
              return;
            }
            if (nextOpen) preventCloseRef.current = false;
            setInternalOpen(nextOpen);
          }}
        >
          {children}
        </SelectPrimitive.Root>
      </SelectMultipleContext.Provider>
    </SelectModeContext.Provider>
  );
}

export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded border border-input bg-inputBackground px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="ml-2 h-4 w-4 text-mutedForeground" />
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectSearchableContent ref={ref} className={className} position={position} {...props}>
    {children}
  </SelectSearchableContent>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const mode = React.useContext(SelectModeContext);
  const { query } = React.useContext(SelectSearchContext);
  const multipleContext = React.useContext(SelectMultipleContext);
  const isMultiple = mode === "multiple";
  const textValue = props.textValue ?? getNodeText(children);
  const displayText = mode === "search" && query ? renderHighlightedText(textValue, query) : children;
  const value = typeof props.value === "string" ? props.value : "";
  const isSelected = isMultiple ? multipleContext?.isSelected(value) ?? false : false;
  const isDisabled = Boolean(props.disabled);

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "group relative flex w-full cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-primary data-[highlighted]:font-medium data-[highlighted]:leading-5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        mode === "multiple" && "bg-background font-medium leading-5",
        className
      )}
      textValue={textValue}
      onPointerDown={(event) => {
        props.onPointerDown?.(event);
        if (!isMultiple) return;
        multipleContext?.markPreventClose();
        event.preventDefault();
        event.stopPropagation();
      }}
      onClick={(event) => {
        props.onClick?.(event);
        if (!isMultiple) return;
        multipleContext?.markPreventClose();
        event.preventDefault();
        event.stopPropagation();
        multipleContext?.toggleValue(value);
      }}
      onSelect={(event) => {
        props.onSelect?.(event);
        if (!isMultiple) return;
        multipleContext?.markPreventClose();
        event.preventDefault();
        event.stopPropagation();
      }}
      {...props}
    >
      <SelectItemContent isMultiple={isMultiple} isSelected={isSelected} isDisabled={isDisabled}>
        {displayText}
      </SelectItemContent>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

function SelectItemContent({
  children,
  isMultiple,
  isSelected,
  isDisabled
}: {
  children: React.ReactNode;
  isMultiple: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}) {
  const mode = React.useContext(SelectModeContext);

  if (mode !== "multiple") {
    return (
      <>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className="ml-auto text-xs text-mutedForeground">✓</SelectPrimitive.ItemIndicator>
      </>
    );
  }

  return (
    <div className="inline-flex w-full items-center gap-2">
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-[4px] border border-primary bg-background text-primaryForeground",
          isSelected && "bg-primary",
          isDisabled && "border-border bg-background text-mutedForeground"
        )}
      >
        {isSelected ? <span className="text-xs leading-none">✓</span> : null}
      </span>
      <SelectPrimitive.ItemText
        className={cn("flex-1 text-sm font-medium leading-5 text-foreground", isDisabled && "text-mutedForeground")}
      >
        {children}
      </SelectPrimitive.ItemText>
    </div>
  );
}

const SEARCH_EMPTY_LABEL = "항목을 찾을 수 없습니다.";

const SelectSearchableContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => {
  const mode = React.useContext(SelectModeContext);
  const isSearchMode = mode === "search";
  const [query, setQuery] = React.useState("");
  const normalizedQuery = query.trim();

  const filteredChildren = isSearchMode ? filterSelectChildren(children, normalizedQuery) : children;
  const hasMatches = isSearchMode ? hasSelectableItems(filteredChildren) : true;

  return (
    <SelectSearchContext.Provider value={{ mode, query: normalizedQuery }}>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "z-50 min-w-32 overflow-hidden rounded-card border border-border bg-background text-foreground shadow-sm",
            className
          )}
          position={position}
          {...props}
        >
          {isSearchMode ? (
            <div className="p-1">
              <div className="relative flex w-full items-center rounded-button border border-border bg-background px-2 py-1.5 shadow-sm">
                <Search className="absolute left-2 h-4 w-4 text-mutedForeground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="입력해 주세요."
                  className="w-full bg-transparent pl-6 text-sm font-medium leading-5 text-foreground placeholder:text-mutedForeground focus:outline-none"
                />
              </div>
            </div>
          ) : null}
          <SelectPrimitive.Viewport className="p-1">
            {isSearchMode && normalizedQuery && !hasMatches ? (
              <div className="flex h-8 items-center rounded-button px-2 text-sm font-medium leading-5 text-foreground">
                {SEARCH_EMPTY_LABEL}
              </div>
            ) : (
              filteredChildren
            )}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectSearchContext.Provider>
  );
});
SelectSearchableContent.displayName = "SelectSearchableContent";

function getNodeText(node: React.ReactNode): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React.isValidElement(node)) return getNodeText(node.props.children);
  return "";
}

function renderHighlightedText(text: string, query: string) {
  if (!query) return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const segments: Array<{ text: string; match: boolean }> = [];
  let startIndex = 0;
  let matchIndex = lowerText.indexOf(lowerQuery);

  while (matchIndex !== -1) {
    if (matchIndex > startIndex) {
      segments.push({ text: text.slice(startIndex, matchIndex), match: false });
    }
    segments.push({ text: text.slice(matchIndex, matchIndex + lowerQuery.length), match: true });
    startIndex = matchIndex + lowerQuery.length;
    matchIndex = lowerText.indexOf(lowerQuery, startIndex);
  }

  if (startIndex < text.length) {
    segments.push({ text: text.slice(startIndex), match: false });
  }

  return segments.map((segment, index) =>
    segment.match ? (
      <span key={`${segment.text}-${index}`} className="text-primary">
        {segment.text}
      </span>
    ) : (
      <span key={`${segment.text}-${index}`}>{segment.text}</span>
    )
  );
}

function hasSelectableItems(children: React.ReactNode): boolean {
  let hasMatch = false;
  React.Children.forEach(children, (child) => {
    if (hasMatch) return;
    if (!React.isValidElement(child)) return;
    if (child.type === SelectItem) {
      hasMatch = true;
      return;
    }
    if (child.type === SelectGroup) {
      hasMatch = hasSelectableItems(child.props.children);
    }
  });
  return hasMatch;
}

function filterSelectChildren(children: React.ReactNode, query: string): React.ReactNode {
  if (!query) return children;

  const nodes = React.Children.toArray(children).filter(Boolean);
  const results: React.ReactNode[] = [];
  const sortableItems: Array<{ node: React.ReactNode; index: number; matchIndex: number }> = [];

  nodes.forEach((child, index) => {
    if (!React.isValidElement(child)) return;

    if (child.type === SelectItem) {
      const label = getNodeText(child.props.children);
      const matchIndex = label.toLowerCase().indexOf(query.toLowerCase());
      if (matchIndex === -1) return;
      sortableItems.push({ node: child, index, matchIndex });
      return;
    }

    if (child.type === SelectGroup) {
      const filteredGroupChildren = filterSelectChildren(child.props.children, query);
      if (!hasSelectableItems(filteredGroupChildren)) return;
      results.push(React.cloneElement(child, { children: filteredGroupChildren }));
      return;
    }
  });

  if (sortableItems.length) {
    sortableItems
      .sort((a, b) => a.matchIndex - b.matchIndex || a.index - b.index)
      .forEach((item) => results.push(item.node));
  }

  return results;
}

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;


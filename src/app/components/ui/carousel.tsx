import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";

import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

type CarouselApi = EmblaCarouselType | undefined;

type CarouselContextValue = {
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel components must be used within <Carousel />");
  return ctx;
}

export function Carousel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [viewportRef, api] = useEmblaCarousel({ align: "start" });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((embla?: EmblaCarouselType) => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider value={{ api, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
      <div className={cn("relative", className)} {...props}>
        <div ref={viewportRef} className="overflow-hidden">
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex -ml-4", className)} {...props} />;
}

export function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)} {...props} />;
}

export function CarouselPrevious({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: "outline" }), "absolute left-2 top-1/2 h-9 w-9 -translate-y-1/2 p-0", className)}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      aria-label="Previous"
      {...props}
    >
      Prev
    </button>
  );
}

export function CarouselNext({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: "outline" }), "absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 p-0", className)}
      onClick={scrollNext}
      disabled={!canScrollNext}
      aria-label="Next"
      {...props}
    >
      Next
    </button>
  );
}


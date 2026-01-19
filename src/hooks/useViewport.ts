import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT_PX = 768;

function getWidth() {
  if (typeof window === "undefined") return MOBILE_BREAKPOINT_PX;
  return window.innerWidth;
}

export function useViewport() {
  const [width, setWidth] = useState(getWidth);

  useEffect(() => {
    const onResize = () => setWidth(getWidth());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    width,
    isMobile: width < MOBILE_BREAKPOINT_PX,
    breakpointPx: MOBILE_BREAKPOINT_PX
  };
}


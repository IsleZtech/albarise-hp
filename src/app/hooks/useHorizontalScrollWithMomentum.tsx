import { useEffect } from "react";

export function useHorizontalScrollWithMomentum({
  isDisabled,
  onScrollXChange,
}: {
  isDisabled: boolean;
  onScrollXChange: (scrollX: number) => void;
}) {
  useEffect(() => {
    if (isDisabled) {
      document.body.style.overflow = "hidden";
      return;
    } else {
      document.body.style.overflow = "";
    }

    const handleWheel = (e: WheelEvent) => {
      const scrollAmount = e.deltaY * 0.7;
      window.scrollBy({ left: scrollAmount, behavior: "auto" });
      onScrollXChange(window.scrollX);
      e.preventDefault();
    };

    let startY = 0;
    let lastY = 0;
    let lastTime = 0;
    let velocity = 0;
    let momentumFrameId: number | null = null;

    const applyMomentum = () => {
      if (Math.abs(velocity) < 0.1) return;
      window.scrollBy({ left: velocity, behavior: "auto" });
      onScrollXChange(window.scrollX);
      velocity *= 0.95;
      momentumFrameId = requestAnimationFrame(applyMomentum);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (momentumFrameId) cancelAnimationFrame(momentumFrameId);
      startY = lastY = e.touches[0].clientY;
      lastTime = Date.now();
      velocity = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY;
      const now = Date.now();
      const dt = now - lastTime;

      if (dt > 0) {
        velocity = (deltaY / dt) * 16;
      }

      window.scrollBy({ left: deltaY, behavior: "auto" });
      onScrollXChange(window.scrollX);
      lastY = currentY;
      lastTime = now;
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      momentumFrameId = requestAnimationFrame(applyMomentum);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (momentumFrameId) cancelAnimationFrame(momentumFrameId);
    };
  }, [isDisabled, onScrollXChange]);
}

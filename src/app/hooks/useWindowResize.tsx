import { useState, useCallback, useEffect } from "react";

export const useWindowResize = () => {
  const [landscape, setIsLandscape] = useState<
    null | "pc" | "landscape-prompt" | "mobile"
  >(null);
  const checkOrientation = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscapeOrientation = width > height;
    if (width > 1280) {
      setIsLandscape("pc");
    } else if (width > 700 && width <= 1280) {
      if (isLandscapeOrientation) {
        setIsLandscape("pc"); // 横向き
      } else {
        setIsLandscape("landscape-prompt"); // 縦向き
      }
    } else if (width <= 700) {
      if (isLandscapeOrientation) {
        setIsLandscape("pc"); // 横向き
      } else {
        setIsLandscape("mobile"); // 縦向き
      }
    }
  }, []);

  useEffect(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, [checkOrientation]);
  return { landscape };
};

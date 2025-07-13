'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';

export const useWindowResize = () => {
  const [landscape, setIsLandscape] = useState<null | 'pc' | 'landscape-prompt' | 'mobile'>(null);
  const checkOrientation = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscapeOrientation = width > height;
    if (width > 1280) {
      setIsLandscape('pc');
    } else if (width > 700 && width <= 1280) {
      if (isLandscapeOrientation) {
        setIsLandscape('pc'); // 横向き
      } else {
        setIsLandscape('landscape-prompt'); // 縦向き
      }
    } else if (width <= 700) {
      if (isLandscapeOrientation) {
        setIsLandscape('pc'); // 横向き
      } else {
        setIsLandscape('mobile'); // 縦向き
      }
    }
  }, []);

  useEffect(() => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [checkOrientation]);
  return { landscape };
};

export const animateText = (text: string, setDisplayText: Dispatch<SetStateAction<string>>) => {
  let index = 0;
  const timer = setInterval(() => {
    setDisplayText(text.substring(0, index + 1));
    index++;
    if (index === text.length) {
      clearInterval(timer);
    }
  }, 25);

  return () => clearInterval(timer);
};

export const animateLevel = (setIsAnimation: Dispatch<SetStateAction<boolean>>) => {
  const timer = setTimeout(() => {
    setIsAnimation(true);
  }, 10);
  return () => clearTimeout(timer);
};

export const splitTextToSpans = (text: string) => {
  return text.split('\n').map((line, index) =>
    line === '' ? (
      <br key={index} />
    ) : (
      <span key={index} className="block">
        {line}
      </span>
    ),
  );
};

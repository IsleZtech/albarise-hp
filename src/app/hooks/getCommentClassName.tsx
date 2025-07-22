import { useRef, useCallback } from "react";

type State = "idle" | "entered" | "exiting" | "exited";

export const useCommentAnimationManager = () => {
  const stateRef = useRef<Map<number, State>>(new Map());

  const isInViewport = (position: number, scrollX: number): boolean => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const px = (position / 100) * vh;
    const start = scrollX + vw * 0.05;
    const end = scrollX + vw * 0.875;
    return px >= start && px <= end;
  };

  const getClassName = (
    index: number,
    position: number,
    scrollX: number,
    styles: { [key: string]: string }
  ): string => {
    const map = stateRef.current;
    const current = map.get(index) || "idle";
    const visible = isInViewport(position, scrollX);

    if (visible && current === "idle") {
      map.set(index, "entered");
      return `${styles.comment_item} ${styles.comment_enter}`;
    }

    if (visible && current === "entered") {
      return `${styles.comment_item} ${styles.comment_visible}`;
    }

    if (!visible && current === "entered") {
      map.set(index, "exiting");
      return `${styles.comment_item} ${styles.comment_exit}`;
    }

    if (current === "exiting") {
      return `${styles.comment_item} ${styles.comment_exit}`;
    }

    if (current === "exited") {
      return `${styles.comment_item} ${styles.comment_hidden}`;
    }

    return styles.comment_item;
  };

  const handleAnimationEnd = (index: number) => {
    const current = stateRef.current.get(index);
    if (current === "exiting") {
      stateRef.current.set(index, "exited");
    }
  };

  return { getClassName, handleAnimationEnd };
};

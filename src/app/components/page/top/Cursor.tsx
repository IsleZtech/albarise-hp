import Image from "next/image";
import styles from "../../../styles/page/top/Cursor.module.css";
import cursorImage from "../../../assets/image/top/cursor.png";
import { useEffect, useState } from "react";

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 }); // 画面外に初期配置
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);
  if (!mounted) return <div></div>;
  return (
    <Image
      src={cursorImage}
      alt="カーソル"
      priority
      className={styles.cursorFollower}
      style={{
        left: mousePos.x,
        top: mousePos.y,
      }}
    />
  );
};

export default Cursor;

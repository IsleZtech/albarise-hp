"use client";

import { useEffect, useState } from "react";
import { useWindowResize } from "./hooks/animations";
import Loading from "./components/commont/Loading";
import SliderContainer from "./components/page/top/BottomSlider";
import LogoImage from "./assets/image/logo_text.png";
import Title from "./components/page/top/Title";
import Cursor from "./components/page/top/Cursor";
import TiktokImage from "./assets/image/top/tiktok.png";
import cursorImage from "./assets/image/top/cursor.png";
import MainObject from "./assets/image/top/main_object.png";
import styles from "./page.module.css";
import Image from "next/image";
import { isVisible } from "@testing-library/user-event/dist/utils";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { landscape } = useWindowResize();
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 }); // 画面外に初期配置
  const [mounted, setMounted] = useState(false);

  if (!isVisible) return null;

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (landscape === null) return <main></main>;
  if (landscape === "landscape-prompt") return <main></main>;

  return (
    <main className={styles.main}>
      {/* <Loading /> */}
      <Image src={LogoImage} alt="B1" priority className={styles.logo_image} />
      <Title />
      <Image
        src={MainObject}
        alt="メインオブジェクト"
        priority
        className={styles.main_object}
      />
      <Image
        src={TiktokImage}
        alt="メインオブジェクト"
        priority
        className={styles.tiktok_image}
      />
      <Cursor />
      <button className={styles.click_button} />
      <SliderContainer />
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
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
import MenuModal from "./components/commont/MenuModal";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [animationState, setAnimationState] = useState<number>(0);
  const { landscape } = useWindowResize();

  useEffect(() => {
    const img = new window.Image();
    img.src = MainObject.src;
    setTimeout(() => setAnimationState(1), 900); // loading
    setTimeout(() => setAnimationState(2), 1200); // fadeIn
    setTimeout(() => setAnimationState(3), 2500); // scaleUp
    setTimeout(() => setAnimationState(4), 3700); // rotate
    setTimeout(() => setAnimationState(5), 4500); // rotate
  }, []);

  if (landscape === null) return <main></main>;
  const isMobile = landscape == "mobile";
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${styles.sf}`;
  };
  return (
    <main className={styles.main} onClick={() => setIsMenuOpen(true)}>
      {animationState <= 2 && (
        <Loading isFadeOut={animationState != 0} isMobile={isMobile} />
      )}
      <Image
        src={LogoImage}
        alt="B1"
        priority
        className={`${addMobileClass(styles.logo_image)} ${
          animationState >= 5 ? styles.show : ""
        }`}
      />
      <Title isActive={animationState >= 4} isMobile={isMobile} />
      <div
        className={`${addMobileClass(styles.main_object_container)} ${
          animationState >= 2 ? styles.fadeIn : ""
        }  ${animationState >= 3 ? addMobileClass(styles.scaleUp) : ""} `}
      >
        <Image
          src={MainObject}
          alt="メインオブジェクト"
          priority
          className={`${addMobileClass(styles.main_object_item)}  ${
            animationState >= 3 ? styles.rotate : ""
          }`}
        />
      </div>
      <Link
        href={"https://www.tiktok.com/@next_live_agency"}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={TiktokImage}
          alt="TikTok"
          priority
          className={`${addMobileClass(styles.tiktok_image)} ${
            animationState >= 5 ? styles.show : ""
          }`}
        />
      </Link>
      {!isMenuOpen && <Cursor />}
      <button
        className={`${addMobileClass(styles.click_button)} ${
          animationState >= 5 ? styles.show : ""
        }`}
      />
      <SliderContainer isActive={animationState >= 5} isMobile={isMobile} />
      {isMenuOpen && (
        <MenuModal setModalOpen={setIsMenuOpen} isMobile={isMobile} />
      )}
    </main>
  );
}

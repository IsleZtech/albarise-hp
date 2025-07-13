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
import MenuModal from "./components/commont/MenuModal";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { landscape } = useWindowResize();

  if (landscape === null) return <main></main>;
  if (landscape === "landscape-prompt") return <main></main>;

  return (
    <main className={styles.main} onClick={() => setIsMenuOpen(true)}>
      {/* <Loading /> */}
      <Image src={LogoImage} alt="B1" priority className={styles.logo_image} />
      <Title />
      <Image
        src={MainObject}
        alt="メインオブジェクト"
        priority
        className={styles.main_object}
      />
      <Link
        href={"https://www.tiktok.com/@next_live_agency"}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={TiktokImage}
          alt="メインオブジェクト"
          priority
          className={styles.tiktok_image}
        />
      </Link>
      {!isMenuOpen && <Cursor />}
      <button className={styles.click_button} />
      <SliderContainer />
      {isMenuOpen && <MenuModal setModalOpen={setIsMenuOpen} />}
    </main>
  );
}

"use client";

import "../styles/globals.css";
import { useEffect, useRef, useState } from "react";
import { useWindowResize } from "../hooks/useWindowResize";
import mainImage_1 from "../assets/image/business/bg_image_1.png";
import mainImage_2 from "../assets/image/business/bg_image_2.png";
import mainImage_3 from "../assets/image/business/bg_image_3.png";
import mainImage_4 from "../assets/image/business/bg_image_4.png";
import mainImage_5 from "../assets/image/business/bg_image_5.png";
import mainImage_6 from "../assets/image/business/bg_image_6.png";
import mainImage_7 from "../assets/image/business/bg_image_7.png";
import mainImage_8 from "../assets/image/business/bg_image_8.png";
import mainImage_9 from "../assets/image/business/bg_image_9.png";
import mainImage_10 from "../assets/image/business/bg_image_10.png";
import comment_1 from "../assets/image/business/comment_1.png";
import comment_2 from "../assets/image/business/comment_2.png";
import comment_3 from "../assets/image/business/comment_3.png";
import comment_4 from "../assets/image/business/comment_4.png";
import comment_5 from "../assets/image/business/comment_5.png";
import comment_6 from "../assets/image/business/comment_6.png";
import comment_7 from "../assets/image/business/comment_7.png";
import comment_8 from "../assets/image/business/comment_8.png";
import check_1Image from "../assets/image/business/check_1.png";
import check_2Image from "../assets/image/business/check_2.png";
import LogoImage from "../assets/image/logo_text.png";
import TiktokImage from "../assets/image/top/tiktok.png";
import styles from "./page.module.css";
import Image from "next/image";
import { preloadImages } from "../hooks/useImagePreload";
import Loading from "../components/commont/Loading";
import homeStyles from "../page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrollX, setScrollX] = useState<number>(0);
  const { landscape } = useWindowResize();

  useEffect(() => {
    preloadImages(mainImages).then(() => setIsLoading(false));
    const handleWheel = (e: WheelEvent) => {
      const scrollAmount = e.deltaY * 0.7;
      window.scrollBy({ left: scrollAmount, behavior: "auto" });
      setScrollX(window.scrollX);
      e.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (landscape === null) return <main></main>;
  if (isLoading) return <main></main>;

  const isMobile = landscape == "mobile";
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${styles.sf}`;
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {mainImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="B1"
            priority
            className={`${addMobileClass(styles.main_image)}`}
          />
        ))}
      </div>

      <div className={styles.container}>
        {comments.map((comment, index) => (
          <Image
            key={index}
            src={comment.src}
            alt="B1"
            priority
            className={`${styles.comment_item} ${
              isCommentVisible(comment.position, scrollX)
                ? styles.comment_visible
                : styles.comment_hidden
            }`}
            style={{
              width: "auto",
              height: comment.height,
              marginTop: comment.marginTop,
              marginLeft: comment.marginLeft,
            }}
          />
        ))}
      </div>
      <div className={styles.container}>
        {checkPositions.map((positions, index) => (
          <Image
            key={index}
            src={index != 6 ? check_1Image : check_2Image}
            className={styles.popup}
            alt="B1"
            priority
            style={{ marginTop: positions.top, marginLeft: positions.left }}
          />
        ))}
      </div>
      <Image
        src={LogoImage}
        alt="logo"
        priority
        className={`${addMobileClass(homeStyles.logo_image)} ${
          homeStyles.show
        }`}
      />
      <Image
        src={TiktokImage}
        alt="TikTok"
        priority
        className={`${addMobileClass(homeStyles.tiktok_image)} ${
          homeStyles.show
        }`}
      />
      <button className={styles.menu}>MENU</button>
    </main>
  );
}

const isCommentVisible = (position: number, scrollX: number): boolean => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const leftInPx = (position / 100) * viewportHeight;
  const centerAreaStart = scrollX + (viewportWidth - viewportWidth * 0.9) / 2;
  const centerAreaEnd = scrollX + (viewportWidth + viewportWidth * 0.75) / 2;

  return leftInPx >= centerAreaStart && leftInPx <= centerAreaEnd;
};

const mainImages = [
  mainImage_1,
  mainImage_2,
  mainImage_3,
  mainImage_4,
  mainImage_5,
  mainImage_6,
  mainImage_7,
  mainImage_8,
  mainImage_9,
  mainImage_10,
];

const comments = [
  {
    src: comment_1,
    height: "5vh",
    marginTop: "63.8vh",
    marginLeft: "102vh",
    position: 102,
  },
  {
    src: comment_2,
    height: "5.5vh",
    marginTop: "61vh",
    marginLeft: "39.5vh",
    position: 165,
  },
  {
    src: comment_3,
    height: "5.6vh",
    marginTop: "47.5vh",
    marginLeft: "56.2vh",
    position: 237.5,
  },
  {
    src: comment_4,
    height: "5.5vh",
    marginTop: "61vh",
    marginLeft: "12vh",
    position: 277,
  },
  {
    src: comment_5,
    height: "5.7vh",
    marginTop: "67.5vh",
    marginLeft: "13vh",
    position: 311,
  },
  {
    src: comment_6,
    height: "5.5vh",
    marginTop: "51.5vh",
    marginLeft: "70.2vh",
    position: 404,
  },
  {
    src: comment_7,
    height: "5.4vh",
    marginTop: "77vh",
    marginLeft: "19vh",
    position: 443.6,
  },
  {
    src: comment_8,
    height: "5.5vh",
    marginTop: "56.3vh",
    marginLeft: "119.5vh",
    position: 583,
  },
];

const checkPositions = [
  {
    top: "5vh",
    left: "170vh",
  },
  {
    top: "17vh",
    left: "99vh",
  },
  {
    top: "5vh",
    left: "42vh",
  },
  {
    top: "13vh",
    left: "78vh",
  },
  {
    top: "5vh",
    left: "32vh",
  },
  {
    top: "20vh",
    left: "100vh",
  },
  {
    top: "7vh",
    left: "73vh",
  },
];

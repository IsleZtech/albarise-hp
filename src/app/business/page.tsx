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
import modalImage1 from "../assets/image/business/modal_image_1.png";
import modalImage2 from "../assets/image/business/modal_image_2.png";
import modalImage3 from "../assets/image/business/modal_image_3.png";
import modalImage4 from "../assets/image/business/modal_image_4.png";
import modalImage5 from "../assets/image/business/modal_image_5.png";
import Agent1 from "../../../assets/image/business/agent_1.png";
import Agent2 from "../../../assets/image/business/agent_2.png";
import Agent3 from "../../../assets/image/business/agent_3.png";
import Agent4 from "../../../assets/image/business/agent_4.png";
import Agent5 from "../../../assets/image/business/agent_5.png";
import Agent6 from "../../../assets/image/business/agent_6.png";
import Agent7 from "../../../assets/image/business/agent_7.png";
import Agent8 from "../../../assets/image/business/agent_8.png";
import Agent9 from "../../../assets/image/business/agent_9.png";
import Agent10 from "../../../assets/image/business/agent_10.png";
import Agent11 from "../../../assets/image/business/agent_11.png";
import Agent12 from "../../../assets/image/business/agent_12.png";
import Agent13 from "../../../assets/image/business/agent_13.png";
import Agent14 from "../../../assets/image/business/agent_14.png";
import Agent15 from "../../../assets/image/business/agent_15.png";
import Agent16 from "../../../assets/image/business/agent_16.png";
import Agent17 from "../../../assets/image/business/agent_17.png";
import LogoImage from "../assets/image/logo_text.png";
import TiktokImage from "../assets/image/top/tiktok.png";
import styles from "./page.module.css";
import Image from "next/image";
import { preloadImages } from "../hooks/useImagePreload";
import Loading from "../components/commont/Loading";
import homeStyles from "../page.module.css";
import CompanyModal from "../components/page/business/CompanyModal";
import MenuModal from "../components/commont/MenuModal";
import AgencysModal from "../components/page/business/AgencysModal";
import { useHorizontalScrollWithMomentum } from "../hooks/useHorizontalScrollWithMomentum";
import Link from "next/link";
import {
  agentImages,
  checkPositions,
  checkPositions_sf,
  comments,
  mainImages,
  modalDatas,
  modalImages,
  tapEvents,
} from "./const";

export default function Business() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);
  const [scrollX, setScrollX] = useState<number>(0);
  const { landscape } = useWindowResize();
  const isDisabled = modalIndex !== null || isMenuModal;

  useEffect(() => {
    const images = [...mainImages, ...modalImages, ...agentImages];
    preloadImages(images).then(() => setIsLoading(false));
  }, []);

  useHorizontalScrollWithMomentum({ isDisabled, onScrollXChange: setScrollX });

  if (landscape === null) return <main></main>;

  const isMobile = landscape == "mobile";
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${styles.sf}`;
  };
  if (isLoading) return <Loading isMobile={isMobile} />;
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
          <Link key={index} href={comment.href ?? ""}>
            <Image
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
          </Link>
        ))}
      </div>
      <div className={styles.container}>
        {(!isMobile ? checkPositions : checkPositions_sf).map(
          (positions, index) => (
            <Image
              key={index}
              src={index != 6 ? check_1Image : check_2Image}
              className={styles.popup}
              alt="B1"
              priority
              style={{ marginTop: positions.top, marginLeft: positions.left }}
            />
          )
        )}
      </div>
      <div className={styles.container}>
        {tapEvents.map((data, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setModalIndex(index);
            }}
            style={{
              width: data.width,
              height: data.height,
              marginTop: data.top,
              marginLeft: data.left,
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          ></button>
        ))}
      </div>
      <Link href={"/"} onClick={(e) => e.stopPropagation()}>
        <Image
          src={LogoImage}
          alt="logo"
          priority
          className={`${addMobileClass(homeStyles.logo_image)} ${
            homeStyles.show
          }`}
        />
      </Link>

      <Link
        href={"https://www.tiktok.com/@next_live_agency"}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={TiktokImage}
          alt="TikTok"
          priority
          className={`${addMobileClass(homeStyles.tiktok_image)} ${
            homeStyles.show
          }`}
        />
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsMenuModal(true);
        }}
        className={styles.menu}
      >
        MENU
      </button>
      {modalDatas.map(
        (data, index) =>
          index == modalIndex && (
            <CompanyModal
              setModalOpen={setModalIndex}
              isMobile={isMobile}
              title={data.title}
              subTitle={data.subTitle}
              messegeTitle={data.messageTitle}
              message={data.message}
              mainImage={data.mainImage}
              webUrl={data.webUrl}
              otherButton={index == 0}
            />
          )
      )}
      {modalIndex == 7 && (
        <AgencysModal setModalOpen={setModalIndex} isMobile={isMobile} />
      )}
      {isMenuModal && (
        <MenuModal setModalOpen={setIsMenuModal} isMobile={isMobile} />
      )}
    </main>
  );
}

const isCommentVisible = (
  position: number,
  scrollX: number,
  previouslyVisible: boolean = false
): boolean => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const leftInPx = (position / 100) * viewportHeight;
  const centerAreaStart = scrollX + (viewportWidth - viewportWidth * 0.9) / 2;
  const centerAreaEnd = scrollX + (viewportWidth + viewportWidth * 0.75) / 2;
  const margin = 20;
  if (previouslyVisible) {
    return (
      leftInPx >= centerAreaStart - margin && leftInPx <= centerAreaEnd + margin
    );
  } else {
    return leftInPx >= centerAreaStart && leftInPx <= centerAreaEnd;
  }
};

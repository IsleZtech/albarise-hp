import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import CloseIcon from "../../assets/icon/close.svg";
import logo from "../../assets/image/logo_text.png";
import tiktok from "../../assets/image/menu/tiktok.png";
import since from "../../assets/image/menu/since.png";

import styles from "../../styles/components/MenuModal.module.css";
import { animateLevel } from "../../hooks/useWindowResize";

type MenuModalProps = {
  setModalOpen: (value: boolean) => void;
  isMobile: boolean;
};

const MenuModal = ({ setModalOpen, isMobile }: MenuModalProps) => {
  const pathname = usePathname();
  const [isAnimation, setIsAnimation] = useState(false);
  useEffect(() => animateLevel(setIsAnimation), []);
  const handleCloseClick = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${styles.sf}`;
  };
  return (
    <button className={styles.main} onClick={handleCloseClick}>
      <div
        className={addMobileClass(styles.container)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          className={addMobileClass(styles.close_container)}
          onClick={handleCloseClick}
        >
          <Image
            src={CloseIcon}
            alt="sns"
            priority
            className={addMobileClass(styles.close_icon)}
          />
          CLOSE
        </button>
        {/* 中央のボタン */}
        <div className={addMobileClass(styles.menu_item_main)}>
          {isMobile && (
            <div className={addMobileClass(styles.menu_item_container)}>
              {menuItems_sf.map((data, index) => (
                <Link
                  href={data.href}
                  onClick={handleCloseClick}
                  key={index}
                  className={addMobileClass(styles.menu_item)}
                  style={{
                    opacity: `${data.page != "none" ? "1" : "0.3"}`,
                    pointerEvents: `${data.page != "none" ? "auto" : "none"}`,
                  }}
                >
                  - {data.title}
                </Link>
              ))}
            </div>
          )}
          {!isMobile && (
            <div className={addMobileClass(styles.menu_item_container)}>
              {menuItems.slice(0, 6).map((data, index) => (
                <Link
                  href={data.href}
                  onClick={handleCloseClick}
                  key={index}
                  className={addMobileClass(styles.menu_item)}
                  style={{
                    opacity: `${data.page != "none" ? "1" : "0.3"}`,
                    pointerEvents: `${data.page != "none" ? "auto" : "none"}`,
                  }}
                >
                  - {data.title}
                </Link>
              ))}
            </div>
          )}
          {!isMobile && (
            <div className={addMobileClass(styles.menu_item_container)}>
              {menuItems.slice(6).map((data, index) => (
                <Link
                  href={data.href}
                  key={index}
                  className={addMobileClass(styles.menu_item)}
                  style={{
                    opacity: `${data.page != "none" ? "1" : "0.3"}`,
                    pointerEvents: `${data.page != "none" ? "auto" : "none"}`,
                  }}
                >
                  - {data.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* 下部の右のtiktokなど */}
        <div className={addMobileClass(styles.bottom_righat_container)}>
          <Link href={tiktokUrl}>
            <Image
              src={tiktok}
              alt="tikok"
              className={addMobileClass(styles.tiktok)}
              priority
            />
          </Link>

          <Image
            src={since}
            alt="since"
            className={addMobileClass(styles.since)}
            priority
          />
        </div>
        {/* 下部のスライダー */}
        <div className={addMobileClass(styles.slider_container)}>
          <div className={addMobileClass(styles.scrollingImages)}>
            {[...Array(10)].map((_, index) => (
              <Image
                key={index}
                src={logo}
                alt="Slider"
                className={addMobileClass(styles.scrollImage)}
                priority
              />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};

export default MenuModal;

const tiktokUrl =
  "https://www.tiktok.com/@next_live_agency?_t=ZS-8y0vYcJn9T2&_r=1";

const menuItems = [
  { href: "/", title: "TOP" },
  { href: "/business", title: "BUSINESS", page: "none" },
  { href: "https://note.com/albarise_inc", title: "BLOG" },
  { href: "/contact", title: "CONTACT", page: "none" },
  { href: "/recruit", title: "RECRUIT", page: "none" },
  { href: "/company", title: "COMPANY", page: "none" },
  { href: "/about", title: "ABOUT", page: "none" },
  { href: "/work", title: "WORK", page: "none" },
];
const menuItems_sf = [
  { href: "/", title: "TOP" },
  { href: "/about", title: "ABOUT", page: "none" },
  { href: "/business", title: "BUSINESS", page: "none" },
  { href: "/work", title: "WORK", page: "none" },
  { href: "https://note.com/albarise_inc", title: "BLOG" },
  { href: "/contact", title: "CONTACT", page: "none" },
  { href: "/recruit", title: "RECRUIT", page: "none" },
  { href: "/company", title: "COMPANY", page: "none" },
];

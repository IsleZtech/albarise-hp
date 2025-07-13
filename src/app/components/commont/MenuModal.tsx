import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import CloseIcon from "../../assets/icon/close.svg";
import logo from "../../assets/image/logo_text.png";
import tiktok from "../../assets/image/menu/tiktok.png";
import since from "../../assets/image/menu/since.png";

import styles from "../../styles/components/MenuModal.module.css";
import { animateLevel } from "../../hooks/animations";

type MenuModalProps = {
  setModalOpen: (value: boolean) => void;
};

const MenuModal = ({ setModalOpen }: MenuModalProps) => {
  const pathname = usePathname();
  const [isAnimation, setIsAnimation] = useState(false);
  useEffect(() => animateLevel(setIsAnimation), []);
  const handleCloseClick = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };
  return (
    <button className={styles.main} onClick={handleCloseClick}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* 閉じるボタン */}
        <button
          className={styles.close_container}
          onClick={() => setModalOpen(false)}
        >
          <Image
            src={CloseIcon}
            alt="sns"
            priority
            className={styles.close_icon}
          />
          CLOSE
        </button>
        {/* 中央のボタン */}
        <div className={styles.menu_item_main}>
          <div className={styles.menu_item_container}>
            {menuItems.slice(0, 6).map((data, index) => (
              <Link href={data.href} key={index} className={styles.menu_item}>
                - {data.title}
              </Link>
            ))}
          </div>
          <div className={styles.menu_item_container}>
            {menuItems.slice(6).map((data, index) => (
              <Link href={data.href} key={index} className={styles.menu_item}>
                - {data.title}
              </Link>
            ))}
          </div>
        </div>
        {/* 下部の右のtiktokなど */}
        <div className={styles.bottom_righat_container}>
          <Image src={tiktok} alt="tikok" className={styles.tiktok} priority />
          <Image src={since} alt="since" className={styles.since} priority />
        </div>
        {/* 下部のスライダー */}
        <div className={styles.slider_container}>
          <div className={styles.scrollingImages}>
            {[...Array(10)].map((_, index) => (
              <Image
                key={index}
                src={logo}
                alt="Slider"
                className={styles.scrollImage}
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

const menuItems = [
  { href: "/creator", title: "TOP" },
  { href: "/business", title: "BUSINESS" },
  { href: "/blog", title: "BLOG" },
  { href: "/contact", title: "CONTACT" },
  { href: "/recruit", title: "RECRUIT" },
  { href: "/company", title: "COMPANY" },
  { href: "/about", title: "ABOUT" },
  { href: "/work", title: "WORK" },
];

import Image from "next/image";
import styles from "../../../styles/page/top/Title.module.css";
import AlbarizeImage from "../../../assets/image/top/albarize.png";
import SinceImage from "../../../assets/image/top/since.png";
import DescriptionImage from "../../../assets/image/top/description.png";

type TitleProps = {
  isActive?: boolean;
  isMobile: boolean;
};
const Title = ({ isActive, isMobile }: TitleProps) => {
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${styles.sf}`;
  };
  return (
    <>
      {/* 背景レイヤー（since_imageのみ表示） */}
      <div className={addMobileClass(styles.title_container)}>
        <Image
          src={AlbarizeImage}
          alt="albarize"
          priority
          className={addMobileClass(styles.albarize_image)}
          style={{ visibility: "hidden" }}
        />
        <Image
          src={SinceImage}
          alt="since"
          priority
          className={`${addMobileClass(styles.since_image)} ${
            isActive ? styles.show : ""
          }`}
        />
        <Image
          src={DescriptionImage}
          alt="description"
          priority
          className={`${addMobileClass(styles.description_image)} ${
            isActive ? styles.show : ""
          }`}
        />
      </div>
      {/* 前面レイヤー（albarize_imageのみ表示） */}
      <div
        className={addMobileClass(styles.title_container)}
        style={{ zIndex: "2" }}
      >
        <Image
          src={AlbarizeImage}
          alt="albarize"
          priority
          className={`${addMobileClass(styles.albarize_image)} ${
            isActive ? styles.show : ""
          }`}
        />
        <Image
          src={SinceImage}
          alt="since"
          priority
          className={addMobileClass(styles.since_image)}
          style={{ visibility: "hidden" }}
        />
        <Image
          src={DescriptionImage}
          alt="description"
          priority
          className={addMobileClass(styles.description_image)}
          style={{ visibility: "hidden" }}
        />
      </div>
    </>
  );
};

export default Title;

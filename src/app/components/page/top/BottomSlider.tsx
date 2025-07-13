import Image from "next/image";
import Link from "next/link";
import SliderContents from "../../../assets/image/top/liver_recruit.png";
import styles from "../../../styles/page/top/BottomSlider.module.css";

type SliderContainerProps = {
  isActive?: boolean;
  isMobile: boolean;
};
const SliderContainer = ({ isActive, isMobile }: SliderContainerProps) => {
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${styles.sf}`;
  };
  return (
    <Link
      href={"https://nextlive-official.jp/"}
      onClick={(e) => e.stopPropagation()}
      target="_blank"
      className={`${addMobileClass(styles.container)} ${
        isActive != false ? styles.show : ""
      }`}
    >
      <div className={addMobileClass(styles.scrollingImages)}>
        {[...Array(10)].map((_, index) => (
          <Image
            key={index}
            src={SliderContents}
            alt="Slider"
            className={addMobileClass(styles.scrollImage)}
            priority
          />
        ))}
      </div>
    </Link>
  );
};

export default SliderContainer;

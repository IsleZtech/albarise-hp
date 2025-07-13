import Image from "next/image";
import Link from "next/link";
import SliderContents from "../../../assets/image/top/liver_recruit.png";
import styles from "../../../styles/page/top/BottomSlider.module.css";
const SliderContainer = () => {
  return (
    <Link href={"/"} className={styles.container}>
      <div className={styles.scrollingImages}>
        {[...Array(10)].map((_, index) => (
          <Image
            key={index}
            src={SliderContents}
            alt="Slider"
            className={styles.scrollImage}
            priority
          />
        ))}
      </div>
    </Link>
  );
};

export default SliderContainer;

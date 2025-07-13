import Image from "next/image";
import styles from "../../../styles/page/top/Title.module.css";
import AlbarizeImage from "../../../assets/image/top/albarize.png";
import SinceImage from "../../../assets/image/top/since.png";
import DescriptionImage from "../../../assets/image/top/description.png";

const Title = () => {
  return (
    <>
      {/* 背景レイヤー（since_imageのみ表示） */}
      <div className={styles.title_container}>
        <Image
          src={AlbarizeImage}
          alt="albarize"
          priority
          className={styles.albarize_image}
          style={{ visibility: "hidden" }}
        />
        <Image
          src={SinceImage}
          alt="since"
          priority
          className={styles.since_image}
        />
        <Image
          src={DescriptionImage}
          alt="description"
          priority
          className={styles.description_image}
        />
      </div>

      {/* 前面レイヤー（albarize_imageのみ表示） */}
      <div className={styles.title_container} style={{ zIndex: "2" }}>
        <Image
          src={AlbarizeImage}
          alt="albarize"
          priority
          className={styles.albarize_image}
        />
        <Image
          src={SinceImage}
          alt="since"
          priority
          className={styles.since_image}
          style={{ visibility: "hidden" }}
        />
        <Image
          src={DescriptionImage}
          alt="description"
          priority
          className={styles.description_image}
          style={{ visibility: "hidden" }}
        />
      </div>
    </>
  );
};

export default Title;

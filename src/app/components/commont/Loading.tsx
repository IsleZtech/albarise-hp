import styles from "../../styles/components/Loading.module.css";
import { container } from "webpack";

type LoadingProps = {
  isFadeOut?: boolean;
  isBackground?: boolean;
  isMobile: boolean;
};
const Loading = ({ isFadeOut, isBackground, isMobile }: LoadingProps) => {
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${styles.sf}`;
  };
  return (
    <div
      className={`${addMobileClass(styles.main)} ${
        isFadeOut == true ? styles.fadeOut : ""
      }`}
    >
      <div className={addMobileClass(styles.loader)} />
    </div>
  );
};

export default Loading;

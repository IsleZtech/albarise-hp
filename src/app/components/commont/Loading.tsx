import styles from "../../styles/components/Loading.module.css";
import { container } from "webpack";

type LoadingProps = {
  isFadeOut?: boolean;
  isBackground?: boolean;
};
const Loading = ({ isFadeOut, isBackground }: LoadingProps) => {
  return (
    <div
      className={`${styles.main} ${isFadeOut == true ? styles.fadeOut : ""}`}
    >
      <div className={styles.loader} />
    </div>
  );
};

export default Loading;

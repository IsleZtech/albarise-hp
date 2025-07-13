import styles from "../../styles/components/Loading.module.css";
import { container } from "webpack";

const Loading = ({ isBackground }: { isBackground?: boolean }) => {
  return (
    <div className={styles.main}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loading;

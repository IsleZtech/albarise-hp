import { usePathname } from "next/navigation";

import menuStyles from "../../../styles/components/MenuModal.module.css";
import styles from "../../../styles/page/business/Modal.module.css";
import CloseIcon from "../../../assets/icon/close.svg";
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
import AgentButton from "../../../assets/image/business/agent_button.png";
import Image from "next/image";
import Link from "next/link";
import { agentDatas } from "../../../business/const";

type AgencysModalProps = {
  setModalOpen: (value: number | null) => void;
  isMobile: boolean;
};

const AgencysModal = ({ setModalOpen, isMobile }: AgencysModalProps) => {
  const pathname = usePathname();

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setModalOpen(null);
  };
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${menuStyles.sf}`;
  };
  return (
    <div className={menuStyles.main} onClick={handleCloseClick}>
      <div
        className={addMobileClass(styles.container)}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "rgba(36, 55, 40)", paddingBottom: 0 }}
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
        <h2 className={styles.title}>
          {"NEXT LIVE"}
          <span className={styles.title_agents}>- AGENCIES</span>
        </h2>
        <h3 className={styles.subTitle} style={{ margin: "0" }}>
          {"ネクストライブ 代理店一覧"}
        </h3>
        <div className={styles.agent_contents_container}>
          {agentDatas.map((data, index) => (
            <div key={index} className={styles.agent_contents}>
              <div className={styles.agent_title}> {data.name}</div>
              <Image
                src={data.image}
                alt="sns"
                priority
                className={styles.agent_image}
              />
              <Link href={data.helf}>
                <Image
                  src={AgentButton}
                  alt="sns"
                  priority
                  className={addMobileClass(styles.agent_image)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgencysModal;

import { usePathname } from "next/navigation";

import menuStyles from "../../../styles/components/MenuModal.module.css";
import styles from "../../../styles/page/business/modal.module.css";
import CloseIcon from "../../../assets/icon/close.svg";
import MainImage from "../../../assets/image/business/modal_image_2.png";
import Image, { StaticImageData } from "next/image";
import { splitTextToSpans } from "../../../hooks/spliTextToSpans";
import Link from "next/link";

type CompanyModalProps = {
  setModalOpen: (value: number | null) => void;
  isMobile: boolean;
  title: string;
  subTitle: string;
  messegeTitle?: string;
  mainImage: StaticImageData;
  message: string;
  webUrl: string;
  otherButton: boolean;
};

const CompanyModal = ({
  setModalOpen,
  isMobile,
  title,
  subTitle,
  messegeTitle,
  mainImage,
  message,
  webUrl,
  otherButton,
}: CompanyModalProps) => {
  const pathname = usePathname();

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setModalOpen(null);
  };
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${menuStyles.sf}`;
  };
  return (
    <button className={menuStyles.main} onClick={handleCloseClick}>
      <div
        className={addMobileClass(styles.container)}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "rgba(36, 55, 40)" }}
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
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.subTitle}>{subTitle}</h3>
        <div className={styles.contents_container}>
          <div className={styles.message_container}>
            {messegeTitle && (
              <h3 className={styles.subTitle2}>{messegeTitle}</h3>
            )}
            <div className={styles.message}>{splitTextToSpans(message)}</div>
            {message == "Coming Soon" && <div style={{ height: "31vh" }} />}
            <div className={styles.button_container}>
              <Link
                href={webUrl}
                className={
                  otherButton ? styles.button_short : styles.button_long
                }
              >
                公式HP
              </Link>
              {otherButton && (
                <button
                  onClick={() => setModalOpen(7)}
                  className={styles.button_short}
                >
                  代理店一覧
                </button>
              )}
            </div>
          </div>
          <Image alt="メイン" src={mainImage} className={styles.main_image} />
        </div>
      </div>
    </button>
  );
};

export default CompanyModal;

const text_contents =
  "株式会社Albumは、albariseホールディングスグループにおいてSNSマーケティング事業を担う専門会社です。YouTube、TikTok、Instagramをはじめとする主要SNSプラットフォームの運用代行を中核事業として、企画立案から撮影・編集、投稿、効果分析まで、SNSマーケティングに必要な全工程をワンストップで提供しています。\n\nまた、インフルエンサー事務所としての機能も併せ持ち、多種多様なクライアント様・メディア様との戦略的提携やキャスティング業務を手がけています。\n\nSNS運用代行事業へのキャスティング・アンバサダー戦略等、企画から実行まで一貫したマーケティングソリューションを実現しています。\n自社内で全ての業務を完結できる体制を構築することで、高品質なサービスを競争力のある価格で提供し、お客様のブランド価値向上とビジネス成長をサポートしています。";

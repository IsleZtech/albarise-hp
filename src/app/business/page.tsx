"use client";

import "../styles/globals.css";
import { useEffect, useRef, useState } from "react";
import { useWindowResize } from "../hooks/useWindowResize";
import mainImage_1 from "../assets/image/business/bg_image_1.png";
import mainImage_2 from "../assets/image/business/bg_image_2.png";
import mainImage_3 from "../assets/image/business/bg_image_3.png";
import mainImage_4 from "../assets/image/business/bg_image_4.png";
import mainImage_5 from "../assets/image/business/bg_image_5.png";
import mainImage_6 from "../assets/image/business/bg_image_6.png";
import mainImage_7 from "../assets/image/business/bg_image_7.png";
import mainImage_8 from "../assets/image/business/bg_image_8.png";
import mainImage_9 from "../assets/image/business/bg_image_9.png";
import mainImage_10 from "../assets/image/business/bg_image_10.png";
import comment_1 from "../assets/image/business/comment_1.png";
import comment_2 from "../assets/image/business/comment_2.png";
import comment_3 from "../assets/image/business/comment_3.png";
import comment_4 from "../assets/image/business/comment_4.png";
import comment_5 from "../assets/image/business/comment_5.png";
import comment_6 from "../assets/image/business/comment_6.png";
import comment_7 from "../assets/image/business/comment_7.png";
import comment_8 from "../assets/image/business/comment_8.png";
import check_1Image from "../assets/image/business/check_1.png";
import check_2Image from "../assets/image/business/check_2.png";
import modalImage1 from "../assets/image/business/modal_image_1.png";
import modalImage2 from "../assets/image/business/modal_image_2.png";
import modalImage3 from "../assets/image/business/modal_image_3.png";
import modalImage4 from "../assets/image/business/modal_image_4.png";
import modalImage5 from "../assets/image/business/modal_image_5.png";
import LogoImage from "../assets/image/logo_text.png";
import TiktokImage from "../assets/image/top/tiktok.png";
import styles from "./page.module.css";
import Image from "next/image";
import { preloadImages } from "../hooks/useImagePreload";
import Loading from "../components/commont/Loading";
import homeStyles from "../page.module.css";
import CompanyModal from "../components/page/business/CompanyModal";
import MenuModal from "../components/commont/MenuModal";
import AgencysModal from "../components/page/business/AgencysModal";
import { useHorizontalScrollWithMomentum } from "../hooks/useHorizontalScrollWithMomentum";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);
  const [scrollX, setScrollX] = useState<number>(0);
  const { landscape } = useWindowResize();
  const isDisabled = modalIndex !== null || isMenuModal;

  useEffect(() => {
    preloadImages(mainImages).then(() => setIsLoading(false));
  }, []);

  useHorizontalScrollWithMomentum({ isDisabled, onScrollXChange: setScrollX });

  if (landscape === null) return <main></main>;
  if (isLoading) return <main></main>;

  const isMobile = landscape == "mobile";
  const addMobileClass = (baseClassName: string) => {
    return !isMobile ? baseClassName : `${baseClassName} ${styles.sf}`;
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {mainImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="B1"
            priority
            className={`${addMobileClass(styles.main_image)}`}
          />
        ))}
      </div>

      <div className={styles.container}>
        {comments.map((comment, index) => (
          <Image
            key={index}
            src={comment.src}
            alt="B1"
            priority
            className={`${styles.comment_item} ${
              isCommentVisible(comment.position, scrollX)
                ? styles.comment_visible
                : styles.comment_hidden
            }`}
            style={{
              width: "auto",
              height: comment.height,
              marginTop: comment.marginTop,
              marginLeft: comment.marginLeft,
            }}
          />
        ))}
      </div>
      <div className={styles.container}>
        {(!isMobile ? checkPositions : checkPositions_sf).map(
          (positions, index) => (
            <Image
              key={index}
              src={index != 6 ? check_1Image : check_2Image}
              className={styles.popup}
              alt="B1"
              priority
              style={{ marginTop: positions.top, marginLeft: positions.left }}
            />
          )
        )}
      </div>
      <div className={styles.container}>
        {tapEvents.map((data, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setModalIndex(index);
            }}
            style={{
              width: data.width,
              height: data.height,
              marginTop: data.top,
              marginLeft: data.left,
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          ></button>
        ))}
      </div>
      <Image
        src={LogoImage}
        alt="logo"
        priority
        className={`${addMobileClass(homeStyles.logo_image)} ${
          homeStyles.show
        }`}
      />
      <Image
        src={TiktokImage}
        alt="TikTok"
        priority
        className={`${addMobileClass(homeStyles.tiktok_image)} ${
          homeStyles.show
        }`}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsMenuModal(true);
        }}
        className={styles.menu}
      >
        MENU
      </button>
      {modalDatas.map((data, index) => (
        <>
          {index == modalIndex && (
            <CompanyModal
              setModalOpen={setModalIndex}
              isMobile={isMobile}
              title={data.title}
              subTitle={data.subTitle}
              messegeTitle={data.messageTitle}
              message={data.message}
              mainImage={data.mainImage}
              webUrl={data.webUrl}
              otherButton={index == 0}
            />
          )}
        </>
      ))}
      {modalIndex == 7 && (
        <AgencysModal setModalOpen={setModalIndex} isMobile={isMobile} />
      )}
      {isMenuModal && (
        <MenuModal setModalOpen={setIsMenuModal} isMobile={isMobile} />
      )}
    </main>
  );
}

const isCommentVisible = (
  position: number,
  scrollX: number,
  previouslyVisible: boolean = false
): boolean => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const leftInPx = (position / 100) * viewportHeight;
  const centerAreaStart = scrollX + (viewportWidth - viewportWidth * 0.9) / 2;
  const centerAreaEnd = scrollX + (viewportWidth + viewportWidth * 0.75) / 2;
  const margin = 20;
  if (previouslyVisible) {
    return (
      leftInPx >= centerAreaStart - margin && leftInPx <= centerAreaEnd + margin
    );
  } else {
    return leftInPx >= centerAreaStart && leftInPx <= centerAreaEnd;
  }
};

const mainImages = [
  mainImage_1,
  mainImage_2,
  mainImage_3,
  mainImage_4,
  mainImage_5,
  mainImage_6,
  mainImage_7,
  mainImage_8,
  mainImage_9,
  mainImage_10,
];

const comments = [
  {
    src: comment_1,
    height: "5svh",
    marginTop: "63.8svh",
    marginLeft: "102svh",
    position: 102,
  },
  {
    src: comment_2,
    height: "5.5svh",
    marginTop: "61svh",
    marginLeft: "39.5svh",
    position: 165,
  },
  {
    src: comment_3,
    height: "5.6svh",
    marginTop: "47.5svh",
    marginLeft: "56.2svh",
    position: 237.5,
  },
  {
    src: comment_4,
    height: "5.5svh",
    marginTop: "61svh",
    marginLeft: "12svh",
    position: 277,
  },
  {
    src: comment_5,
    height: "5.7svh",
    marginTop: "67.5svh",
    marginLeft: "13svh",
    position: 311,
  },
  {
    src: comment_6,
    height: "5.5svh",
    marginTop: "51.5svh",
    marginLeft: "70.2svh",
    position: 404,
  },
  {
    src: comment_7,
    height: "5.4svh",
    marginTop: "77svh",
    marginLeft: "19svh",
    position: 443.6,
  },
  {
    src: comment_8,
    height: "5.5svh",
    marginTop: "56.3svh",
    marginLeft: "119.5svh",
    position: 583,
  },
];

const checkPositions = [
  {
    top: "5vh",
    left: "170svh",
  },
  {
    top: "17svh",
    left: "99svh",
  },
  {
    top: "5svh",
    left: "42svh",
  },
  {
    top: "13svh",
    left: "78svh",
  },
  {
    top: "5svh",
    left: "32svh",
  },
  {
    top: "20svh",
    left: "100svh",
  },
  {
    top: "7svh",
    left: "73svh",
  },
];

const checkPositions_sf = [
  {
    top: "4vh",
    left: "167svh",
  },
  {
    top: "16svh",
    left: "97svh",
  },
  {
    top: "4svh",
    left: "38svh",
  },
  {
    top: "13svh",
    left: "78svh",
  },
  {
    top: "4svh",
    left: "27svh",
  },
  {
    top: "18svh",
    left: "98svh",
  },
  {
    top: "5svh",
    left: "71svh",
  },
];
const modalDatas = [
  {
    title: "NEXT LIVE",
    subTitle: "ネクストライブ",
    message:
      "NEXT LIVEでは「LIVE配信でなりたい自分へ」をモットーに、Youtuberのヒカル監修の基、株式会社ネクストレベルと共にTikTok LIVE事務所を発足しました。現在は、エンリケやバンダリ亜砂也等の有名インフルエンサーをはじめ1000名以上のクリエイターと、70社以上の代理店を抱えております。\n\n日本のLIVE業界は世界的にも急速に市場拡大しており、その中でも特に急速な成長を見せるTikTok LIVEに着目し、2024年6月に設立しました。設立から７ヶ月後に開催された日韓戦では、1次代理店のランキングで獲得ダイヤモンド数第3位、勝利回数第１位にランクインしました。\nさらに年間最大のイベント“LIVE Fest 2024”では、最終順位TOP50に3名のクリエイターがランクインしました。事務所のランキングでもゴールドチームで第2位にランクインし、ロンドンで開催されたオフラインイベントに招待されました。\nまた2025年1月には約500社以上の事務所から優良エージェンシーとして4社に選ばれました。\n\nまた関西の大型キャバクラグループのA Factryと連携し、3日間に渡るトーナメントバトルを開催しました。3日間で2000万以上のギフティングが行われたバトルを全国のキャバクラ店舗での開催に向けて始動しています。\n所属するクリエイターがそれぞれのライフスタイルに合わせて才能を最大限に発揮し、成長力を世界に広げることで、私たちも共に成長し世界基準でTOPの事務所を目指しています。",
    mainImage: modalImage1,
    otherUrl: "",
    webUrl: "",
  },
  {
    title: "SNS MARKETING",
    subTitle: "SNSマーケティング",
    messageTitle: "Album",
    message:
      "株式会社Albumは、albariseホールディングスグループにおいてSNSマーケティング事業を担う専門会社です。YouTube、TikTok、Instagramをはじめとする主要SNSプラットフォームの運用代行を中核事業として、企画立案から撮影・編集、投稿、効果分析まで、SNSマーケティングに必要な全工程をワンストップで提供しています。\n\nまた、インフルエンサー事務所としての機能も併せ持ち、多種多様なクライアント様・メディア様との戦略的提携やキャスティング業務を手がけています。\n\nSNS運用代行事業へのキャスティング・アンバサダー戦略等、企画から実行まで一貫したマーケティングソリューションを実現しています。\n自社内で全ての業務を完結できる体制を構築することで、高品質なサービスを競争力のある価格で提供し、お客様のブランド価値向上とビジネス成長をサポートしています。",
    mainImage: modalImage2,
    webUrl: "",
  },
  {
    title: "LIVE COMMERCE",
    subTitle: "ライブコマース",
    messageTitle: "Alunara",
    message:
      "弊社はTikTok Shopに代表されるライブコマース市場の成長を背景に、企業の販売戦略を成功に導く専門家集団です。最初のステップとして、企業様の商品やブランドが持つ世界観と、それを最も効果的に伝えることができるライブコマースクリエイター（コマーサー）との最適なマッチングを実現します。これにより、ライブコマース成功の第一歩を力強く踏み出すことができます。\n\nさらに、弊社はクリエイターのマッチングに留まらず、自社でも複数のSNSアカウントを運用し、日々ライブコマースを実践しています。現場の最前線で培った最新の販売戦略、エンゲージメントを高める配信ノウハウにより、クライアント様の売上を最大化するための具体的な販売戦略をご提案いたします。事業の核となるのが、自社で発掘・育成するコマーサーのマネジメントです。所属クリエイターが最高のパフォーマンスを発揮できる環境を構築。質の高いライブ配信を安定的に提供することで、クライアント様のブランド価値向上と継続的な売上成長に貢献します。\n\n私たちは、企業とクリエイターを繋ぎ、実践的なノウハウと質の高い人材を提供することで、ライブコマースの成功をワンストップで支援するパートナーです。商品の先にいるお客様の共感と信頼を生み出す、新しいEコマースの形を共に創造してまいります。",
    mainImage: modalImage3,
    webUrl: "",
  },
  {
    title: "WEB MARKETING",
    subTitle: "WEBマーケティング",
    messageTitle: "ATLAS EDGE",
    message:
      "株式会社Atlas Edgeは、Webサイト制作およびSNSマーケティング支援を中心に、企業の事業成長を支える各種ソリューションを提供しています。\n\nコーポレートサイトやランディングページの制作に加え、TikTok・Instagram・YouTube・LINEを活用したSNS運用、さらには広告運用まで、デジタル領域全般におけるマーケティング活動を一貫して支援しています。クライアントの抱える課題や事業フェーズに応じた最適な戦略を立案し、企画・制作・運用・改善までをワンストップで対応いたします。\n\n「成果につながるクリエイティブ」と「実行力あるマーケティング設計」を強みとし、多くの企業様のブランド価値向上および売上拡大に貢献しています。変化の激しい市場環境においても、柔軟かつ迅速な対応を行い、持続的な成長を目指す企業のビジネスパートナーとして、最適なソリューションを提供し続けています。",
    mainImage: modalImage4,
    webUrl: "",
  },
  {
    title: "INFRASTRUCTURE",
    subTitle: "インフラ",
    messageTitle: "Apollon",
    message: "Coming Soon",
    mainImage: modalImage5,
    webUrl: "",
  },
  {
    title: "STORE",
    subTitle: "店舗事業",
    messageTitle: "Alieth",
    message: "Coming Soon",
    mainImage: modalImage5,
    webUrl: "",
  },
];

const tapEvents = [
  {
    width: "60svh",
    height: "34svh",
    top: "3.5svh",
    left: "186svh",
  },
  {
    width: "54.4svh",
    height: "41.9svh",
    top: "22svh",
    left: "44.9svh",
  },
  {
    width: "80.2svh",
    height: "59svh",
    top: "6svh",
    left: "9.2svh",
  },
  {
    width: "45.9svh",
    height: "50.8svh",
    top: "20.1svh",
    left: "7svh",
  },
  {
    width: "68.4svh",
    height: "60.8svh",
    top: "6.3svh",
    left: "6.7svh",
  },
  {
    width: "109.9svh",
    height: "46svh",
    top: "20svh",
    left: "8.3svh",
  },
];

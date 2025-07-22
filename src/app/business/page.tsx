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

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);
  const [scrollX, setScrollX] = useState<number>(0);
  const { landscape } = useWindowResize();

  useEffect(() => {
    preloadImages(mainImages).then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (modalIndex !== null || isMenuModal) {
      document.body.style.overflow = "hidden";
      return;
    }
    const handleWheel = (e: WheelEvent) => {
      const scrollAmount = e.deltaY * 0.7;
      window.scrollBy({ left: scrollAmount, behavior: "auto" });
      setScrollX(window.scrollX);
      e.preventDefault();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [modalIndex, isMenuModal]);

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
        {checkPositions.map((positions, index) => (
          <Image
            key={index}
            src={index != 6 ? check_1Image : check_2Image}
            className={styles.popup}
            alt="B1"
            priority
            style={{ marginTop: positions.top, marginLeft: positions.left }}
          />
        ))}
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

const isCommentVisible = (position: number, scrollX: number): boolean => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const leftInPx = (position / 100) * viewportHeight;
  const centerAreaStart = scrollX + (viewportWidth - viewportWidth * 0.9) / 2;
  const centerAreaEnd = scrollX + (viewportWidth + viewportWidth * 0.75) / 2;

  return leftInPx >= centerAreaStart && leftInPx <= centerAreaEnd;
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
    height: "5vh",
    marginTop: "63.8vh",
    marginLeft: "102vh",
    position: 102,
  },
  {
    src: comment_2,
    height: "5.5vh",
    marginTop: "61vh",
    marginLeft: "39.5vh",
    position: 165,
  },
  {
    src: comment_3,
    height: "5.6vh",
    marginTop: "47.5vh",
    marginLeft: "56.2vh",
    position: 237.5,
  },
  {
    src: comment_4,
    height: "5.5vh",
    marginTop: "61vh",
    marginLeft: "12vh",
    position: 277,
  },
  {
    src: comment_5,
    height: "5.7vh",
    marginTop: "67.5vh",
    marginLeft: "13vh",
    position: 311,
  },
  {
    src: comment_6,
    height: "5.5vh",
    marginTop: "51.5vh",
    marginLeft: "70.2vh",
    position: 404,
  },
  {
    src: comment_7,
    height: "5.4vh",
    marginTop: "77vh",
    marginLeft: "19vh",
    position: 443.6,
  },
  {
    src: comment_8,
    height: "5.5vh",
    marginTop: "56.3vh",
    marginLeft: "119.5vh",
    position: 583,
  },
];

const checkPositions = [
  {
    top: "5vh",
    left: "170vh",
  },
  {
    top: "17vh",
    left: "99vh",
  },
  {
    top: "5vh",
    left: "42vh",
  },
  {
    top: "13vh",
    left: "78vh",
  },
  {
    top: "5vh",
    left: "32vh",
  },
  {
    top: "20vh",
    left: "100vh",
  },
  {
    top: "7vh",
    left: "73vh",
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
    width: "60vh",
    height: "34vh",
    top: "3.5vh",
    left: "186vh",
  },
  {
    width: "54.4vh",
    height: "41.9vh",
    top: "22vh",
    left: "44.9vh",
  },
  {
    width: "80.2vh",
    height: "59vh",
    top: "6vh",
    left: "9.2vh",
  },
  {
    width: "45.9vh",
    height: "50.8vh",
    top: "20.1vh",
    left: "7vh",
  },
  {
    width: "68.4vh",
    height: "60.8vh",
    top: "6.3vh",
    left: "6.7vh",
  },
  {
    width: "109.9vh",
    height: "46vh",
    top: "20vh",
    left: "8.3vh",
  },
];

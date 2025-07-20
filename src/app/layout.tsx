export const metadata = {
  title: "株式会社ALBARISE",
  description:
    "WEBマーケティング、SNSマーケティング、企業コンサルティング、制作についてのお問い合わせ、ご相談は弊社まで。",
  openGraph: {
    title: "株式会社ALBARISE",
    description:
      "WEBマーケティング、SNSマーケティング、企業コンサルティング、制作についてのお問い合わせ、ご相談は弊社まで。",
    images: [
      {
        url: "/ogp/thumbnail.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head></head>
      <body>{children}</body>
    </html>
  );
}

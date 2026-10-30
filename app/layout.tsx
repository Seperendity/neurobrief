import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brain-paper-digest.c19111996.chatgpt.site"),
  title: "NeuroDecode Brief｜脑解码论文简报",
  description: "追踪统一多模态脑基础模型、脑信号解码、跨被试泛化、可控生成与模型驱动神经科学发现。",
  openGraph: {
    title: "NeuroDecode Brief｜脑解码论文简报",
    description: "每 3 天更新的脑解码论文研究简报，优先追踪 fMRI 与跨模态脑信号研究。",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NeuroDecode Brief 脑解码论文简报" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroDecode Brief｜脑解码论文简报",
    description: "每 3 天更新的脑解码论文研究简报，优先追踪 fMRI 与跨模态脑信号研究。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem("neurodecode-theme")==="warm"?"warm":"mono"}catch(e){document.documentElement.dataset.theme="mono"}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

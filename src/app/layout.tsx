import type { Metadata } from "next";
import "@/styles/globals.css";
import { Work_Sans } from 'next/font/google';
import Header from "@/components/header";
import LoaderWrapper from "@/components/loader/loaderWrapper";
import CustomScrollbar from "@/components/customScrollbar";
import { CartWrapper } from "@/context";

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Salesboard | Lettera Tech",
  description: "Lettera tech",
  icons: {
    icon: '/logo_small.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${workSans.variable} font-sans`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="bg-[url('/images/bg_main.jfif')] overflow-hidden bg-no-repeat bg-cover bg-center bg-fixed">
      <CartWrapper>
        <LoaderWrapper>
          <Header />
          <main>
            <CustomScrollbar>
              <div className="container mx-auto">
                <div className="w-full min-h-screen h-full bg-gradient-to-br from-[#2290FF40] to-[#2290FF40] backdrop-blur-[50.46px]">
                  {children}
                </div>
              </div>
            </CustomScrollbar>
          </main>
        </LoaderWrapper>
      </CartWrapper>
      </body>
    </html>
  );
}
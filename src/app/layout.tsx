import SessionProviderWrapper from "./SessionProviderWrapper";
import "./globals.css";

export const metadata = {
  title: "Ponto fácil",
  icons: {
    icon: "/assets/iconlogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}

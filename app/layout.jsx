import { Inter, Raleway, Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Yard Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

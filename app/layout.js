import "./globals.scss";
import Header from "./components/header/Header";

export const metadata = {
  title: {
    default: "Painting's Shop",
    template: "Painting's Shop | %s",
  },
  description: "Selling watercolors and oilcolors paintings",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

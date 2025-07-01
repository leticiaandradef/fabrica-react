import "./globals.css";

export const metadata = {
  title: "Sweet Candy",
  description: "Cupcakeria",
  charset: 'UTF-8',
  author: 'Letícia Andrade',
  keywords: 'HTML, CSS, JavaScript, React, Next.js'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
import "./globals.css";
import "@wanin/ui/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>League Funny</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/apps/exp-web/public/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}

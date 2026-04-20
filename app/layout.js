import './globals.css';

export const metadata = {
  title: 'MinCV.ai | Norges smarteste verktøy for jobbsøkere',
  description: 'MinCV.ai hjelper deg med å holde oversikt over søknader, analysere CV-en din med AI, og øve på jobbintervju – alt på ett sted.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}

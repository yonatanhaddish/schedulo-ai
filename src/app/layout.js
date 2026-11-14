import "./globals.css";

export const metadata = {
  title: "Schedulo AI",
  description:
    "A private scheduling workspace that helps internal teams find time and keep meeting context together.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

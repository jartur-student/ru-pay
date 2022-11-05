import Footer from "./footer"
import "./globals.css"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Página Principal</title>
        <meta
          name="keywords"
          content="Cardápio, RU, Pagamentos, Pix, Restaurante Universitário"
        />
        <meta name="description" content="Sistema de pagamentos de RUs" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col">
        <div className="flex-grow p-4 mb-16">{children}</div>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
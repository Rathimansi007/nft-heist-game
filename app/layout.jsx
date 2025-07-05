export const metadata = {
  title: 'NFT Heist Game',
  description: 'A pattern-matching challenge for whitelist rewards',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-indigo-900 via-purple-700 to-pink-600 min-h-screen flex items-center justify-center text-white">
        <div className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
          {children}
        </div>
      </body>
    </html>
  )
}

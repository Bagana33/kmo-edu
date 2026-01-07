import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MessengerChat } from "@/components/messenger-chat"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID && (
        <MessengerChat
          pageId={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}
          appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
          loggedInGreeting="Сайн байна уу! Танай асуултанд хариулахдаа баяртай байна."
          loggedOutGreeting="Сайн байна уу! KMO Education Center-тэй холбогдохыг хүсвэл бидэнтэй чатаар холбогдоорой."
          greetingDialogDisplay="show"
          greetingDialogDelay={3}
        />
      )}
    </div>
  )
}

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import HomePage from "./(site)/page"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}

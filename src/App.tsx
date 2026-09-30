import { Header } from './components/layout/Header.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { Hero } from './components/sections/Hero.tsx'
import { ChiSiamo } from './components/sections/ChiSiamo.tsx'
import { Dolci } from './components/sections/Dolci.tsx'
import { ProduzioneFresca } from './components/sections/ProduzioneFresca.tsx'
import { Torte } from './components/sections/Torte.tsx'
import { Recensioni } from './components/sections/Recensioni.tsx'
import { DoveSiamo } from './components/sections/DoveSiamo.tsx'
import { Contatti } from './components/sections/Contatti.tsx'
import { Orari } from './components/sections/Orari.tsx'

function App() {
  return (
    <>
      <Header />
      <main className="min-w-0 overflow-x-clip">
        <Hero />
        <ChiSiamo />
        <Dolci />
        <ProduzioneFresca />
        <Torte />
        <Recensioni />
        <DoveSiamo />
        <Contatti />
        <Orari />
      </main>
      <Footer />
    </>
  )
}

export default App

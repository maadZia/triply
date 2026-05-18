import { FilterCard } from "@/frontend/Home/FilterCard"
import { H2 } from "@/components/typography/Heading"
import { PlaceCardHorizontal } from "@/components/cards/PlaceCard/PlaceCardHorizontal"

export default function HomePage() {
  return (
    <main className="flex gap-8">
      <FilterCard />

      <div className="w-2/5 space-y-6">
        <H2>Podpowiedzi</H2>

        {new Array(3).fill(0).map((_, index) => (
          <PlaceCardHorizontal
            key={index}
            title="Zamek królewski na Wawelu"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            img="./wawel.png"
          />
        ))}
      </div>
    </main>
  )
}
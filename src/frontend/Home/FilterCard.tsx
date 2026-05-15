import { DarkCard } from "@/components/cards/DarkCard"
import { H1, H2 } from "@/components/typography/Heading"
import { P1 } from "@/components/typography/Paragraph"
import { Divider } from "@/components/atoms/Divider"
import { Fieldset, Field } from "@/components/forms/Fieldset.tsx"
import { Label } from "@/components/typography/Label"
import { Input, InputGroup } from "@/components/forms/Input"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/atoms/Button"
import { Switch } from "@/components/forms/Switch"

export function FilterCard() {
  return (
    <DarkCard className="w-3/5">
        <header className="space-y-2">
          <H1>Generator planu</H1>
          <P1 className="text-contentSecondary">
            Zdefiniuj swój wymarzony dzień. Nasz algorytm przygotuje dla Ciebie
            spersonalizowany plan zwiedzania w kilka sekund.
          </P1>
        </header>

        <Divider />

        <H2 className="text-contentTertiary">Filtry</H2>

        <Fieldset>
          <Field>
            <Label>Typ atrakcji</Label>
            <InputGroup>
              <MapPinIcon className="w-5 h-5" />
              {/* todo: change to combobox */}
              <Input placeholder="Wybierz miasto" />
            </InputGroup>
          </Field>

          <div className="flex justify-between gap-4"> 
            <Field className="w-full">
              <Label>Liczba dni</Label>
              {/* todo: change to dropdown */}
              <Input placeholder="3" />
            </Field>

            <Field className="w-full">
              <Label>Liczba dni</Label>
              {/* todo: change to calendar input */}
              <Input placeholder="mm/dd/yyyy" />
            </Field>
          </div>

          <div className="flex justify-between gap-4">
            <Field className="flex w-full items-center gap-2">
              <Label>Muzea</Label>
              <Switch />
            </Field>
            <Field className="flex w-full items-center gap-2">
              <Label>Parki</Label>
              <Switch />
            </Field>
          </div>
        </Fieldset>

        <section className="flex w-full justify-center gap-4">
          <Button outline>Zapisz preferencje</Button>
          <Button>Generuj plan</Button>
        </section>
      </DarkCard>
  )
}
import { Button } from "@/components/design-system/atoms/Button";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <main className="space-y-4 max-w-4xl mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Polityka prywatności</h1>
        <p className="text-gray-600">Ostatnia aktualizacja: 14.06.2026</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Wstęp</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
          velit feug iat, tempus enim a, scelerisque odio. Morbi metus velit,
          suscipit eu tempus sed, feugiat id dolor. Nulla elementum commodo
          scelerisque. Aenean vel vestibulum ni si, eu elementum neque. Mauris
          tempor ipsum sed libero tincidunt tincidunt. Done c nunc lacus,
          dignissim et augue a, venenatis condimentum felis. Vivamus tincidu nt
          tristique tortor at venenatis. Aenean ex odio, cursus id convallis
          sed, moles tie accumsan erat. Pellentesque euismod eros vel lorem
          tristique maximus. Curabi tur lorem ante, commodo sed porttitor in,
          tristique vehicula nunc.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Informacje</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non
          velit feug iat, tempus enim a, scelerisque odio. Morbi metus velit,
          suscipit eu tempus sed, feugiat id dolor. Nulla elementum commodo
          scelerisque. Aenean vel vestibulum ni si, eu elementum neque. Mauris
          tempor ipsum sed libero tincidunt tincidunt. Done c nunc lacus,
          dignissim et augue a, venenatis condimentum felis. Vivamus tincidu nt
          tristique tortor at venenatis. Aenean ex odio, cursus id convallis
          sed, moles tie accumsan erat. Pellentesque euismod eros vel lorem
          tristique maximus. Curabi tur lorem ante, commodo sed porttitor in,
          tristique vehicula nunc. Quisque laci nia ultricies orci vitae
          eleifend. Mauris ornare pharetra dui at ornare. Mauris fringilla,
          felis eu posuere cursus, tellus arcu tincidunt felis, non hendrerit u
          rna lacus posuere magna. Sed interdum iaculis lectus, a condimentum
          sem elementu m in. Donec mollis viverra eros, eu lobortis nulla ornare
          id. Vestibulum ac moll is quam, sed rhoncus est. Maecenas pellentesque
          justo auctor suscipit imperdiet. Sed ultrices, purus ac porttitor
          facilisis, ante urna malesuada mi, nec tincidu nt lorem tortor vel
          risus. Mauris et nibh mattis, suscipit eros ac, feugiat sem.
          Pellentesque sed sapien efficitur, sagittis diam sed, fermentum quam.
          Praesent euismod vitae ante eu dapibus. Nunc ac imperdiet libero, sed
          interdum velit. Ves tibulum bibendum pharetra nulla, porta scelerisque
          quam lobortis eget. Morbi bib endum nunc odio, vel pulvinar dui
          dignissim sed:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Adres IP</li>
          <li>Wersja przeglądarki</li>
          <li>Ciasteczka</li>
        </ul>
        <p className="text-gray-700">
          Quisque laci nia ultricies orci vitae eleifend. Mauris ornare pharetra
          dui at ornare. Mauris fringilla, felis eu posuere cursus, tellus arcu
          tincidunt felis, non hendrerit u rna lacus posuere magna. Sed interdum
          iaculis lectus, a condimentum sem elementu m in. Donec mollis viverra
          eros, eu lobortis nulla ornare id. Vestibulum ac moll is quam, sed
          rhoncus est. Maecenas pellentesque justo auctor suscipit imperdiet.
          Sed ultrices, purus ac porttitor facilisis, ante urna malesuada mi,
          nec tincidu nt lorem tortor vel risus. Mauris et nibh mattis, suscipit
          eros ac, feugiat sem. Pellentesque sed sapien efficitur, sagittis diam
          sed, fermentum quam. Praesent euismod vitae ante eu dapibus. Nunc ac
          imperdiet libero, sed interdum velit. Ves tibulum bibendum pharetra
          nulla, porta scelerisque quam lobortis eget. Morbi bib endum nunc
          odio, vel pulvinar dui dignissim sed.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Bezpieczeństwo danych</h2>
        <p className="text-gray-700">
          Quisque laci nia ultricies orci vitae eleifend. Mauris ornare pharetra
          dui at ornare. Mauris fringilla, felis eu posuere cursus, tellus arcu
          tincidunt felis, non hendrerit u rna lacus posuere magna. Sed interdum
          iaculis lectus, a condimentum sem elementu m in. Donec mollis viverra
          eros, eu lobortis nulla ornare id. Vestibulum ac moll is quam, sed
          rhoncus est. Maecenas pellentesque justo auctor suscipit imperdiet.
          Sed ultrices, purus ac porttitor facilisis, ante urna malesuada mi,
          nec tincidu nt lorem tortor vel risus. Mauris et nibh mattis, suscipit
          eros ac, feugiat sem. Pellentesque sed sapien efficitur, sagittis diam
          sed, fermentum quam. Praesent euismod vitae ante eu dapibus. Nunc ac
          imperdiet libero, sed interdum velit. Ves tibulum bibendum pharetra
          nulla, porta scelerisque quam lobortis eget. Morbi bib endum nunc
          odio, vel pulvinar dui dignissim sed.
        </p>
      </section>
      <div className="flex justify-center pt-8">
        <Button type="submit" onClick={() => navigate("/register")}>
          Akceptuję
        </Button>
      </div>
    </main>
  );
}

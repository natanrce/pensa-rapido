import Link from "next/link";
import Image from "next/image";

import Logo from "./icon.png";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-8">
      <Image src={Logo} alt="Logo" width={200} height={200} />
      <h2 className="font-bold uppercase text-xl">Pensa Rápido</h2>
      <p className="text-[#888] text-center max-w-3xl">
        O participante que responder corretamente à pergunta no menor tempo
        garantirá a chance de participar do &quot;Quem Quer Ser Um
        Milionário&quot;. Ao clicar no botão abaixo, você será direcionado ao
        jogo, onde terá 15 segundos para responder à pergunta.
      </p>
      <Link
        href="/in-game"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
      >
        Comece a Jogar
      </Link>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Brain, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo_goc.svg" 
              alt="Logo" 
              width={59} 
              height={80}
              className="h-auto"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 font-sans">Enneagram Persoonlijkheidstest</h1>
          <p className="text-xl text-[#383838] font-light">Ontdek je ware persoonlijkheidstype</p>
        </div>
        
        <div className="mb-8 rounded-lg bg-[#F7F5F1] text-card-foreground shadow-sm overflow-hidden">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold font-sans">Begin de reis naar jezelf</h2>
            <p className="text-lg text-[#383838] font-light">
              Krijg diepgaand inzicht in je persoonlijkheid, onbewuste drijfveren en groeipad.
            </p>
          </div>
          <div className="px-6 pb-6">
            <p className="mb-6 text-center font-light">
              Wees eerlijk in het beantwoorden van de vragen en ontdek je unieke persoonlijkheidsstructuur.
            </p>
            <div className="flex justify-center">
              <Link href="/test" className="inline-flex justify-center rounded-lg bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-[#2F4F43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors font-sans">
                Start de Test
              </Link>
            </div>
            <p className="mb-6 text-center font-light">
              <br />Deze Enneagramtest is samengesteld met kennis uit verschillende bronnen en stromingen waaronder het onderzoek van Katherine de Fauvre, boeken van Russ Hudson en de verhalende traditie.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="rounded-lg bg-[#F7F5F1] text-card-foreground shadow-sm">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold font-sans">
                Over het Enneagram
              </h3>
            </div>
            <div className="p-6 pt-0 text-center">
              <p className="mb-4 font-light">
                Het Enneagram is een psychologisch model voor zelfontdekking dat bestaat uit negen persoonlijkheidstypen. Iedereen heeft alle negen types in zich, maar de mate waarin ze naar voren komen en ontwikkeld zijn is bij iedereen anders.
              </p>
              <p className="font-light">
                Elk type heeft zijn eigen eigenschappen, talenten en valkuilen. Inzicht in de onderbewuste drijfveren achter gedrag, maakt het makkelijker jezelf en anderen te kunnen begrijpen.<br /><br />
              </p>
              <p className="mb-6 text-center font-light">
                Het Enneagram is niet bedoeld om je in een hokje te stoppen, maar helpt je om je bewust te worden van je automatische neigingen wat je de keuzevrijheid geeft om deze al dan niet te volgen. Metandere woorden: Kennis over je type is een startpunt voor verdere ontwikkeling.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 rounded-lg bg-[#F7F5F1] text-card-foreground shadow-sm">
            <div className="p-6 text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-sans">Tri-Type Analyse</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="mb-6 text-center font-light">
                Het Enneagram categoriseert types in 3 centra van intelligentie en deze test maakt een tri-type analyse. Dit geeft een nog completer persoonlijkheidsprofiel weer.<br /><br />
                Bij de uitslag staat vooraan je primaire type, daar heb je het hoogst op gescoord bij het beantwoorden van de vragen. Daarachter volgt het type waar je daarna het hoogst op scoort uit een ander centrum en als laatste het type wat bij jou het sterkst vertegenwoordigd is uit het overgebleven centrum. 
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-[#F7F5F1] text-card-foreground shadow-sm">
            <div className="p-6 text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-sans">De Drie Centra</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-center font-light">
                <span className="font-semibold">Buik</span> staat voor Doen<br />type 8, 9 en 1.<br /><br />
                <span className="font-semibold">Hart</span> staat voor Voelen<br />type 2, 3 en 4.<br /><br />
                <span className="font-semibold">Hoofd</span> staat voor Denken<br />type 5, 6 en 7.<br /><br />
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <p className="text-xs text-[#383838] font-light font-sans">
            ©{new Date().getFullYear()} Enneagramtest - <Link href="https://www.groeienontwikkelingscoach.nl/" target="_blank" rel="noopener noreferrer" className="underline">Groei- en Ontwikkelingscoach</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
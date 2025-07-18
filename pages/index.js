import Link from 'next/link';
import { Brain, Shield, Heart, CircleHelp, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Enneagram Persoonlijkheidstest</h1>
          <p className="text-xl text-muted-foreground">Ontdek je ware persoonlijkheidstype</p>
        </div>
        
        <div className="mb-8 shadow-lg border-2 rounded-lg overflow-hidden">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold">Begin Je Zelfontdekkingsreis</h2>
            <p className="text-lg text-muted-foreground">
              Verkrijg diepgaand inzicht in je persoonlijkheid, motivaties en groeipad
            </p>
          </div>
          <div className="px-6 pb-6">
            <p className="mb-6 text-center">
              Deze Nederlandse Enneagram test is gebaseerd op het originele Enneagram model en helpt je 
              om je dominante type, vleugel en tri-type te identificeren. Beantwoord 234 vragen met 
              'Eens', 'Oneens', of 'Deels' en ontdek je unieke persoonlijkheidsstructuur.
            </p>
            <div className="flex justify-center">
              <Link href="/test" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 text-lg">
                Start de Test <ChevronRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">De Drie Centra</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-center">
                Het Enneagram categoriseert types in drie centra: Denken (5,6,7), Voelen (2,3,4), en Instinct (8,9,1).
              </p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Tri-Type Analyse</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-center">
                Ontdek je tri-type: één type uit elk centrum dat jouw complete persoonlijkheidsstructuur weergeeft.
              </p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Vleugels & Relaties</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-center">
                Leer over je vleugel: het aangrenzende type dat je primaire type nuanceert en verdiept.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="font-semibold flex items-center">
              <CircleHelp className="mr-2 h-5 w-5" /> Over het Enneagram
            </h3>
          </div>
          <div className="p-6 pt-0">
            <p className="mb-4">
              Het Enneagram is een krachtig systeem dat negen verschillende persoonlijkheidstypen 
              beschrijft en hun onderlinge relaties verkent. Elk type heeft zijn eigen wereldbeeld, 
              motivaties, angsten en groeipad.
            </p>
            <p>
              Deze test helpt je niet alleen je primaire type te ontdekken, maar ook je vleugel 
              (aangrenzend type dat invloed heeft) en tri-type (typen uit elk centrum die 
              samen je persoonlijkheid vormen).
            </p>
          </div>
          <div className="p-6 flex items-center text-sm text-muted-foreground border-t">
            <p>Gebaseerd op het originele Riso-Hudson Enneagram Type Indicator (RHETI)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
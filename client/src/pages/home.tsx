import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CircleHelp, Heart, Brain, Shield, Target, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Enneagram Persoonlijkheidstest</h1>
          <p className="text-xl text-muted-foreground">Ontdek je ware persoonlijkheidstype</p>
        </div>
        
        <Card className="mb-8 shadow-lg border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Begin Je Zelfontdekkingsreis</CardTitle>
            <CardDescription className="text-lg">
              Verkrijg diepgaand inzicht in je persoonlijkheid, motivaties en groeipad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-center">
              Deze Nederlandse Enneagram test is gebaseerd op het originele Enneagram model en helpt je 
              om je dominante type, vleugel en tri-type te identificeren. Beantwoord 234 vragen met 
              'Eens', 'Oneens', of 'Deels' en ontdek je unieke persoonlijkheidsstructuur.
            </p>
            <div className="flex justify-center">
              <Link href="/test">
                <Button size="lg" className="px-8 py-6 text-lg">
                  Start de Test <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">De Drie Centra</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                Het Enneagram categoriseert types in drie centra: Denken (5,6,7), Voelen (2,3,4), en Instinct (8,9,1).
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Tri-Type Analyse</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                Ontdek je tri-type: één type uit elk centrum dat jouw complete persoonlijkheidsstructuur weergeeft.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Vleugels & Relaties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                Leer over je vleugel: het aangrenzende type dat je primaire type nuanceert en verdiept.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CircleHelp className="mr-2 h-5 w-5" /> Over het Enneagram
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <p>Gebaseerd op het originele Riso-Hudson Enneagram Type Indicator (RHETI)</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

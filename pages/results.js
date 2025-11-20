import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { enneagramTypes } from '../data/questions';

export default function Results() {
  const router = useRouter();
  const { id } = router.query;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Alleen fetchen als er een ID beschikbaar is (client-side navigatie)
    if (id) {
      fetchResult(id);
    }
  }, [id]);

  const fetchResult = async (resultId) => {
    try {
      const response = await fetch(`/api/results?id=${resultId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Resultaat niet gevonden');
      }
      
      const data = await response.json();
      setResult(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching result:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-2">Laden...</div>
          <div className="text-sm text-muted-foreground">Een moment geduld alstublieft</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#B56362]">Er is een fout opgetreden</h1>
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[#B56362] mb-2">{error}</p>
            <p className="text-sm text-gray-600">
              Resultaten worden tijdelijk opgeslagen. Als de server herstart, verdwijnen ze. 
              Voltooi de test opnieuw om nieuwe resultaten te genereren.
            </p>
          </div>
          <Link href="/test" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors bg-primary text-primary-foreground px-6 py-3 hover:bg-[#2F4F43]">
            Test Opnieuw Maken
          </Link>
        </div>
      </div>
    );
  }
  
  // Voor de demo, als er geen resultaat is, gebruik een standaard demo resultaat
  const finalResult = result || {
    id: 1,
    primaryType: 1,
    secondaryType: 4,
    tertiaryType: 9,
    scores: [1.8, 0.5, 0.8, 1.6, 0.7, 0.9, 1.4, 0.6, 1.7]
  };

  const primaryType = enneagramTypes.find(t => t.id === finalResult.primaryType);
  const secondaryType = enneagramTypes.find(t => t.id === finalResult.secondaryType);
  const tertiaryType = enneagramTypes.find(t => t.id === finalResult.tertiaryType);

  if (!primaryType || !secondaryType || !tertiaryType) {
    return <div>Error: Een of meer types zijn niet gevonden</div>;
  }

  const total = finalResult.scores.reduce((sum, s) => sum + s, 0) || 1;
  const getPercent = (idx) => Math.round(((finalResult.scores[idx] || 0) / total) * 100);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg bg-[#F7F5F1] text-card-foreground shadow-sm mb-8">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold leading-none tracking-tight font-sans">Je primaire Enneagram Resultaat</h3>
                <p className="text-sm text-muted-foreground font-light">
                  Type {primaryType.id} - {primaryType.name}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <h2 className="text-2xl font-bold mb-4 font-sans">
              Type {primaryType.id} - {primaryType.name}
            </h2>
            <p className="mb-6 font-light">{primaryType.description}</p>

            <div className="w-full">
              <div className="border-b border-gray-200">
                <button
                  className="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline font-sans"
                  id="accordion-trigger-1"
                  aria-expanded="true"
                  aria-controls="accordion-content-1"
                  onClick={(e) => {
                    const content = document.getElementById('accordion-content-1');
                    const expanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
                    e.currentTarget.setAttribute('aria-expanded', !expanded);
                    content.style.display = expanded ? 'none' : 'block';
                  }}
                >
                  Sterke punten
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-200"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all"
                  id="accordion-content-1"
                  aria-labelledby="accordion-trigger-1"
                  style={{ display: 'block' }}
                >
                  <div className="pb-4 pt-0">
                    <ul className="list-disc pl-6">
                      {primaryType.strengths.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-200">
                <button
                  className="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline"
                  id="accordion-trigger-2"
                  aria-expanded="true"
                  aria-controls="accordion-content-2"
                  onClick={(e) => {
                    const content = document.getElementById('accordion-content-2');
                    const expanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
                    e.currentTarget.setAttribute('aria-expanded', !expanded);
                    content.style.display = expanded ? 'none' : 'block';
                  }}
                >
                  Uitdagingen
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-200"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all"
                  id="accordion-content-2"
                  aria-labelledby="accordion-trigger-2"
                  style={{ display: 'block' }}
                >
                  <div className="pb-4 pt-0">
                    <ul className="list-disc pl-6">
                      {primaryType.weaknesses.map((weakness, i) => (
                        <li key={i}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-[#F7F5F1] text-card-foreground shadow-sm mb-8">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-xl font-semibold leading-none tracking-tight">Je Tri-Type</h3>
            <p className="text-sm text-muted-foreground">
              Je drie meest dominante types in volgorde van invloed
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Primair</h3>
                <p className="text-xl mb-1">Type {primaryType.id} ({getPercent(primaryType.id - 1)}%)</p>
                <p className="text-muted-foreground">{primaryType.name}</p>
              </div>
              <div className="rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Secundair</h3>
                <p className="text-xl mb-1">Type {secondaryType.id} ({getPercent(secondaryType.id - 1)}%)</p>
                <p className="text-muted-foreground">{secondaryType.name}</p>
              </div>
              <div className="rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Tertiair</h3>
                <p className="text-xl mb-1">Type {tertiaryType.id} ({getPercent(tertiaryType.id - 1)}%)</p>
                <p className="text-muted-foreground">{tertiaryType.name}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Je tri-type bestaat uit één type uit elk van de drie centra van intelligentie: Buik (8,9,1), Hart (2,3,4) en Hoofd (5,6,7).
               </p> 
               <p className="text-sm text-muted-foreground">
                Deze combinatie laat zien hoe Doen, Voelen en Denken in jouw persoonlijkheid tot uiting komen en geeft een completer beeld dan alleen je primaire type.
               </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link href="/" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#F7F5F1] hover:bg-[#EDE9E1] h-10 px-4 py-2">
            Terug naar Home
          </Link>
          <Link href="/test" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-[#2F4F43] h-10 px-4 py-2">
            Test Opnieuw Maken
          </Link>
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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { enneagramTypes } from '../data/questions';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResultsPDF from '../ResultsPDF';

export default function Results() {
  const router = useRouter();
  const { id } = router.query;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  
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
        throw new Error('Resultaat niet gevonden');
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

  const handleEmailSubmit = async () => {
    if (!email || !email.includes('@')) {
      alert('Voer een geldig e-mailadres in');
      return;
    }

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          resultId: id
        }),
      });
      
      if (!response.ok) {
        throw new Error('Fout bij verzenden email');
      }
      
      setShowDownload(true);
      setEmailDialogOpen(false); // Automatisch sluiten na succes
      alert('Bedankt! Je kunt nu het PDF-bestand downloaden.');
    } catch (error) {
      console.error('Email error:', error);
      alert('Er is een fout opgetreden. Probeer het nogmaals.');
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Er is een fout opgetreden</h1>
          <p className="mb-4">{error === 'Resultaat niet gevonden' ? 'Je resultaat kon niet worden gevonden. Mogelijk is de test verlopen of is de server herstart.' : error}</p>
          <Link href="/test" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Test Opnieuw Maken</Link>
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
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-8">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Je Enneagram Resultaat</h3>
                <p className="text-sm text-muted-foreground">
                  Type {primaryType.id} - {primaryType.name}
                </p>
              </div>
              <button 
                onClick={() => setEmailDialogOpen(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
          <div className="p-6 pt-0">
            <h2 className="text-2xl font-bold mb-4">
              Type {primaryType.id} - {primaryType.name}
            </h2>
            <p className="mb-6">{primaryType.description}</p>

            <div className="w-full">
              <div className="border-b border-gray-200">
                <button
                  className="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline"
                  id="accordion-trigger-1"
                  aria-expanded="false"
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
                  style={{ display: 'none' }}
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
                  aria-expanded="false"
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
                  style={{ display: 'none' }}
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

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-8">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Je Tri-Type</h3>
            <p className="text-sm text-muted-foreground">
              Je drie meest dominante types in volgorde van invloed
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Primair</h3>
                <p className="text-xl mb-1">Type {primaryType.id} ({getPercent(primaryType.id - 1)}%)</p>
                <p className="text-muted-foreground">{primaryType.name}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Secundair</h3>
                <p className="text-xl mb-1">Type {secondaryType.id} ({getPercent(secondaryType.id - 1)}%)</p>
                <p className="text-muted-foreground">{secondaryType.name}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Tertiair</h3>
                <p className="text-xl mb-1">Type {tertiaryType.id} ({getPercent(tertiaryType.id - 1)}%)</p>
                <p className="text-muted-foreground">{tertiaryType.name}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Je tri-type laat zien hoe de drie verschillende centra van intelligentie - hoofd, hart en lichaam - in jouw persoonlijkheid tot uiting komen. 
                Dit geeft een completer beeld van je persoonlijkheid dan alleen je primaire type.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Terug naar Home
          </Link>
          <Link href="/test" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Test Opnieuw Maken
          </Link>
        </div>
      </div>

      {/* Email Dialog */}
      {emailDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">Download je resultaten</h2>
              <p className="text-sm text-muted-foreground">
                Voer je e-mailadres in om het PDF-bestand te downloaden.
              </p>
            </div>
            <div className="space-y-4">
              <form onSubmit={handleEmailSubmit}>
                <div>
                  <label htmlFor="email" className="text-sm font-medium leading-none">
                    E-mailadres
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jouw@email.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
                  disabled={!email}
                >
                  Versturen
                </button>
              </form>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setEmailDialogOpen(false)}
                className="flex-1 border border-gray-300 rounded-lg py-2 font-medium hover:bg-gray-100 transition"
              >
                Annuleren
              </button>
              {showDownload && result && (
                <PDFDownloadLink
                  document={<ResultsPDF result={result} enneagramTypes={enneagramTypes} />}
                  fileName="enneagram-resultaat.pdf"
                  className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                >
                  {({ loading }) => (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      {loading ? 'PDF genereren...' : 'Download PDF'}
                    </>
                  )}
                </PDFDownloadLink>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { apiRequest } from "@/lib/queryClient";
import ErrorDisplay from "@/components/ErrorDisplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { ResultsPDF } from "@/components/ResultsPDF";
import { useToast } from "@/hooks/use-toast";
import type { Result } from "@shared/schema";
import type { EnneagramType } from "@shared/types";

export default function Results() {
  const params = useParams();
  const id = params?.id;
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const { toast } = useToast();

  const { data: result, isLoading: resultLoading, error: resultError } = useQuery<Result>({
    queryKey: [`/api/results/${id}`],
    retry: 3,
  });

  const { data: types, isLoading: typesLoading, error: typesError } = useQuery<EnneagramType[]>({
    queryKey: ["/api/types"],
    retry: 3,
  });

  const sendEmailMutation = useMutation({
    mutationFn: async (data: { email: string; resultId: number }) => {
      const response = await apiRequest("POST", "/api/notify", data);
      return await response.json();
    },
    onSuccess: () => {
      setShowDownload(true);
      setEmailDialogOpen(false); // Automatisch sluiten na succes
      toast({
        title: "Bedankt!",
        description: "Je kunt nu het PDF-bestand downloaden.",
      });
    },
    onError: (error) => {
      toast({
        title: "Fout bij verzenden",
        description: "Er is een fout opgetreden. Probeer het nogmaals.",
        variant: "destructive",
      });
      console.error("Email error:", error);
    }
  });

  const handleEmailSubmit = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Ongeldige e-mail",
        description: "Voer een geldig e-mailadres in",
        variant: "destructive",
      });
      return;
    }

    if (result && id) {
      // Convert id to number if it's a string
      const resultId = typeof id === 'string' ? parseInt(id, 10) : result.id;
      console.log(`Submitting email: ${email} for result ID: ${resultId}`);
      sendEmailMutation.mutate({ email, resultId });
    } else {
      toast({
        title: "Fout",
        description: "Resultaat ID ontbreekt of is niet geldig",
        variant: "destructive",
      });
      console.error(`Invalid result or ID for email submission: Result:`, result, `ID:`, id);
    }
  };

  if (resultLoading || typesLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-lg mb-2">Laden...</div>
        <div className="text-sm text-muted-foreground">Een moment geduld alstublieft</div>
      </div>
    </div>;
  }
  
  if (resultError || typesError) {
    return <ErrorDisplay 
      title="Er is een fout opgetreden"
      message={resultError?.message || typesError?.message || "Probeer het later opnieuw"}
    />;
  }
  
  if (!result || !types) {
    return <ErrorDisplay 
      title="Geen gegevens gevonden"
      message="De resultaten zijn niet beschikbaar"
      code='404: {"message":"Result not found"}'
    />;
  }

  const primaryType = types.find((t) => t.id === result.primaryType);
  const secondaryType = types.find((t) => t.id === result.secondaryType);
  const tertiaryType = types.find((t) => t.id === result.tertiaryType);

  if (!primaryType || !secondaryType || !tertiaryType) {
    return <div>Error: Een of meer types zijn niet gevonden</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Je Enneagram Resultaat</CardTitle>
                <CardDescription>
                  Type {primaryType.id} - {primaryType.name}
                </CardDescription>
              </div>
              <Button size="sm" onClick={() => setEmailDialogOpen(true)}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">
              Type {primaryType.id} - {primaryType.name}
            </h2>
            <p className="mb-6">{primaryType.description}</p>

            <Accordion type="multiple" className="w-full">
              <AccordionItem value="strengths">
                <AccordionTrigger>Sterke punten</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6">
                    {primaryType.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="weaknesses">
                <AccordionTrigger>Uitdagingen</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6">
                    {primaryType.weaknesses.map((weakness, i) => (
                      <li key={i}>{weakness}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Je Tri-Type</CardTitle>
            <CardDescription>
              Je drie meest dominante types in volgorde van invloed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Primair</h3>
                <p className="text-xl mb-1">Type {primaryType.id}</p>
                <p className="text-muted-foreground">{primaryType.name}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Secundair</h3>
                <p className="text-xl mb-1">Type {secondaryType.id}</p>
                <p className="text-muted-foreground">{secondaryType.name}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Tertiair</h3>
                <p className="text-xl mb-1">Type {tertiaryType.id}</p>
                <p className="text-muted-foreground">{tertiaryType.name}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Je tri-type laat zien hoe de drie verschillende centra van intelligentie - hoofd, hart en lichaam - in jouw persoonlijkheid tot uiting komen. 
                Dit geeft een completer beeld van je persoonlijkheid dan alleen je primaire type.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Terug naar Home
          </Button>
          <Button onClick={() => window.location.href = "/test"}>
            Test Opnieuw Maken
          </Button>
        </div>
      </div>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download je resultaten</DialogTitle>
            <DialogDescription>
              Voer je e-mailadres in om het PDF-bestand te downloaden.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                type="email"
                placeholder="jouw@email.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Annuleren
            </Button>
            {showDownload ? (
              <PDFDownloadLink
                document={
                  <ResultsPDF
                    result={result}
                    primaryType={primaryType}
                    secondaryType={secondaryType}
                    tertiaryType={tertiaryType}
                  />
                }
                fileName={`enneagram-resultaat-type-${primaryType.id}.pdf`}
              >
                {({ loading }) => (
                  <Button disabled={loading}>
                    <Download className="h-4 w-4 mr-2" />
                    {loading ? "Laden..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            ) : (
              <Button onClick={handleEmailSubmit}>
                Bevestigen
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
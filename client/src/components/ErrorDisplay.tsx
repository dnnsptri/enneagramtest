
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  code?: string | number;
  buttonText?: string;
}

export default function ErrorDisplay({
  title = "Er is een fout opgetreden",
  message = "Probeer het later opnieuw",
  code,
  buttonText = "Terug naar Home"
}: ErrorDisplayProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg border-2">
        <CardContent className="pt-6">
          <div className="flex mb-4 items-center gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          
          {code && (
            <div className="mb-4 text-sm text-muted-foreground">
              {typeof code === 'object' ? JSON.stringify(code) : code}
            </div>
          )}

          <p className="mt-2 mb-6 text-muted-foreground">{message}</p>
          
          <Link href="/">
            <Button className="w-full">{buttonText}</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

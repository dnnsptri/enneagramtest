import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md p-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Pagina Niet Gevonden</h2>
        <p className="text-lg text-muted-foreground mb-6">
          De pagina die je zoekt bestaat niet
        </p>
        <div className="bg-muted p-4 rounded-lg mb-6 text-xs font-mono">
          Error Code: 404
        </div>
        <Link href="/">
          <a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Terug naar Home
          </a>
        </Link>
      </div>
    </div>
  );
}
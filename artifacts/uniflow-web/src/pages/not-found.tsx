import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground font-sans">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-heading font-extrabold text-primary">404</h1>
        <h2 className="text-2xl font-bold">Page non trouvée</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link href="/">
          <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
            Retour à l'accueil
          </button>
        </Link>
      </div>
    </div>
  );
}

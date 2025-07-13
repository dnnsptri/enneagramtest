# Next.js Deployment Versie van Enneagram Test

Deze map bevat een Next.js-versie van de Enneagram Test applicatie, speciaal voorbereid voor deployment op Vercel via GitHub. Deze versie is een zelfstandige applicatie die onafhankelijk is van de Express/Vite-versie in de hoofdmap.

## Mapstructuur

- `pages/` - React componenten voor elke route in de applicatie
- `styles/` - CSS stijlen met Tailwind CSS
- `next.config.js` - Next.js configuratie
- `vercel.json` - Configuratie voor Vercel deployment
- `next-package.json` - Package.json bestand (hernoemen naar `package.json` bij gebruik)
- `tailwind.config.next.js` - Tailwind CSS configuratie (hernoemen naar `tailwind.config.js` bij gebruik)
- `next-postcss.config.js` - PostCSS configuratie (hernoemen naar `postcss.config.js` bij gebruik)
- `next.gitignore` - Gitignore bestand (hernoemen naar `.gitignore` bij gebruik)
- `jsconfig.json` - JavaScript configuratie voor editor ondersteuning
- `DEPLOYMENT_INSTRUCTIES.md` - Gedetailleerde instructies voor deployment

## Hoe te gebruiken

Zie `DEPLOYMENT_INSTRUCTIES.md` voor stap-voor-stap instructies om deze versie van de applicatie te deployen op Vercel.

## Verschillen met de Express/Vite-versie

- Deze versie gebruikt mock data voor demonstratiedoeleinden
- De UI is vergelijkbaar, maar geïmplementeerd met Pure React/Next.js componenten
- Er is geen backend API nodig; alle logica wordt client-side uitgevoerd
- Alle berekeningen gebeuren in de browser

## Lokaal testen

Als je deze Next.js-versie lokaal wilt testen:

1. Kopieer deze map naar een nieuwe locatie
2. Hernoem de bestanden zoals aangegeven in de DEPLOYMENT_INSTRUCTIES.md
3. Voer de volgende commando's uit:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000 in je browser

## Opmerking

Deze versie is bedoeld als een standalone applicatie voor eenvoudige deployment. Voor productiegebruik raden we aan om de backend API te integreren voor persistent data management.
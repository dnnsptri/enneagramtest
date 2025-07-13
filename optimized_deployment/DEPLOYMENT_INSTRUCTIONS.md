# Deployment Instructies voor Enneagram Test

Volg deze stappen om de Enneagram Test app te deployen naar Vercel via GitHub.

## Stap 1: Voorbereiden van het Next.js project

Je hebt nu een volledig functionerend Next.js project in deze repository. De belangrijkste bestanden zijn:

- `pages/` - bevat alle pagina's van de applicatie
- `styles/` - bevat de CSS stijlen
- `next.config.js` - configuratie voor Next.js
- `tailwind.config.next.js` - configuratie voor Tailwind CSS
- `next-package.json` - package.json voor Next.js
- `next-postcss.config.js` - PostCSS configuratie voor Next.js
- `vercel.json` - configuratie voor Vercel deployment

## Stap 2: Maak een nieuw GitHub repository

1. Ga naar [GitHub](https://github.com) en log in met je account
2. Klik op de "+" knop rechtsboven en kies "New repository"
3. Geef je repository een naam (bijvoorbeeld "enneagram-test")
4. Kies of je repository publiek of privé wilt maken
5. Klik op "Create repository"

## Stap 3: Voorbereiden van je lokale project voor GitHub

1. Maak een nieuwe map op je computer voor het Next.js project
2. Kopieer de volgende bestanden naar deze map:
   - De hele `pages/` map
   - De hele `styles/` map
   - `next.config.js`
   - `vercel.json`
   - Hernoem `next-package.json` naar `package.json`
   - Hernoem `tailwind.config.next.js` naar `tailwind.config.js`
   - Hernoem `next-postcss.config.js` naar `postcss.config.js`
   - Hernoem `next.gitignore` naar `.gitignore`
   - Hernoem `next-README.md` naar `README.md`
   - `jsconfig.json`

3. Open een terminal in deze map en initialiseer een Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. Verbind je lokale repository met GitHub:
   ```bash
   git remote add origin https://github.com/jouw-username/jouw-repository.git
   git push -u origin main
   ```

## Stap 4: Deploy naar Vercel

1. Ga naar [Vercel](https://vercel.com) en log in (maak een account aan indien nodig)
2. Klik op "New Project"
3. Selecteer je GitHub repository uit de lijst
4. Vercel zal automatisch detecteren dat het een Next.js project is
5. Klik op "Deploy"

Vercel zal je applicatie nu bouwen en deployen. Na een korte wachttijd krijg je een URL waar je applicatie live staat.

## Stap 5: Controleer de deployment

1. Bezoek de URL die Vercel heeft gegeven
2. Controleer of alle pagina's correct worden weergegeven
3. Test de functionaliteit van de Enneagram test

## Aangepaste domeinnaam (optioneel)

Als je een aangepaste domeinnaam wilt gebruiken:

1. Ga naar je project settings in Vercel
2. Klik op "Domains"
3. Voeg je domeinnaam toe en volg de instructies om DNS in te stellen

## Updates en onderhoud

Om wijzigingen aan je applicatie te maken:

1. Maak de wijzigingen in je lokale repository
2. Commit en push naar GitHub:
   ```bash
   git add .
   git commit -m "Beschrijving van wijzigingen"
   git push
   ```

3. Vercel zal automatisch een nieuwe versie bouwen en deployen

---

Bij vragen of problemen, raadpleeg de [Vercel documentatie](https://vercel.com/docs) of de [Next.js documentatie](https://nextjs.org/docs).
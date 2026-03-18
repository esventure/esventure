

## PDF Download knop op Style Guide

Ik genereer de style guide als een PDF-bestand via een script met `docx-js` → LibreOffice → PDF, of direct via `reportlab`. Gezien de visuele aard van de style guide (kleuren, fonts, cards) is de beste aanpak:

**Aanpak: Genereer PDF met ReportLab**

Een Python-script dat de Es Venture style guide als PDF genereert met de juiste kleuren, typografie, en layout. Dan voeg ik een "Download PDF" knop toe aan de StyleGuide pagina die linkt naar het bestand.

### Stappen

1. **Genereer PDF** via `lov-exec` met ReportLab:
   - Logo sectie (SVG → PNG conversie of placeholder)
   - Kleurenswatches met hex codes
   - Typografie voorbeelden (Poppins + Nunito Sans, of fallback Arial)
   - Button stijlen beschreven
   - Tone of Voice do's en don'ts
   - Output naar `/mnt/documents/es-venture-style-guide.pdf`

2. **QA**: Convert naar images en controleer visueel

3. **Download knop toevoegen** aan `src/pages/StyleGuide.tsx`:
   - Een `<Button>` in de header naast "Terug naar website"
   - Linkt naar het PDF bestand in `/mnt/documents/`
   - Alternatief: gebruik `window.print()` voor een snelle browser-native PDF export die de huidige pagina exact vastlegt

### Aanbevolen: Browser Print approach

Gezien de style guide al perfect gerenderd wordt in de browser, is de meest betrouwbare aanpak een **"Download PDF" knop die `window.print()` aanroept** met print-specifieke CSS (`@media print`). Dit:
- Behoudt exact dezelfde layout als de webpagina
- Toont kleuren, cards, en spacing correct
- Vereist geen externe script of apart bestand

**Wijzigingen:**
- **`src/pages/StyleGuide.tsx`**: Download PDF knop toevoegen in de header
- **`src/index.css`**: `@media print` styles toevoegen (verberg navigatie, pas margins aan)


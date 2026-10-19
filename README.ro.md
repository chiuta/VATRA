# VATRA — Enciclopedia supraviețuirii

[English](README.md) · **Română** · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versiune:** 1.3.0 · **Ultima actualizare:** 2026-10-19

Limbile interfeței: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

**Live / demo:** https://chiuta.github.io/VATRA/

![VATRA — captură de ecran / screenshot](screenshot.png)

Ghid de supraviețuire într-un singur fișier HTML (`index.html`), în română: ~21 de secțiuni (apă, foc, adăpost, hrană, noduri, prim ajutor, semnalizare, navigație fără GPS, vreme, medii, dezastre, faună periculoasă, resurse pentru România), trusă de urgență interactivă, calculatoare (apă, calorii, hipotermie/hipertermie, azimut), busolă, glosar și test de cunoștințe.

**Conținut educațional general; nu înlocuiește un curs certificat de prim ajutor sau de supraviețuire, echipa de salvare locală sau evaluarea medicală de specialitate.** În urgență, în România, sună 112. Informațiile din ghid (inclusiv cifre, numere de contact, date despre faună sau legislație) pot deveni depășite; verifică sursele oficiale. Calculatoarele sunt orientative.

## Utilizare
Caută în tot ghidul din câmpul din bara laterală (scurtătura `/`).
Deschide `index.html` în browser (sau varianta publicată prin GitHub Pages); funcționează offline. Temă „Noapte”/„Zi” în bara laterală (alegerea se păstrează). Bifele trusei, notițele proprii, progresul testului și tema se salvează automat local în browser (`localStorage`, cheia `vatra:v1`); le poți șterge din bara laterală („Șterge datele salvate în browser”) sau exporta/importa ca fișier.

## Funcții noi (v1.1.0, 14 octombrie 2026)

Fără funcții de învățare noi în această versiune: **repetiția spațiată există deja** (§19 Test de cunoștințe, „Mod: Repetiție spațiată”, cu export/import al progresului) și nu a fost dublată. Singura adăugire este kitul de mai jos.

### Transparență și copie de siguranță (fff-kit)

Un clic (sau Enter) pe versiunea afișată (`v 1.1.0 · 2026-10-14`) deschide fereastra „Transparență”: gazdele de rețea declarate (0 cereri externe), cheile de stocare locală cu dimensiuni, API-urile folosite, mărimea și SHA-256 al fișierului (cu verificator pentru un fișier descărcat) și **copia de siguranță** a datelor aplicației într-un fișier `.fff.json` (opțional criptat cu parolă, AES-GCM 256 / PBKDF2; parola nu poate fi recuperată), import cu confirmare și ștergerea datelor aplicației. Kitul (`fff-kit`, module: core, label, bundle) este lipit în `index.html`, nu face cereri de rețea și nu schimbă datele existente; fără el aplicația funcționează la fel. Copia de siguranță a kitului cuprinde cheia de stocare opțională a aplicației (dacă ai activat păstrarea pe dispozitiv), nu progresul testului, care se exportă prin „Exportă progresul”. Textele kitului sunt în 8 limbi (ro, en, fr, it, es, pt, hu, de); **traducerile fr/it/es/pt/hu/de sunt automate și neverificate nativ**. Interfața aplicației însăși rămâne în română.

## Date și confidențialitate
Verificat prin audit: pagina nu face cereri de rețea (0 cereri la încărcare, fără `fetch`/CDN/fonturi externe) și nu trimite nimic nicăieri; singura stocare este `localStorage` local (cheia `vatra:v1`, cu bifele trusei, notițele, progresul testului și tema), la fel de privată ca fișierul însuși. Geolocalizarea (butonul din calculatorul de azimut) se folosește doar la cerere, local. Linkurile externe (Salvamont, RO-ALERT, Crucea Roșie etc.) se deschid doar la click. Are politică CSP strictă (meta): fără conexiuni de rețea (`connect-src 'none'`), scriptul permis doar pe bază de hash SHA-256 (fără `unsafe-inline` pentru script), stilurile inline.

## Limitări
- Surse citate parțial (fără trimiteri bibliografice detaliate); estimarea populației de urși are acum sursă (AGERPRES, 10 aprilie 2025); legislația privind intervenția asupra urșilor se schimbă des (OUG 60/2025 și legea ulterioară) și nu este citată articol cu articol: verifică legislatie.just.ro.
- Testul de comestibilitate și procedurile de prim ajutor sunt rezumate generale, nu protocoale medicale.

## Licență

MIT — vezi fișierul `LICENSE`. © 2026 Alexandru-Ionuț Chiuță (Alexio). Eventualele biblioteci terțe incluse în fișier își păstrează licențele proprii.

Linkul „Raportează o eroare” (GitHub) trimite acum la `chiuta/vatra`. Indicațiile medicale/de supraviețuire (inclusiv testul universal de comestibilitate, marcat „doar plante, ultimă soluție”) rămân conținut al autorului, cu disclaimerul din pagină și de mai sus.

Audit: 2026-10-10

## Istoric / Changelog

### 1.2.0 — 2026-10-19
- Nou: în calculatorul „Azimut & distanță”, legătura „↗ Cerul de acum, în Bolta” (poziția din câmpuri, rotunjită la ~1 km; deschidere în filă nouă; avertisment de istoric).

### 1.1.0 — 2026-10-14
- fff-kit: fereastra „Transparență” (clic pe versiune) și copie de siguranță unitară `.fff.json`. Conținutul și repetiția spațiată nu s-au schimbat.

### 1.0.4 — 2026-10-12
- Versiunea și data ultimei actualizări sunt afișate în aplicație (bara laterală).

### 1.0.3 — 11 octombrie 2026 (runda 7)
- Nou: căutare în tot ghidul (câmp în bara laterală, scurtătura `/`; fără diacritice, rezultate cu fragment și salt la pasajul găsit).
- Reparat: pe secțiunile în afară de Acasă pagina nu avea niciun titlu de nivel 1 (axe-core `page-has-heading-one`); acum antetul „VATRA” din bara laterală devine titlu de nivel 1 în afara paginii Acasă.

### 1.0.2 — 11 octombrie 2026 (runda 6)
- Adăugat: salvare automată locală a trusei, notițelor, progresului testului și temei (cu buton de ștergere); CSP cu `script-src` pe hash.

### 1.0.1 — 11 octombrie 2026
- Reparat: titlul din hero nu mai afișează caractere aleatoare în timpul animației (efect de revelare; textul final este mereu în pagină).
- Reparat: accesibilitate: antetul mobil este `<header>`, titlurile din subsol sunt h3 (ordine corectă); 0 violări axe-core la 1280 și 360 px.
- Adăugat: politică CSP strictă; versiune 1.0.1 afișată în bara laterală.
- Actualizat: date despre urși verificate la 11.10.2026 (sursă: AGERPRES, 10.04.2025); formularea despre legislație nu mai afirmă o modificare neverificată din mai 2026. Surse verificate la 11.10.2026.


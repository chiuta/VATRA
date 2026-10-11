# VATRA — Enciclopedia supraviețuirii

**Live / demo:** https://chiuta.github.io/VATRA/

![VATRA — captură de ecran / screenshot](screenshot.png)

**Ultima actualizare:** 11 octombrie 2026 · versiune 1.0.2


Ghid de supraviețuire într-un singur fișier HTML (`index.html`), în română: ~21 de secțiuni (apă, foc, adăpost, hrană, noduri, prim ajutor, semnalizare, navigație fără GPS, vreme, medii, dezastre, faună periculoasă, resurse pentru România), trusă de urgență interactivă, calculatoare (apă, calorii, hipotermie/hipertermie, azimut), busolă, glosar și test de cunoștințe.

**Conținut educațional general; nu înlocuiește un curs certificat de prim ajutor sau de supraviețuire, echipa de salvare locală sau evaluarea medicală de specialitate.** În urgență, în România, sună 112. Informațiile din ghid (inclusiv cifre, numere de contact, date despre faună sau legislație) pot deveni depășite; verifică sursele oficiale. Calculatoarele sunt orientative.

## Utilizare
Deschide `index.html` în browser (sau varianta publicată prin GitHub Pages); funcționează offline. Temă „Noapte”/„Zi” în bara laterală (alegerea se păstrează). Bifele trusei, notițele proprii, progresul testului și tema se salvează automat local în browser (`localStorage`, cheia `vatra:v1`); le poți șterge din bara laterală („Șterge datele salvate în browser”) sau exporta/importa ca fișier.

## Date și confidențialitate
Verificat prin audit: pagina nu face cereri de rețea (0 cereri la încărcare, fără `fetch`/CDN/fonturi externe) și nu trimite nimic nicăieri; singura stocare este `localStorage` local (cheia `vatra:v1`, cu bifele trusei, notițele, progresul testului și tema), la fel de privată ca fișierul însuși. Geolocalizarea (butonul din calculatorul de azimut) se folosește doar la cerere, local. Linkurile externe (Salvamont, RO-ALERT, Crucea Roșie etc.) se deschid doar la click. Are politică CSP strictă (meta): fără conexiuni de rețea (`connect-src 'none'`), scriptul permis doar pe bază de hash SHA-256 (fără `unsafe-inline` pentru script), stilurile inline.

## Limitări
- Surse citate parțial (fără trimiteri bibliografice detaliate); estimarea populației de urși are acum sursă (AGERPRES, 10 aprilie 2025); legislația privind intervenția asupra urșilor se schimbă des (OUG 60/2025 și legea ulterioară) și nu este citată articol cu articol: verifică legislatie.just.ro.
- Testul de comestibilitate și procedurile de prim ajutor sunt rezumate generale, nu protocoale medicale.

## Licență
Nu este declarată o licență în aplicație; nu există fișier `LICENSE` (decizia autorului).

Linkul „Raportează o eroare” (GitHub) trimite acum la `chiuta/vatra`. Indicațiile medicale/de supraviețuire (inclusiv testul universal de comestibilitate, marcat „doar plante, ultimă soluție”) rămân conținut al autorului, cu disclaimerul din pagină și de mai sus.

Audit: 2026-10-10

## Istoric / Changelog

### 1.0.2 — 11 octombrie 2026 (runda 6)
- Adăugat: salvare automată locală a trusei, notițelor, progresului testului și temei (cu buton de ștergere); CSP cu `script-src` pe hash.

### 1.0.1 — 11 octombrie 2026
- Reparat: titlul din hero nu mai afișează caractere aleatoare în timpul animației (efect de revelare; textul final este mereu în pagină).
- Reparat: accesibilitate: antetul mobil este `<header>`, titlurile din subsol sunt h3 (ordine corectă); 0 violări axe-core la 1280 și 360 px.
- Adăugat: politică CSP strictă; versiune 1.0.1 afișată în bara laterală.
- Actualizat: date despre urși verificate la 11.10.2026 (sursă: AGERPRES, 10.04.2025); formularea despre legislație nu mai afirmă o modificare neverificată din mai 2026. Surse verificate la 11.10.2026.


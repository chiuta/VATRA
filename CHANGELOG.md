# Jurnal de modificări — VATRA

Format: [SemVer](https://semver.org/lang/ro/) MAJOR.MINOR.PATCH.

## 2.3.4 — 2026-11-20

- Banda „Ordinea priorităților” de pe prima pagină (patru segmente de câte 25%) tăia etichetele la 320 px în toate cele 8 limbi (de exemplu «TEMPERATURĂ», «TEMPÉRATURE», «NOURRITURE»); segmentele se așază acum după lungimea etichetei și trec pe al doilea rând când nu încap (constatat cu bateria adversarială, 20 noiembrie 2026)

## 2.3.3 — 2026-11-20

- Metadate: numele aplicației din `app.json` și din `fff-info` era un fragment de cod (un `<title>` dintr-un șablon al scriptului, luat în locul titlului paginii); acum este titlul real (constatat la scanarea tuturor fișierelor app.json din depozite, 19 noiembrie 2026; kit fff 1.8.1 corectează citirea titlului)
- fff-kit 1.8.1: când `localStorage`/`sessionStorage` aruncă sau lipsesc (cookie-uri și date de site blocate, WebView fără stocare, `<iframe sandbox>`), kitul pune în loc o stocare în memorie, iar pagina pornește în loc să se oprească; datele nu se păstrează după închiderea paginii
- fff-kit 1.8.1: ghidajul care mărește controalele mici la 44 px măsoară acum și lățimea corpului paginii și a părintelui, deci un rând de butoane nu mai poate ieși din ecran (grupul rămâne neatins când mărirea l-ar depăși)

## 2.3.2 — 2026-11-17

- Compatibilitate cu browsere mai vechi (Chrome/Edge 55+, Firefox 52+, Safari 10.1+/iOS 10.3+): kitul 1.8.0 aduce stratul de compatibilitate (rezerve pentru API-urile care lipsesc în motoarele vechi), iar sintaxa JavaScript mai nouă decât ES2017 a fost înlocuită cu forme echivalente acolo unde exista; expresiile regulate noi și `import()` trec prin rezerve. Fără modificări de funcționalitate intenționate. Verificat cu parser ES2017 și într-un motor vechi simulat, nu pe dispozitive reale.

## 2.3.1 — 2026-11-15

- Nou: butoane de distribuire pe rețele sociale (vertical, pe marginea din stânga; fără scripturi externe, doar linkuri deschise la clic); bara de zoom cu lupă și „potrivire ecran” revine pe marginea din dreapta, centrată pe verticală; corectat afișarea suprapusă la zoom mare (panourile cu înălțimi în vh/vw nu mai ies din ecran).

## 2.3.0 — 2026-11-15

- Nou: accesibilitate pe toate ecranele — butonul „Aa” (mărimea textului, contrast ridicat, fără animații, text lizibil, linkuri subliniate, citire cu voce), săgeata „Înapoi sus” și „Sari la conținut”; fereastra se potrivește mereu ecranului; zoom-ul cu lupă și „potrivire ecran” stau acum pe marginea din stânga (fff-kit 1.6.0).

## 2.2.8 — 2026-11-15

- Nou: texturi fractale hiper-detaliate (fff-texturi 1.1.2) — fundalul și suprafețele mari (carduri, panouri, antete, butoane; filele și dialogurile ascunse la încărcare, când se deschid) primesc un material generat local (WebGL2, fără rețea și fără imagini), care se repetă fără cusătură; culorile aplicației rămân ale ei. Se oprește din dialogul „Transparență” sau cu `?notex=1`.

## 2.2.1 — 2026-11-03

Etapa 4: jurnal de teren geolocalizat comun (plicul geo/journal, export GeoJSON/GPX), cu atlas în Arhiva fără frontiere

## 2.2.0 — 2026-11-02 (reîmprospătare kit)

- Nou (kit): **Sincronizare între dispozitive** (`FFF.sync`) — în dialogul «Transparență» (clic pe versiune → Copie de siguranță): conectezi două dispozitive direct (WebRTC, cod/QR, fără server și fără cont) și își schimbă datele aplicației; cea mai recentă valoare câștigă, secretele (chei API, parole) nu se trimit, ștergerile nu se propagă. Aplicarea trece prin importul kitului (confirmare, chei permise, rollback).
- Nou (kit): **Istoric local — «mașina timpului»** (`FFF.history`) — instantanee automate ale datelor (IndexedDB, fără secrete), diferență față de starea curentă și restaurare reversibilă; «Șterge datele aplicației» șterge și istoricul.
- Module adăugate: `qr`, `p2p`, `sync`, `history` (+~140 KB). Versiunea aplicației nu se schimbă.

## 2.2.0 — 2026-10-27 (anterior: 2.1.0)

Fișa de buzunar cu datele tale:
- Dacă ai completat nota de urgență și/sau ai generat planul, fișa adaugă la tipărire blocul „Datele mele (completate de tine în VATRA; nu fac parte din ghid)"; blocul se golește după tipărire, textul e scăpat, fără date completate fișa e neschimbată. Cheie nouă `pocket.mine` în 8 limbi (fr/it/es/pt/de/hu: traducere automată).
- Test nou `tests/pocket-v22.test.mjs` (17 verificări, inclusiv încadrarea pe A4 cu emulare `print`). Manifest PWA inline: tot nefăcut (CSP), documentat în README.

---

## 2.1.0 — 2026-10-27 (anterior: v2.0.0)

Stare: stabil · Offline: complet

Aplicat după mini-recenzia din 2026-10-27.

### Adăugat / modificat
- **Fișă de buzunar tipăribilă** (bara laterală → „Tipărește fișa de buzunar”): o pagină A4 cu Regula lui 3, ordinea deciziilor, semnalele și scriptul apelului la 112, din textele ghidului (sincronizate, 8 limbi); CSS `@media print`, restul ghidului nu se tipărește; tipărirea obișnuită rămâne neschimbată.
- **Instalare ca aplicație (PWA):** butonul „Instalează ca aplicație” apare doar când browserul oferă `beforeinstallprompt`; altfel indicație text pentru instalare manuală (inclusiv iPhone); ascuns în modul standalone. Manifestul și service worker-ul reale existau deja.
- README (8 limbi): secțiune nouă, „Stare: stabil · Offline: complet”; `CHANGELOG.md`; versiune 2.1.0; test nou `tests/pocket-v21.test.mjs` (26 de verificări).

### Neimplementat
- Manifest PWA „inline” (blob): nu era necesar (există `manifest.webmanifest` real + `sw.js`) și ar cere relaxarea `manifest-src` din CSP.
- Instalarea nu poate fi testată automat până la capăt (promptul îl controlează browserul); testat cu eveniment `beforeinstallprompt` simulat.
- Fișa de buzunar nu include harta, planul personalizat sau trusa; doar sinteza din ghid. Aspectul pe hârtie a fost verificat cu emulare de media `print`, nu cu o imprimantă reală.

## 2.0.0
- Versiunea anterioară (vezi istoricul din README).

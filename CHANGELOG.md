# Jurnal de modificări — VATRA

Format: [SemVer](https://semver.org/lang/ro/) MAJOR.MINOR.PATCH.

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

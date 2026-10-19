# VATRA — A túlélés enciklopédiája

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

**Verzió:** 1.2.0 · **Utolsó frissítés:** 2026-10-19

**Online alkalmazás / demó:** https://chiuta.github.io/VATRA/

![VATRA — képernyőkép](screenshot.png)

Túlélési útmutató egyetlen HTML-fájlban (`index.html`), románul: ~21 szakasz (víz, tűz, menedék, élelem, csomók, elsősegély, jelzés, navigáció GPS nélkül, időjárás, élőhelyek, katasztrófák, veszélyes állatok, erőforrások Romániához), interaktív vészhelyzeti készlet, számológépek (víz, kalória, hipotermia/hipertermia, azimut), iránytű, szójegyzék és tudáspróba.

**Általános oktatási tartalom; nem helyettesíti a tanúsított elsősegély- vagy túlélőtanfolyamot, a helyi mentőcsapatot, sem a szakorvosi értékelést.** Vészhelyzetben Romániában hívd a 112-t. Az útmutató információi (beleértve a számadatokat, elérhetőségeket, az állatvilágra vagy a jogszabályokra vonatkozó adatokat) elavulhatnak; ellenőrizd a hivatalos forrásokat. A számológépek tájékoztató jellegűek.

## Használat
Keress az egész útmutatóban az oldalsáv mezőjében (gyorsbillentyű: `/`).
Nyisd meg az `index.html` fájlt egy böngészőben (vagy a GitHub Pages-en közzétett változatot); offline is működik. „Éjszaka”/„Nappal” téma az oldalsávban (a választás megmarad). A készlet pipái, a saját jegyzeteid, a teszt előrehaladása és a téma automatikusan, helyben mentődnek a böngészőben (`localStorage`, `vatra:v1` kulcs); az oldalsávból törölheted őket („A böngészőben mentett adatok törlése”), vagy exportálhatod/importálhatod fájlként.

## Új funkciók (v1.1.0, 2026. október 14.)

Ebben a verzióban nincs új tanulási funkció: **az elosztott ismétlés már létezik** (19. § Tudáspróba, „Mód: Elosztott ismétlés”, az előrehaladás exportjával/importjával), és nem duplikáltuk. Az egyetlen kiegészítés az alábbi készlet.

### Átláthatóság és biztonsági mentés (fff-kit)

A megjelenített verzióra (`v 1.1.0 · 2026-10-14`) kattintva (vagy Entert nyomva) megnyílik az „Átláthatóság” ablak: a deklarált hálózati hosztok (0 külső kérés), a helyi tárolókulcsok méretekkel, a használt API-k, a fájl mérete és SHA-256 ujjlenyomata (ellenőrzővel egy letöltött fájlhoz), valamint az alkalmazás adatainak **biztonsági mentése** `.fff.json` fájlba (opcionálisan jelszóval titkosítva, AES-GCM 256 / PBKDF2; a jelszó nem állítható vissza), importálás megerősítéssel és az alkalmazás adatainak törlése. A készlet (`fff-kit`, modulok: core, label, bundle) be van illesztve az `index.html`-be, nem küld hálózati kéréseket, és nem módosítja a meglévő adatokat; nélküle az alkalmazás ugyanúgy működik. A készlet biztonsági mentése tartalmazza az alkalmazás opcionális tárolókulcsát (ha bekapcsoltad az eszközön való megőrzést), a teszt előrehaladását nem, amelyet az „Előrehaladás exportálása” gombbal lehet exportálni. A készlet szövegei 8 nyelven érhetők el (ro, en, fr, it, es, pt, hu, de); **az fr/it/es/pt/hu/de fordítások automatikusak, anyanyelvi beszélők nem ellenőrizték őket**. Maga az alkalmazás felülete továbbra is román nyelvű.

## Adatok és adatvédelem
Auditálással ellenőrizve: az oldal nem küld hálózati kéréseket (betöltéskor 0 kérés, nincs `fetch`/CDN/külső betűtípus), és sehová nem küld semmit; az egyetlen tárolás a helyi `localStorage` (`vatra:v1` kulcs, a készlet pipáival, a jegyzetekkel, a teszt előrehaladásával és a témával), éppoly privát, mint maga a fájl. A helymeghatározást (az azimut-számológép gombja) csak kérésre, helyben használja. A külső hivatkozások (Salvamont, RO-ALERT, Vöröskereszt stb.) csak kattintásra nyílnak meg. Szigorú CSP-szabályzata van (meta): nincs hálózati kapcsolat (`connect-src 'none'`), szkript csak SHA-256 hash alapján engedélyezett (szkriptekhez nincs `unsafe-inline`), beágyazott stílusok.

## Korlátok
- A források csak részben vannak idézve (részletes irodalmi hivatkozások nélkül); a medvepopuláció becslésének már van forrása (AGERPRES, 2025. április 10.); a medvékkel kapcsolatos beavatkozásra vonatkozó jogszabályok gyakran változnak (a 60/2025. sz. sürgősségi kormányrendelet és az azt követő törvény), és cikkelyenként nincsenek idézve: ellenőrizd a legislatie.just.ro oldalon.
- Az ehetőségi teszt és az elsősegély-eljárások általános összefoglalók, nem orvosi protokollok.

## Licenc

MIT — lásd a `LICENSE` fájlt. © 2026 Alexandru-Ionuț Chiuță (Alexio). A fájlba esetlegesen beépített külső könyvtárak megtartják saját licencüket.

A „Hiba jelentése” hivatkozás (GitHub) mostantól a `chiuta/vatra` tárolóra mutat. Az orvosi/túlélési útmutatások (beleértve az egyetemes ehetőségi tesztet, amely „csak növények, végső megoldás” jelöléssel szerepel) a szerző tartalmai maradnak, az oldalon és fent szereplő figyelmeztetéssel.

Audit: 2026-10-10

## Előzmények / Changelog

### 1.2.0 — 2026-10-19
- Új: az „Azimut és távolság” számológépben a „↗ Az égbolt most, a Boltában” hivatkozás (a mezőkben megadott pozíció, ~1 km-re kerekítve; új lapon nyílik meg; figyelmeztetés az előzményekre).

### 1.1.0 — 2026-10-14
- fff-kit: az „Átláthatóság” ablak (kattintás a verzióra) és az egységes `.fff.json` biztonsági mentés. A tartalom és az elosztott ismétlés nem változott.

### 1.0.4 — 2026-10-12
- A verzió és az utolsó frissítés dátuma megjelenik az alkalmazásban (oldalsáv).

### 1.0.3 — 2026. október 11. (7. kör)
- Új: keresés az egész útmutatóban (mező az oldalsávban, gyorsbillentyű: `/`; ékezetfüggetlen, találatok részlettel és ugrással a megtalált szakaszra).
- Javítva: a Kezdőlapon kívüli szakaszokon az oldalnak nem volt 1. szintű címsora (axe-core `page-has-heading-one`); mostantól az oldalsáv „VATRA” fejléce 1. szintű címsorrá válik a Kezdőlapon kívül.

### 1.0.2 — 2026. október 11. (6. kör)
- Hozzáadva: a készlet, a jegyzetek, a teszt előrehaladásának és a témának automatikus helyi mentése (törlőgombbal); CSP `script-src` hash alapján.

### 1.0.1 — 2026. október 11.
- Javítva: a hero cím már nem mutat véletlen karaktereket az animáció alatt (felfedő effekt; a végleges szöveg mindig az oldalon van).
- Javítva: akadálymentesség: a mobil fejléc `<header>`, a lábléc címsorai h3 (helyes sorrend); 0 axe-core-szabálysértés 1280 és 360 px szélességen.
- Hozzáadva: szigorú CSP-szabályzat; az 1.0.1-es verzió megjelenik az oldalsávban.
- Frissítve: a medvékre vonatkozó adatok 2026.10.11-én ellenőrizve (forrás: AGERPRES, 2025.04.10.); a jogszabályokról szóló megfogalmazás már nem állít ellenőrizetlen 2026. májusi módosítást. Források 2026.10.11-én ellenőrizve.


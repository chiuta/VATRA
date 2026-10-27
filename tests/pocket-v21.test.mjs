// VATRA 2.1 — fișa de buzunar tipăribilă (CSS @media print) + butonul de instalare (beforeinstallprompt).
// Rulare: node tests/pocket-v21.test.mjs
import {launch, check, summary} from "./_lib.mjs";

const {browser, page, st} = await launch({w: 1280, h: 900, init: () => { window.__prints = 0; window.print = () => { window.__prints++; }; }});
await page.waitForTimeout(600);

console.log("1. fișa de buzunar");
check("fișa există dar nu se vede pe ecran", await page.$eval("#pocketSheet", (e) => getComputedStyle(e).display === "none"));
check("conține Regula lui 3 (4 rânduri) și numărul 112", await page.$eval("#pocketSheet", (e) => e.querySelectorAll("tbody tr").length >= 6 && /112/.test(e.textContent)));
await page.click("#pocketBtn");
check("butonul cheamă print și marchează body", (await page.evaluate(() => window.__prints)) === 1 && await page.evaluate(() => document.body.classList.contains("print-pocket")));
await page.emulateMedia({media: "print"});
check("în print: fișa e vizibilă, restul ghidului ascuns", await page.evaluate(() => getComputedStyle(document.getElementById("pocketSheet")).display === "block" && getComputedStyle(document.querySelector(".shell")).display === "none" && getComputedStyle(document.querySelector(".topbar")).display === "none"));
check("fișa încape pe o pagină A4 (înălțime < 270mm)", await page.$eval("#pocketSheet", (e) => e.getBoundingClientRect().height / 3.7795 < 270));
await page.emulateMedia({media: "screen"});
await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
check("după tipărire body revine", await page.evaluate(() => !document.body.classList.contains("print-pocket")));
await page.click("#printBtn");
check("tipărirea obișnuită nu activează fișa", await page.evaluate(() => !document.body.classList.contains("print-pocket") && window.__prints === 2));

console.log("2. 8 limbi");
for (const lg of ["ro", "en", "fr", "it", "es", "pt", "de", "hu"]) {
  await page.selectOption("#langSel", lg); await page.waitForTimeout(120);
  const r = await page.evaluate(() => ({t: document.querySelector('#pocketSheet [data-i18n="pocket.title"]').textContent, b: document.getElementById("pocketBtn").textContent, h: document.getElementById("installHint").textContent, rows: document.querySelectorAll("#pocketSheet td").length}));
  check(`${lg}: titlu, buton și indicație traduse`, r.t.length > 8 && r.b.length > 8 && r.h.length > 40 && r.rows > 10, JSON.stringify(r).slice(0, 120));
  if (lg !== "ro") check(`${lg}: titlul diferă de cel românesc`, !/fișă de buzunar/.test(r.t));
}
await page.selectOption("#langSel", "ro");

console.log("3. instalare");
check("fără eveniment: butonul e ascuns, indicația text e vizibilă", await page.evaluate(() => document.getElementById("installBtn").hidden && !document.getElementById("installHint").hidden));
await page.evaluate(() => { const e = new Event("beforeinstallprompt"); e.prompt = () => { window.__ip = 1; return Promise.resolve(); }; window.dispatchEvent(e); });
check("după beforeinstallprompt butonul apare", await page.evaluate(() => !document.getElementById("installBtn").hidden));
await page.click("#installBtn");
check("clic cheamă prompt() și ascunde butonul", await page.evaluate(() => window.__ip === 1 && document.getElementById("installBtn").hidden));

check("fără erori JS, fără încălcări CSP, fără rețea", st.errs.length === 0 && (await page.evaluate(() => window.__csp.length)) === 0 && st.net.length === 0, JSON.stringify([st.errs, st.net]));
await browser.close(); summary();

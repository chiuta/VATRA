// VATRA 2.2 — fișa de buzunar include (opțional) datele completate de utilizator: nota de urgență și sinteza planului.
// Rulare: node tests/pocket-v22.test.mjs
import {launch, check, summary} from "./_lib.mjs";

const {browser, page, st} = await launch({w: 1280, h: 900, init: () => { window.__prints = 0; window.print = () => { window.__prints++; }; }});
await page.waitForTimeout(600);
const mine = () => page.evaluate(() => { const b = document.getElementById("pkMine"); return {hidden: b.hidden, html: b.innerHTML, text: b.textContent, h3: (b.querySelector("h3") || {}).textContent || ""}; });

console.log("1. fără date completate");
await page.click("#pocketBtn");
let m = await mine();
check("blocul „Datele mele” rămâne ascuns și gol", m.hidden && m.html === "", m);
await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));

console.log("2. cu nota de urgență și planul");
await page.evaluate(() => {
  const set = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event("input", {bubbles: true})); };
  set("notaName", "Ana <b>Pop</b>"); set("notaC1", "Ion, 0700 000 000"); set("notaMed", "Alergie la penicilină"); set("notaTrip", "Valea X, întoarcere 18:00");
  document.getElementById("planGenBtn").click();
});
await page.click("#pocketBtn");
m = await mine();
check("blocul apare, cu titlu", !m.hidden && /Datele mele/.test(m.h3), m.h3);
check("conține câmpurile completate (nume, contact 1, medical, traseu), nu și cele goale", /Ana/.test(m.text) && /0700 000 000/.test(m.text) && /penicilină/.test(m.text) && /Valea X/.test(m.text) && !/Vehicul/.test(m.text), m.text);
check("textul utilizatorului e scăpat (fără <b> real în fișă)", !/<b>/.test(m.html) && /&lt;b&gt;Pop&lt;\/b&gt;/.test(m.html), m.html.slice(0, 200));
check("sinteza planului (mediu, anotimp, echipament) e inclusă", /\d+\s*(\/|din|of)\s*\d+|echipament|gear/i.test(m.text) || m.html.includes("pk-line"), m.text.slice(0, 200));
await page.emulateMedia({media: "print"});
check("în print: fișa cu datele tale încape pe o pagină A4 (< 270 mm)", await page.$eval("#pocketSheet", (e) => e.getBoundingClientRect().height / 3.7795 < 270));
check("în print: blocul „Datele mele” este vizibil", await page.$eval("#pkMine", (e) => getComputedStyle(e).display !== "none"));
await page.emulateMedia({media: "screen"});
await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
m = await mine();
check("după tipărire blocul se golește (nu rămân date în fișă)", m.hidden && m.html === "", m);
check("datele rămân în aplicație (nota nu s-a șters)", await page.evaluate(() => document.getElementById("notaName").value.includes("Ana")));

console.log("3. limbi");
await page.click("#pocketBtn");
for (const lg of ["en", "fr", "it", "es", "pt", "de", "hu"]) {
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await page.selectOption("#langSel", lg); await page.waitForTimeout(120);
  await page.click("#pocketBtn"); const t = (await mine()).h3;
  check(`${lg}: titlul blocului e tradus`, t.length > 10 && !/Datele mele/.test(t), t);
}
check("fără erori JS, fără încălcări CSP, fără rețea", st.errs.length === 0 && (await page.evaluate(() => window.__csp.length)) === 0 && st.net.length === 0, JSON.stringify([st.errs, st.net]).slice(0, 200));
await browser.close(); summary();

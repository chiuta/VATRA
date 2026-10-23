// VATRA — regresii din auditul adversarial (octombrie 2026): indicele de căldură NWS, plafonul notițelor, ținte tactile.
// Rulare: node tests/audit-2026-10.test.mjs
import {chromium, launch, check, summary, INDEX} from "./_lib.mjs";

// Referință independentă: algoritmul NWS (formula simplă, Rothfusz la media ≥ 80°F, două corecții) în °C.
function nws(tc, rh) {
  const T = tc * 9 / 5 + 32, R = rh;
  let HI = 0.5 * (T + 61 + (T - 68) * 1.2 + R * 0.094);
  if ((HI + T) / 2 >= 80) {
    HI = -42.379 + 2.04901523 * T + 10.14333127 * R - 0.22475541 * T * R - 0.00683783 * T * T - 0.05481717 * R * R + 0.00122874 * T * T * R + 0.00085282 * T * R * R - 0.00000199 * T * T * R * R;
    if (R < 13 && T >= 80 && T <= 112) HI -= ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
    else if (R > 85 && T >= 80 && T <= 87) HI += ((R - 85) / 10) * ((87 - T) / 5);
  }
  return Math.round(((HI - 32) * 5 / 9) * 10) / 10;
}

const {browser, page, st} = await launch({w: 1280, h: 800});
await page.waitForTimeout(500);
console.log("1. indicele de căldură (NWS)");
const heat = async (t, h) => page.evaluate(([t, h]) => {
  document.getElementById("heatTemp").value = t; document.getElementById("heatHumidity").value = h;
  document.getElementById("heatCalcBtn").click(); return document.getElementById("heatOut").textContent;
}, [t, h]);
for (const [t, h] of [[32.2, 65], [35, 10], [28, 90], [26, 95], [20, 50], [41, 5]]) {
  const out = await heat(t, h), ref = nws(t, h);
  check(`T=${t}°C, RH=${h}% → ${ref}°C`, out.includes(String(ref)), {out, ref});
}

console.log("2. notițe: plafon la restaurarea din localStorage");
const big = Array.from({length: 3000}, (_, i) => ({term: "t" + i, def: "d" + i}));
const p2 = await launch({init: `try { localStorage.setItem("vatra:v1", ${JSON.stringify(JSON.stringify({notite: big}))}); } catch (e) {}`});
await p2.page.waitForTimeout(500);
const n = await p2.page.evaluate(() => document.querySelectorAll("#noteList .glossitem").length);
check("cel mult 500 de notițe afișate din 3000 stocate", n === 500, n);
check("fără erori la restaurare", p2.st.errs.length === 0, p2.st.errs);
await p2.browser.close();

console.log("3. ținte tactile (pointer: coarse)");
const b3 = await chromium.launch({executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"]});
const c3 = await b3.newContext({viewport: {width: 390, height: 800}, hasTouch: true, isMobile: true});
const p3 = await c3.newPage(); await p3.goto("file://" + INDEX); await p3.waitForTimeout(800);
const sizes = await p3.evaluate(() => [...document.querySelectorAll(".navlink, #drawerBtn, #themeBtnMobile, #langSel")].map(e => { const r = e.getBoundingClientRect(); return [e.id || e.className, r.width, r.height]; }));
check("navlink / meniu / temă / limbă ≥ 44 px înălțime", sizes.length > 0 && sizes.every(([, w, h]) => h >= 43.5), sizes.filter(([, , h]) => h < 43.5).slice(0, 5));
await b3.close();

check("0 erori / 0 rețea pe pagina principală", st.errs.length === 0 && st.net.length === 0, [st.errs, st.net]);
await browser.close();
summary();

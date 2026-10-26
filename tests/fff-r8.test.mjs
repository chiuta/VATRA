// VATRA — teste runda 8: fără funcții noi de învățare (repetiția spațiată există deja în aplicație), deci verificăm:
// (a) repetiția spațiată existentă funcționează la fel, (b) kitul adaugă Transparență + copie de siguranță fără regresii.
// [fff-portable] versiunea/data/kitul aplicației se citesc din app.json (nu mai sunt hard-codate în teste)
import {readFileSync as __fffRF} from 'node:fs';
const __FFF_APP = JSON.parse(__fffRF(new URL('../app.json', import.meta.url), 'utf8'));
const __fffRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
import fs from "fs";
import {launch, axeRun, hOverflow, check, summary, kitSmoke, kitLabel} from "./_lib.mjs";

const goQuiz = async page => { await page.evaluate(() => document.querySelector('.navlink[data-sec="quiz"]').click()); await page.waitForTimeout(400); };

console.log("1. pornire și versiune");
{
  const {browser, page, st} = await launch();
  await page.waitForTimeout(3500);
  check("0 erori", st.errs.length === 0, st.errs);
  check("0 cereri de rețea", st.net.length === 0, st.net);
  check("0 violări CSP", (await page.evaluate(() => window.__csp)).length === 0);
  check(`meta application-version ${__FFF_APP.version}`, (await page.getAttribute('meta[name="application-version"]', "content")) === __FFF_APP.version);
  check("#app-version", new RegExp(String.raw`${__fffRe(__FFF_APP.version)} · ${__fffRe(__FFF_APP.updated)}`).test(await page.textContent("#app-version")));
  check("fără depășire orizontală 1280", (await hOverflow(page)) <= 0);
  await browser.close();
}

console.log("2. repetiția spațiată existentă (neschimbată)");
{
  const {browser, page, st} = await launch();
  await page.waitForTimeout(800);
  await goQuiz(page);
  check("butonul de mod repetiție spațiată există", await page.isVisible("#srsToggleBtn"));
  await page.click("#srsToggleBtn");
  check("modul se schimbă în „Repetiție spațiată”", /Repeti[țt]ie spa[țt]iat/.test(await page.textContent("#srsToggleBtn")));
  for (let i = 0; i < 3; i++) {
    await page.locator("#quizArea .quiz-opt").first().click();
    await page.locator("#quizArea button, #quizCard button, #quizNextBtn").filter({hasText: /Următoarea|Vezi scorul|Continu/}).first().click({timeout: 2500}).catch(() => {});
  }
  const dl = page.waitForEvent("download");
  await page.click("#srsExportBtn");
  const raw = fs.readFileSync(await (await dl).path(), "utf8");
  const j = JSON.parse(raw);
  const n = Object.keys(j.vatra_srs || {}).length;
  check("exportul progresului are ≥ 1 cartonaș după răspunsuri", n >= 1, Object.keys(j));
  check("fără erori", st.errs.length === 0, st.errs);
  await browser.close();
}

console.log("3. kit: Transparență + copie de siguranță");
{
  const {browser, page, st} = await launch();
  await page.waitForTimeout(800);
  await kitLabel(page, "vatra");
  await kitSmoke(page, "vatra", ["vatra-test", "valoare ăîșț"]);
  check("fără erori", st.errs.length === 0, st.errs);
  await browser.close();
}

console.log("4. accesibilitate și mobil");
{
  const {browser, page} = await launch({bypassCSP: true, w: 360, h: 740});
  await page.waitForTimeout(3600);
  check("fără depășire orizontală la 360", (await hOverflow(page)) <= 1);
  let v = await axeRun(page); if (v) check("axe 0 violări (pagina)", v.length === 0, v);
  await page.evaluate(() => document.getElementById("app-version").click());   // pe mobil eticheta e în meniul lateral
  await page.waitForTimeout(300);
  v = await axeRun(page); if (v) check("axe 0 violări (dialog Transparență)", v.length === 0, v);
  check("dialogul nu produce depășire orizontală la 360", (await hOverflow(page)) <= 1);
  await browser.close();
}
summary();

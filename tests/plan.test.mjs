// VATRA 2.0 — Plan personalizat (§21) + notă de urgență tipăribilă + test rapid.
// Rulare: node tests/plan.test.mjs
import {launch, check, summary, axeRun, hOverflow} from "./_lib.mjs";
import fs from "node:fs";

const {browser, page, st} = await launch({w: 1280, h: 900});
await page.waitForTimeout(600);
const go = async () => { await page.click('.navlink[data-sec="plan"]'); await page.waitForTimeout(150); };
const sel = (id, v) => page.selectOption("#" + id, v);
const steps = () => page.$$eval("#planOut .plan-step h4", (a) => a.map((h) => h.textContent.replace(/\s+/g, " ").trim()));
const stepKeys = () => page.$$eval("#planOut .plan-step", (a) => a.map((l) => l.querySelector("h4").textContent));

console.log("1. secțiunea și avertismentul");
await go();
check("secțiunea §21 este activă și are avertismentul educativ vizibil", await page.$eval("#sec-plan", (e) => e.classList.contains("active")) && /112/.test(await page.$eval("#planDisc", (e) => e.textContent)) && /educativ/i.test(await page.$eval("#planDisc", (e) => e.textContent)));
check("21 de elemente de echipament, cu nume din trusa existentă", (await page.$$("#planGear input")).length === 21 && /Recipient rezistent la fierbere/.test(await page.$eval("#planGear", (e) => e.textContent)));
check("înainte de generare nu există plan", (await page.$$("#planOut .plan-step")).length === 0);

console.log("2. ordinea priorităților");
await sel("planEnv", "padure"); await sel("planSeason", "vara");
await page.click("#planGenBtn");
let k = (await steps()).map((s) => s.replace(/^\d+\.\s*/, "").replace(/\s*§\d+$/, ""));
check("pădure, vară: pericol → hemoragie → temperatură → apă → foc → semnalizare → orientare → hrană", JSON.stringify(k) === JSON.stringify(["Pericol imediat", "Hemoragie", "Temperatura corpului și adăpost", "Apă", "Foc", "Semnalizare și ajutor", "Orientare: oprește-te și gândește", "Hrană"]), k);
check("pericolul imediat și hemoragia sunt marcate ACUM", (await page.$$eval("#planOut .plan-tag", (a) => a.slice(0, 2).map((e) => e.textContent))).join() === "ACUM,ACUM");
await sel("planEnv", "desert");
k = (await steps()).map((s) => s.replace(/^\d+\.\s*/, "").replace(/\s*§\d+$/, ""));
check("deșert: apa trece înaintea temperaturii/adăpostului", k[2] === "Apă" && k[3] === "Temperatura corpului și adăpost", k);
check("deșert: apare nota despre apă + umbră", /umbra rămâne critică/.test(await page.$eval("#planOut", (e) => e.textContent)));
await sel("planEnv", "padure"); await sel("planSeason", "iarna");
k = (await steps()).map((s) => s.replace(/^\d+\.\s*/, "").replace(/\s*§\d+$/, ""));
check("iarnă: focul urmează imediat după temperatură", k[2] === "Temperatura corpului și adăpost" && k[3] === "Foc", k);
await sel("planEnv", "munte"); await sel("planSeason", "vara");
k = (await steps()).map((s) => s.replace(/^\d+\.\s*/, "").replace(/\s*§\d+$/, ""));
check("munte: focul urmează imediat după temperatură", k[3] === "Foc", k);

console.log("3. echipament: ai / îți lipsește");
await sel("planEnv", "padure"); await sel("planSeason", "toamna");
const miss0 = await page.$eval("#planOut", (e) => e.textContent);
check("fără echipament bifat: apar liste „Nu ai bifat” și trimiterea la metode", /Nu ai bifat:/.test(miss0) && /improvizează/.test(miss0) && !/Ai bifat:/.test(miss0));
await page.check('#planGear input[data-gear="5"]'); await page.check('#planGear input[data-gear="4"]');
const fireStep = await page.$$eval("#planOut .plan-step", (a) => a.find((l) => /Foc/.test(l.querySelector("h4").textContent)).textContent);
check("focul: Ai bifat amnarul și chibriturile, nu mai lipsește nimic din categorie", /Ai bifat: .*Chibrituri.*Amnar|Ai bifat: .*Amnar.*Chibrituri/.test(fireStep) && !/Nu ai bifat/.test(fireStep), fireStep.slice(0, 300));
check("focul: reamintește restricțiile din fondul forestier (§16)", /fond forestier/.test(fireStep));
await page.check('#planGear input[data-gear="21"]');
const navStep = await page.$$eval("#planOut .plan-step", (a) => a.find((l) => /Orientare/.test(l.querySelector("h4").textContent)).textContent);
check("orientare: harta bifată apare în listă și trimite la §11", /Hartă fizică/.test(navStep) && /§11/.test(navStep));
const sumTxt = await page.$eval("#planOut .plan-x", (e) => e.textContent);
check("sumar: mediu, anotimp, 3 din 21", /Pădure temperată · Toamnă · 3 din 21/.test(sumTxt), sumTxt);
await page.check("#planGroup");
check("grup vulnerabil: avertisment dedicat", /Copiii, vârstnicii/.test(await page.$eval("#planOut .note.warn", (e) => e.textContent)));

console.log("4. preluare din trusă");
await page.click('.navlink[data-sec="trusa"]');
for (let i = 0; i < 3; i++) await page.evaluate((n) => { const c = document.querySelectorAll('#checklistArea input[type=checkbox]')[n]; if (!c.checked) c.click(); }, i); // lista se redesenează la fiecare bifă
await go();
await page.click("#planFromKit");
const nChecked = await page.$$eval("#planGear input:checked", (a) => a.length);
check("din trusă (primele 3 bife = apă, tablete, filtru) înlocuiesc selecția", nChecked === 3 && await page.$eval('#planGear input[data-gear="0"]', (e) => e.checked) && !(await page.$eval('#planGear input[data-gear="4"]', (e) => e.checked)), nChecked);

console.log("5. notă de urgență");
await page.fill("#notaName", "Ion Test");
await page.fill("#notaC1", "Maria, 0700 000 000");
await page.fill("#notaMed", "Alergie la <b>penicilină</b>");
await page.fill("#notaTrip", "Traseu A\nîntoarcere 18:00");
let sheet = await page.$eval("#notaSheet", (e) => e.innerHTML);
check("previzualizarea afișează câmpurile completate și 112", /Ion Test/.test(sheet) && /Maria, 0700/.test(sheet) && /112/.test(sheet));
check("textul introdus este scăpat (fără HTML injectat)", !/<b>penicilină/.test(sheet) && /&lt;b&gt;/.test(sheet));
check("câmpurile necompletate nu apar", !/Vehicul/.test(sheet));
await page.waitForTimeout(700);
const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("vatra:v1")));
check("planul și nota se salvează în vatra:v1 (cheie existentă)", saved.nota && saved.nota.name === "Ion Test" && saved.plan && saved.plan.env === "padure" && Array.isArray(saved.plan.gear), saved.plan);
await page.goto(page.url()); await page.waitForTimeout(700); await go();
check("după reîncărcare nota și selecția revin", (await page.inputValue("#notaName")) === "Ion Test" && (await page.$$eval("#planGear input:checked", (a) => a.length)) === 3 && (await page.inputValue("#planEnv")) === "padure");
await page.click("#notaClear");
check("ștergerea notei golește câmpurile și previzualizarea", (await page.inputValue("#notaName")) === "" && /Completează/.test(await page.$eval("#notaSheet", (e) => e.textContent)) && /ștearsă/.test(await page.$eval("#notaStatus", (e) => e.textContent)));
await page.fill("#notaName", "Ana");

console.log("6. copie de rezervă completă");
const dl = page.waitForEvent("download");
await page.evaluate(() => document.getElementById("backupExportBtn").click());
const bpath = await (await dl).path();
const B = JSON.parse(fs.readFileSync(bpath, "utf8"));
check("exportul complet include plan și nota", B.vatra_backup === true && B.nota && B.nota.name === "Ana" && B.plan && B.plan.env === "padure", Object.keys(B));
await page.fill("#notaName", "Altul");
await page.setInputFiles("#backupImportFile", bpath);
await page.waitForTimeout(400);
check("importul restabilește nota", (await page.inputValue("#notaName")) === "Ana");
{ // date locale ostile, injectate înaintea aplicației într-o pagină nouă (altfel pagehide-ul paginii vechi le-ar suprascrie)
  await page.context().addInitScript(() => { try { localStorage.setItem("vatra:v1", JSON.stringify({plan: {env: "x", season: 7, gear: [999, "a", 0], group: "da"}, nota: {name: 5, med: "m".repeat(5000)}})); } catch (e) {} });
  const p3 = await page.context().newPage();
  await p3.goto(page.url()); await p3.waitForTimeout(700);
  await p3.click('.navlink[data-sec="plan"]');
  check("date locale invalide: valori implicite sigure", (await p3.inputValue("#planEnv")) === "padure" && (await p3.$$eval("#planGear input:checked", (a) => a.length)) === 1 && (await p3.inputValue("#notaName")) === "" && (await p3.inputValue("#notaMed")).length === 400);
  await p3.close();
}

console.log("7. test rapid");
await page.click("#planQuick");
await page.waitForTimeout(200);
check("test rapid: secțiunea de test se deschide cu o întrebare", await page.$eval("#sec-quiz", (e) => e.classList.contains("active")) && (await page.$$("#quizArea .quiz-opt")).length >= 2);
let answered = 0;
for (let i = 0; i < 5; i++) {
  const opt = await page.$("#quizArea .quiz-opt");
  if (!opt) break;
  await opt.click(); answered++;
  const nxt = await page.$("#quizArea .quiz-next, #quizNextBtn, #quizArea button.btn");
  if (nxt) await nxt.click().catch(() => {});
  await page.waitForTimeout(80);
}
const doneTxt = await page.$eval("#quizArea", (e) => e.textContent);
check("runda de test rapid se încheie după 5 întrebări", answered === 5 && /\b5\b/.test(doneTxt), doneTxt.slice(0, 200));

console.log("8. limbi și tipărire");
await go();
for (const l of ["en", "fr", "it", "es", "pt", "de", "hu", "ro"]) {
  await page.selectOption("#langSel", l);
  await page.click("#planGenBtn");
  const raw = await page.$eval("#sec-plan", (e) => (e.innerText + " " + e.innerHTML.replace(/<[^>]+>/g, " ")).match(/\b(?:plan|nota)\.[a-z0-9_.]+/g));
  check("limba " + l + ": fără chei netraduse în §21", !raw, raw);
}
await page.emulateMedia({media: "print"});
const pv = await page.evaluate(() => ({form: getComputedStyle(document.querySelector(".plan-form")).display, sheet: getComputedStyle(document.getElementById("notaSheet")).display, step: getComputedStyle(document.querySelector(".plan-step")).display}));
check("la tipărire: formularul e ascuns, nota și pașii se văd", pv.form === "none" && pv.sheet !== "none" && pv.step !== "none", pv);
await page.emulateMedia({media: "screen"});

console.log("9. accesibilitate, mobil, rețea");
check("0 erori / 0 CSP / 0 rețea", st.errs.length === 0 && st.net.length === 0, [st.errs, st.net]);
await page.setViewportSize({width: 360, height: 740}); await page.waitForTimeout(200);
check("fără depășire orizontală la 360 px", (await hOverflow(page)) <= 1, await hOverflow(page));
await browser.close();
{ // axe necesită script inline: context separat, cu CSP ocolit doar pentru verificare
  const L2 = await launch({w: 1280, h: 900, bypassCSP: true});
  await L2.page.waitForTimeout(500);
  await L2.page.click('.navlink[data-sec="plan"]');
  await L2.page.selectOption("#planEnv", "munte"); await L2.page.check("#planGroup"); await L2.page.click("#planGenBtn");
  await L2.page.fill("#notaName", "Test");
  const ax = await axeRun(L2.page);
  check("axe 0 violări pe §21 (cu plan generat)", ax === null || ax.length === 0, ax);
  await L2.browser.close();
}
summary();

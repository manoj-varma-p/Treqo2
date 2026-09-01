const puppeteer = require("puppeteer-core");
const path = require("path");
const CHROME = "C:\\Users\\karthikeya\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe";

const BREAKPOINTS = [
  { w: 1440, h: 900, name: "1440" },
  { w: 1280, h: 900, name: "1280" },
  { w: 1024, h: 900, name: "1024" },
  { w: 768, h: 1024, name: "768" },
  { w: 390, h: 844, name: "390" },
  { w: 375, h: 812, name: "375" },
];

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => consoleErrors.push("[pageerror] " + e.message));

  const results = [];

  for (const bp of BREAKPOINTS) {
    await page.setViewport({ width: bp.w, height: bp.h, deviceScaleFactor: 1 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
    await page.waitForSelector("h1");
    await new Promise((r) => setTimeout(r, 400));

    const check = await page.evaluate(() => {
      const html = document.documentElement;
      const hOverflow = html.scrollWidth > window.innerWidth;
      // find any element whose right edge exceeds the viewport width (real offender, not just html)
      const offenders = [];
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > window.innerWidth + 1 || r.left < -1) {
          if (r.width > 0 && r.height > 0) {
            offenders.push({
              tag: el.tagName,
              cls: (el.className || "").toString().slice(0, 80),
              left: Math.round(r.left),
              right: Math.round(r.right),
              width: Math.round(r.width),
            });
          }
        }
      });
      return { hOverflow, scrollWidth: html.scrollWidth, innerWidth: window.innerWidth, offenders: offenders.slice(0, 15) };
    });

    await page.screenshot({ path: path.join(__dirname, `bp-${bp.name}.png`), fullPage: true });

    results.push({ bp: bp.name, ...check });
  }

  console.log(JSON.stringify(results, null, 2));
  console.log("CONSOLE_ERRORS", JSON.stringify(consoleErrors));
  await browser.close();
})();

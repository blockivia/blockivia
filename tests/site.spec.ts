import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const [path, lang, heading] of [
  ["/", "es", "Soluciones, Investigación y Capacitación"],
  ["/en/", "en", "Solutions, Research and Training"],
] as const) {
  test(`${lang}: static navigation, content, and accessibility`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
      heading,
    );
    await expect(page.locator("[data-block]")).toHaveCount(8);
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(
      page
        .getByRole("link", { name: "info@blockivia.xyz", exact: false })
        .last(),
    ).toHaveAttribute("href", "mailto:info@blockivia.xyz");
    await page
      .getByRole("navigation", {
        name: lang === "es" ? "Navegación principal" : "Main navigation",
      })
      .getByRole("link", { name: lang === "es" ? "Academia" : "Academy" })
      .click();
    await expect(page).toHaveURL(/#academy$/);
    await expect(page.locator("#academy")).toBeInViewport();
    // Unconfigured destinations must never become fake links.
    await expect(
      page.getByRole("link", {
        name: lang === "es" ? "Canal de WhatsApp" : "WhatsApp channel",
      }),
    ).toHaveAttribute(
      "href",
      "https://whatsapp.com/channel/0029VbDDJ770rGiGzbR1xd14",
    );
    expect(await page.locator('a[href="#"]').count()).toBe(0);
    // Visit all content so reveal animations have settled before the audit.
    for (const id of [
      "presentation",
      "pillars",
      "capabilities",
      "institutions",
      "academy",
      "track-record",
      "contact",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(900);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("language switch preserves the active section and returns to Spanish", async ({
  page,
}) => {
  await page.goto("/#pillars");
  await page.getByRole("link", { name: "ENG", exact: true }).first().click();
  await expect(page).toHaveURL("/en/#pillars");
  await expect(
    page.getByRole("heading", { name: "Three pillars", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "SPA", exact: true }).first().click();
  await expect(page).toHaveURL("/#pillars");
});

for (const width of [320, 390, 768]) {
  test(`mobile ${width}: menu, keyboard, no overflow, and reduced motion`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Abrir navegación" });
    await menu.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(menu).toBeFocused();
    await menu.click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "Academia" })
      .click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page).toHaveURL("/#academy");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    await expect(page.locator(".media-waiting")).toHaveCount(0);
    await page.goto("/en/");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "Contact", exact: false })
      .click();
    await expect(page).toHaveURL("/en/#contact");
    await expect(
      page
        .getByRole("link", { name: "info@blockivia.xyz", exact: false })
        .last(),
    ).toBeVisible();
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
  });
}

test("Web3 certificate workflow remains independent, localized, and handles no wallet", async ({
  page,
}) => {
  await page.goto("/certificados/");
  await expect(
    page.getByRole("heading", { name: "Certificados", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Conectar Wallet" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toBeVisible();
  await page.getByRole("link", { name: "🇬🇧 ENG" }).click();
  await expect(
    page.getByRole("heading", { name: "Certificates", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Connect wallet" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Back to BlockivIA", exact: false })
    .click();
  await expect(page).toHaveURL("/en/");
});

test("pending media uses empty reserved spaces without invented assets", async ({
  page,
}) => {
  const failedMedia: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/media/"))
      failedMedia.push(request.url());
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("canvas,video")).toHaveCount(0);
  await expect(
    page.locator(".media-slot[data-asset-state='pending']"),
  ).toHaveCount(4);
  await expect(page.locator("header img[src='/logo.png']")).toHaveCount(1);
  await expect(page.locator("main img[src='/logo.png']")).toHaveCount(0);
  await expect(page.locator("a[href*='certific']")).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  const metrics = await page
    .getByRole("heading", { level: 1 })
    .evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        size: s.fontSize,
        weight: s.fontWeight,
        line: s.lineHeight,
        font: s.fontFamily,
      };
    });
  expect(metrics.size).toBe("52px");
  expect(metrics.weight).toBe("500");
  expect(metrics.font).toContain("Roboto");
  expect(failedMedia).toEqual([]);
  await page.screenshot({
    path: "/workspace/scratch/blockivia-prepared-desktop-1440.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS(
    "font-size",
    "30px",
  );
  await page.screenshot({
    path: "/workspace/scratch/blockivia-prepared-mobile-390.png",
    fullPage: true,
  });
});

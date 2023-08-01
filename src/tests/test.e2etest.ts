import { test, expect, Page } from "@playwright/test";

let page: Page;

const openTableHeaderFilter = async () => {
  const iconFilterXpath = ".image-that-should-render";
  // const columnTarget = await page.locator("//div[contains(@class, 'test-div')]");
  // const coords = await columnTarget.boundingBox();
  // await page.mouse.click(coords?.x || 0, coords?.y || 0, {button: "right"});
  await page
    .locator("//div[contains(@class, 'test-div')]")
    .first()
    .click({ button: "right" });

  await page.locator(iconFilterXpath).first().waitFor({ state: "visible" });
};

test.describe("TEST", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("http://localhost:3007", {timeout: 60000, waitUntil: "load"});
  });
  test("Opens context menu", async () => {
    await openTableHeaderFilter();
    expect(true).toBe(true);
  });
});

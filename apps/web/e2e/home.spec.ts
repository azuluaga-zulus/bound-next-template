import { test, expect } from "@playwright/test";
test("Home carga", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Bound/i);
});

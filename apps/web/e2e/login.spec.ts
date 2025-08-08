import { test, expect } from "@playwright/test";
test("Login carga", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Login/i);
});

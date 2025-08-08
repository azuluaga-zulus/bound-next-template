import { test, expect } from "@playwright/test";
test("Onboarding carga", async ({ page }) => {
  await page.goto("/onboarding");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Onboarding/i,
  );
});

import { Page, TestInfo, test } from '@playwright/test';

type StepAction = () => Promise<void>;

function sanitizeForFileName(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type StepWithScreenshot = (title: string, action: StepAction) => Promise<void>;

export function createStepWithScreenshot(page: Page, testInfo: TestInfo): StepWithScreenshot {
  let stepNumber = 1;

  return async (title: string, action: StepAction): Promise<void> => {
    await test.step(title, async () => {
      await action();

      const stepLabel = String(stepNumber).padStart(2, '0');
      const safeTitle = sanitizeForFileName(title);
      const screenshotName = `step-${stepLabel}-${safeTitle}.png`;

      const image = await page.screenshot({ fullPage: true });
      await testInfo.attach(screenshotName, {
        body: image,
        contentType: 'image/png',
      });

      stepNumber += 1;
    });
  };
}
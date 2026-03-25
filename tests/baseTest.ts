import { expect, test as base, TestInfo } from '@playwright/test';
import { createStepWithScreenshot, StepWithScreenshot } from './utils/stepWithScreenshot';

type TestFixtures = {
  step: StepWithScreenshot;
};

export const test = base.extend<TestFixtures>({
  step: async ({ page }, use, testInfo: TestInfo) => {
    const step = createStepWithScreenshot(page, testInfo);
    await use(step);
  },
});

export { expect };
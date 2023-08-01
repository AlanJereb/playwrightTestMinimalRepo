import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  workers: "70%",
  retries: 0,
  testDir: "../..",
  testMatch: [
    "**/__e2e-tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(e2etest).[jt]s?(x)",
  ],
  timeout: 1 * 60 * 1000, // ms
  webServer: {
    command: "set PORT=3007 && npm run start",
    timeout: 120 * 1000,
    url: "http://localhost:3007/",
  },
  projects: [
    {
      name: "Chrome",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3007/",
        headless: true,
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
      },
    },
    {
      name: "Firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: "http://localhost:3007/",
        headless: true,
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
      },
    },
  ],
});

export const testSettings = {
  customConfig: {
    customSnapshotsDir: "./src/e2e_tests/snapshots",
    diffDirName: "__diff_output__",
    failedOutputDirName: "__failed_output__",
  },
};

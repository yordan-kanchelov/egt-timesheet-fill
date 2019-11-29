import { Page } from "puppeteer";

import loginPageSelectors from "../enums/loginPageSelectors";
import loginPrompt from "../prompts/login";

export default async (page: Page) => {
    const { username, password } = getEnvUsernameAndPassword() || (await loginPrompt());

    await page.waitForSelector(loginPageSelectors.usernameInput);
    await page.type(loginPageSelectors.usernameInput, username);

    await page.waitForSelector(loginPageSelectors.passwordInput);
    await page.type(loginPageSelectors.passwordInput, password);

    await page.click(loginPageSelectors.submitButton);
};

function getEnvUsernameAndPassword(): {
    username: string;
    password: string;
} | null {
    if (process.env.EGT_USERNAME && process.env.EGT_PASSWORD) {
        return {
            username: process.env.EGT_USERNAME,
            password: process.env.EGT_PASSWORD,
        };
    } else {
        return null;
    }
}

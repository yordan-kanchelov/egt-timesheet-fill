import { Page } from "puppeteer";

import loginPrompt from "../prompts/loginPrompt";

const usernameSelector = "#id_username";
const passwordSelector = "#id_password";
const submitButtonSelector = "body > div:nth-child(2) > form > input[type=submit]:nth-child(4)";

export default async (page: Page) => {
    const { username, password } = getEnvUsernameAndPassword() || (await loginPrompt());

    await page.waitForSelector(usernameSelector);
    await page.type(usernameSelector, username);

    await page.waitForSelector(passwordSelector);
    await page.type(passwordSelector, password);

    await page.click(submitButtonSelector);
};

function getEnvUsernameAndPassword(): {
    username: string;
    password: string;
} | null {
    if (process.env.EGT_USERNAME && process.env.EGT_PASSWORD) {
        return null;
        return {
            username: process.env.EGT_USERNAME,
            password: process.env.EGT_PASSWORDS,
        };
    } else {
        return null;
    }
}

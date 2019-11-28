import { Page } from "puppeteer";

const usernameSelector = "#id_username";
const passwordSelector = "#id_password";
const submitButtonSelector = "body > div:nth-child(2) > form > input[type=submit]:nth-child(4)";

export default async (page: Page) => {
    await page.waitForSelector(usernameSelector);
    await page.type(usernameSelector, process.env.EGT_USERNAME);

    await page.waitForSelector(passwordSelector);
    await page.type(passwordSelector, process.env.EGT_PASSWORD);

    await page.click(submitButtonSelector);
};

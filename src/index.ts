import * as dotenv from "dotenv";

import * as puppeteer from "puppeteer";

import login from "./loginPage/login";
import fillDay from "./timesheetsPage/fillGivenDay";
import listInCompleteDays from "./timesheetsPage/listIncompleteDays";
import selectCategory from "./prompts/selectCategory";
import TimeSheetsSelectors from "./selectors/timeSheetsSelectors";
import LoginPageSelectors from "./selectors/loginPageSelectors";

dotenv.config();

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });

    const mainPage = await browser.newPage();
    await mainPage.goto("https://employees.egt-interactive.com/timesheets/");
    await mainPage.waitFor(LoginPageSelectors.submitButton);

    await (await browser.pages())[0].close(); // close first blank page

    try {
        await login(mainPage);
        await mainPage.waitForSelector(TimeSheetsSelectors.dayLists);
        await mainPage.waitForSelector(TimeSheetsSelectors.selectButton);
    } catch (e) {
        console.error(e);
        return;
    }

    let daysToFill = await listInCompleteDays(browser);
    let desiredCategory = await selectCategory(browser);

    while (daysToFill.length > 0) {
        const day = daysToFill.shift();
        await fillDay(mainPage, day, desiredCategory);
    }

    browser.close();
})();

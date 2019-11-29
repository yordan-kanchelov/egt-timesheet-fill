import * as dotenv from "dotenv";

import * as puppeteer from "puppeteer";

import login from "./loginPage/login";
import fillDay from "./timesheetsPage/fillGivenDay";
import listInCompleteDays from "./timesheetsPage/listIncompleteDays";
import selectCategory from "./prompts/selectCategory";
import TimeSheetsSelectors from "./enums/timeSheetsSelectors";
import LoginPageSelectors from "./enums/loginPageSelectors";

dotenv.config();

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://employees.egt-interactive.com/timesheets/");
    await page.waitFor(LoginPageSelectors.submitButton);

    console.log(TimeSheetsSelectors.dayLists);
    console.log(TimeSheetsSelectors.selectButton);
    try {
        await login(page);
        await page.waitForSelector(TimeSheetsSelectors.dayLists);
        await page.waitForSelector(TimeSheetsSelectors.selectButton);
    } catch (e) {
        console.error(e);
        return;
    }

    let daysToFill = await listInCompleteDays(page);
    let desiredCategory = await selectCategory(page);

    while (daysToFill.length > 0) {
        const day = daysToFill.shift();
        await fillDay(page, day, desiredCategory);
    }

    browser.close();
})();

import * as dotenv from "dotenv";

import * as puppeteer from "puppeteer";

import login from "./loginPage/login";
import fillDay from "./timesheetsPage/fillGivenDay";
import listInCompleteDays from "./timesheetsPage/listIncompleteDays";
import timeSheetsSelectors from "./enums/selectors";

dotenv.config();
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://employees.egt-interactive.com/timesheets/");
    await page.waitFor(timeSheetsSelectors.loginSubmitButton);

    try {
        await login(page);
        await page.waitForSelector(timeSheetsSelectors.dayLists);
    } catch (e) {
        console.error(e);
        return;
    }

    let daysToFill = await listInCompleteDays(page);

    while (daysToFill.length > 0) {
        const day = daysToFill.shift();
        await fillDay(page, day);
    }
})();

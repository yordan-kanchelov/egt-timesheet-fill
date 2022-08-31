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
        args: ["--ignore-certificate-errors"],
    });

    const mainPage = await browser.newPage();
    await mainPage.goto("https://employees.amusnet.com/timesheets/");
    await mainPage.waitFor(LoginPageSelectors.submitButton);

    await (await browser.pages())[0].close(); // close first blank page

    try {
        await login(mainPage);
        await mainPage.waitForSelector(TimeSheetsSelectors.selectButton);
    } catch (e) {
        console.error("Error logging in \n", e);
        browser.close();
        return;
    }

    try {
        await mainPage.waitForSelector(TimeSheetsSelectors.dayLists);
    } catch (e) {
        console.error("Error, most probably there are no days to fill \n", e);
        browser.close();
    }

    let daysToFill = await listInCompleteDays(browser);
    let desiredCategory = await selectCategory(browser);

    while (daysToFill.length > 0) {
        const day: string = daysToFill.shift()!;
        await fillDay(mainPage, day, desiredCategory);
    }

    browser.close();
})();

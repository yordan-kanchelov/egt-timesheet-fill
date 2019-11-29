import * as prompts from "prompts";
import { Browser } from "puppeteer";

import selectors from "../selectors/timeSheetsSelectors";

export default async (browser: Browser): Promise<string> => {
    const page = await browser.newPage();
    await page.goto("https://employees.egt-interactive.com/timesheets/");
    await page.waitFor(selectors.selectButton);
    await page.click(selectors.selectButton);

    const categories = await page.evaluate((timeSheetSelectors: { categoryMenu: string }) => {
        return Array.from(document.querySelector(timeSheetSelectors.categoryMenu)!.children)
            .filter(el => {
                return !el.className.includes("dropdown");
            })
            .map(el => el.textContent!.trim())
            .sort();
    }, selectors);

    const { category } = await prompts([
        {
            type: "select",
            name: "category",
            message: "Select desired category",
            choices: categories.map(category => {
                return {
                    title: category,
                    value: category,
                };
            }),
        },
    ]);

    page.close();

    return category;
};

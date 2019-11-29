import * as prompts from "prompts";
import { Page } from "puppeteer";

import selectors from "../enums/timeSheetsSelectors";

export default async (page: Page): Promise<string> => {
    await page.click(selectors.selectButton);

    const categories = await page.evaluate((timeSheetSelectors: { categoryMenu: string }) => {
        return Array.from(document.querySelector(timeSheetSelectors.categoryMenu).children)
            .filter(el => {
                return !el.className.includes("dropdown");
            })
            .map(el => el.textContent.trim())
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

    return category;
};

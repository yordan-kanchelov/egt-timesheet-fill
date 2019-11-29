import getPageElementsByText from "../utils/getPageElementsByText";
import selectors from "../selectors/timeSheetsSelectors";

import { Page, ElementHandle } from "puppeteer";

export default async (page: Page, day: string, desiredCategory: string) => {
    const dateLink = await getPageElementsByText(page, day);
    await dateLink[0].click();

    await page.waitForSelector(selectors.selectButton);
    await page.click(selectors.selectButton);
    await page.waitForSelector(selectors.selectButton);

    const categoryLink = await page.evaluateHandle(
        (selectors: { categoryMenu: string }, desiredCategory): Element => {
            return Array.from(document.querySelector(selectors.categoryMenu)!.children).filter(
                el => el.textContent!.trim() == desiredCategory
            )[0];
        },
        selectors,
        desiredCategory
    );
    (categoryLink as ElementHandle).click();
    await page.waitFor(500);

    // select duration
    await page.waitForSelector(selectors.durationButton);
    await page.select(selectors.durationButton, "480");

    await page.waitForSelector(selectors.submitButton);
    await page.click(selectors.submitButton);
};

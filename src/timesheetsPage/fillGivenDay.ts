import selectors from "../enums/selectors";
import { Page } from "puppeteer";

export default async (page: Page, day: string) => {
    console.log(day);

    // chose date
    const link = await page.$x(`//a[contains(text(), '${day}')]`);
    await link[0].click();
    await page.waitForSelector(selectors.selectButton);

    // select category
    await page.click(selectors.selectButton);
    await page.click(selectors.liveRoulette);

    // select duration
    await page.waitForSelector(selectors.durationButton);
    await page.select(selectors.durationButton, "480");

    // submit
    await page.waitForSelector(selectors.submitButton);
    await page.click(selectors.submitButton);
};

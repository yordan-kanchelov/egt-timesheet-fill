import pageSelectors from "../selectors/timeSheetsSelectors";
import { Browser } from "puppeteer";
export default async (browser: Browser): Promise<string[]> => {
    const page = await browser.newPage();
    await page.goto("https://employees.egt-interactive.com/timesheets/");
    await page.waitFor(pageSelectors.dayLists);

    let list = await page.evaluate(
        (selectors: { dayLists: string }) =>
            Array.from(document.querySelectorAll(selectors.dayLists)[0].children).map((el: Element) => {
                return el.textContent!.trim();
            }),
        pageSelectors
    );

    await page.close();

    return list;
};

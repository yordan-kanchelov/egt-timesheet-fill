import pageSelectors from "../enums/selectors";
import { Page } from "puppeteer";
export default async (page: Page): Promise<string[]> => {
    let list = await page.evaluate(
        selectors =>
            Array.from(document.querySelectorAll(selectors.dayLists)[0].children).map((el: Element) => {
                return el.textContent.trim();
            }),
        pageSelectors
    );

    return list;
};

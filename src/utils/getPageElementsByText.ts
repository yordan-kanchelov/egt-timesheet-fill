import { Page, ElementHandle } from "puppeteer";

export default async (page: Page, text: string): Promise<ElementHandle[]> => {
    return await page.$x(`//*[contains(text(), '${text}')]`);
};

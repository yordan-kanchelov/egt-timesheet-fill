const timeSheetSelectors: {
    categoryMenu: string;
    dayLists: string;
    selectButton: string;
    durationButton: string;
    submitButton: string;
} = {
    categoryMenu:
        "body > div:nth-child(2) > div > div.col-sm-9 > div:nth-child(2) > form > div:nth-child(3) > div:nth-child(1) > div > div > div > div.inner.show > ul",
    dayLists: "body > div:nth-child(2) > div > div.col-sm-3 > div:nth-child(5) > ul > li > ul",
    selectButton:
        "body > div:nth-child(2) > div > div.col-sm-9 > div:nth-child(2) > form > div:nth-child(3) > div:nth-child(1) > div > div > button > div > div > div",
    durationButton: "#duration",
    submitButton:
        "body > div:nth-child(2) > div > div.col-sm-9 > div:nth-child(2) > form > div:nth-child(3) > div:nth-child(3) > div > input",
};

Object.freeze(timeSheetSelectors);

export default timeSheetSelectors;

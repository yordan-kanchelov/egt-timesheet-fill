import prompts = require("prompts");

export default async (): Promise<{
    username: string;
    password: string;
}> => {
    const { username, password } = await prompts([
        {
            type: "text",
            name: "username",
            hint: "egt username",
            message: "enter username: ",
        },
        {
            type: "password",
            name: "password",
            hint: "egt password",
            message: "enter password: ",
        },
    ]);

    return {
        username,
        password,
    };
};

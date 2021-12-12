import { Context } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import { lv3 as nextQuestion } from "./data.ts" 

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTQ1MTQxOTgxMCIsIm5hbWUiOiLph47njaPlhYjovKkiLCJpYXQiOjExNDUxNDE5MTl9.rqxUm3Bajq5XcFsd0syJO9PWdc2JHFYqp9A1JboO8eo";


export async function login(ctx: Context) {
    const formData = await ctx.request.body({
        type: "form-data"
    }).value.read();
    const { username, password } = formData.fields;
    if (username !== "admin") {
        ctx.response.body = {
            status: false,
            data: "Username Not Found"
        };
        return;
    }
    if (password !== "root") {
        ctx.response.body = {
            status: false,
            data: "Wrong Password"
        };
        return;
    }
    ctx.response.body = {
        status: true,
        data: token
    };
}

export function nextLevel(ctx: Context) {
    const auth = ctx.request.headers.get("Authorization");
    if (!auth) {
        ctx.response.body = "No Token Provided";
    }
    if (ctx.request.headers.get("Authorization") !== token) {
        ctx.response.body = "Token Expired";
    }
    ctx.response.body = nextQuestion;
}



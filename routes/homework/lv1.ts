import { Context } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import { lv2 as nextLv } from "./data.ts"

export default async function (ctx: Context) {
    const req = ctx.request.body({
        type: "form-data"
    });

    if (!ctx.request.headers.get("content-type")) {
        ctx.response.body = "我猜你要么没用 formdata，要么就是传过来的 formdata 里面是空的";
        return;
    }

    const { message } = (await req.value.read()).fields;
    if (!message) {
        ctx.response.body = "formdata 里面的 message 呢???";
        return;
    }

    if (Math.random() < 0.1) {
        ctx.response.body = nextLv;
    } else {
        ctx.response.body = `你说“${message}”我就回你，你当我是便宜货啊？`
    }

    console.log("asd")
}

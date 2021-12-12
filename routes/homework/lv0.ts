import { Context } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import { lv1 as question } from "./data.ts";

export default function (ctx: Context, _next: () => Promise<unknown>) {
    const ua = ctx.request.headers.get("User-Agent");
    if (!ua) return;
    if ((/postman/i).test(ua)) {
        ctx.response.body = "🤗 不可以使用 Postman 哦~"
    } else if ((/curl/i).test(ua)) {
        ctx.response.body = "🤗 不可以使用 curl 哦~"
    } else {
        ctx.response.body = question;
    }
}

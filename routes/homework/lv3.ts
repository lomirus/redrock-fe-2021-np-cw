import { Context, helpers } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import { end as nextQuestion } from "./data.ts" 

const websockets = new Set<WebSocket>();

setInterval(() =>
    websockets.forEach(websocket =>
        websocket.send(
            JSON.stringify({
                type: "MESSAGE",
                username: "admin",
                avatar: "http://q2.qlogo.cn/g?b=qq&nk=2815478278&s=640",
                data: nextQuestion
            })))
    , 5 * 60 * 1000)

async function ws(context: Context, _next: () => Promise<unknown>) {
    const websocket = await context.upgrade();
    const username = helpers.getQuery(context).username ?? "Anonymous";
    const avatar = (() => {
        if (
            !helpers.getQuery(context).avatar
            || helpers.getQuery(context).avatar === ""
        ) {
            return "http://localhost:8000/static/images/avatar.jpg";
        } else {
            return helpers.getQuery(context).avatar;
        }
    })()

    websocket.onopen = () => {
        websockets.add(websocket);
        websockets.forEach(
            websocket =>
                websocket.send(
                    JSON.stringify({
                        type: "OPEN",
                        username,
                        avatar
                    })));
    }

    websocket.onmessage = (event: MessageEvent) =>
        websockets.forEach(websocket =>
            websocket.send(
                JSON.stringify({
                    type: "MESSAGE",
                    username,
                    avatar,
                    data: event.data
                })));


    websocket.onclose = () => {
        websockets.delete(websocket);
        websockets.forEach(websocket =>
            websocket.send(
                JSON.stringify({
                    type: "CLOSE",
                    username,
                    avatar
                })));
    }
}

export default ws;

import { Context, helpers } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const websockets = new Set<WebSocket>();

async function ws(context: Context, _next: () => Promise<unknown>) {
    const websocket = await context.upgrade();
    const username = helpers.getQuery(context).username ?? "Anonymous";
    websockets.add(websocket);

    websocket.onopen = () => websockets.forEach(
        websocket =>
            websocket.send(
                JSON.stringify({
                    type: "OPEN",
                    username: username
                })));

    websocket.onmessage = (event: MessageEvent) => {
        websockets.forEach(websocket =>
            websocket.send(
                JSON.stringify({
                    type: "MESSAGE",
                    username: username,
                    data: event.data
                })));
    }

    websocket.onclose = () => {
        websockets.delete(websocket);
        websockets.forEach(websocket =>
            websocket.send(
                JSON.stringify({
                    type: "CLOSE",
                    username: username
                })));
    }
}

export default ws;

import { Application, Context, send } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import routes from "./routes/index.ts"
import { port } from "./config/index.ts";

async function root(context: Context, next: () => Promise<unknown>) {
    if (context.request.url.pathname.startsWith("/static/"))
        await handleStatics(context);
    else
        await next();
    context.response.headers.set("Access-Control-Allow-Origin", "*");
    context.response.headers.set("Access-Control-Allow-Headers", "Authorization");
}

async function handleStatics(context: Context) {
    try {
        await send(context, context.request.url.pathname, {
            root: Deno.cwd(),
        });
    } catch (err) {
        switch (err.name) {
            case "NotFoundError":
                console.log(`NotFoundError: ${context.request.url.pathname}`); break;
            default:
                console.log(err);
        }
    }
}

const app = new Application();

app.use(root);
app.use(routes);

app.addEventListener("listen", () => {
    console.log(`Server listening on http://localhost:${port}/`)
})

await app.listen({ port });
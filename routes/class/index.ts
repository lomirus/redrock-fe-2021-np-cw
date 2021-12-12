import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import genshin from "./genshin.ts";
import ws from "./ws.ts";

const router = new Router()
    // res.text()
    .get("/who-is-god", context => {
        context.response.body = "鈺殿はフロントエンドの神様です";
    })
    // res.json()
    .get("/frameworks", context => {
        context.response.body = {
            "react": ["jsx", "hooks", "meta"],
            "vue": ["template", "evan you"],
            "svelte": ["per-compilation", "never gonna you up"],
            "solid": ["per-compilation", "reactive"],
            "majs": ["best", "yuloader"]
        };
    })
    .get("/genshin", genshin)
    .get("/ws", ws)

export default router;

import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import lv0 from "./lv0.ts";
import lv1 from "./lv1.ts";
import * as lv2 from "./lv2.ts"
import lv3 from "./lv3.ts";

const router = new Router()
    // lv0
    .post("/get_homework", lv0)
    // lv1
    .post("/fufubot_test", lv1)
    // lv2
    .post("/auth/login", lv2.login)
    .get("/auth/next_level", lv2.nextLevel)
    // lv3
    .get("/chatroom", lv3);

export default router;

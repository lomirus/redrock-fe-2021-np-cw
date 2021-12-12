import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import demoRouter from "./class/index.ts";
import homeworkRouter from "./homework/index.ts";

const router = new Router()
    .use("/demo", demoRouter.routes(), demoRouter.allowedMethods())
    .use("/homework", homeworkRouter.routes(), demoRouter.allowedMethods())

const routes = router.routes();

export default routes;

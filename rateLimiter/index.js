import Koa from "koa";
import { fixWindow, tokenBucket } from "algorithms";
const app = new Koa();

// Put rate limit middleware
app.use(fixWindow);
//app.use(tokenBucket);

app.use(async (ctx) => (ctx.body = "Hello World"));
app.listen(3000);
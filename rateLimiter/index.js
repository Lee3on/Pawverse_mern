import Koa from "koa";
const app = new Koa();

// Put rate limit middleware

app.use(async (ctx) => (ctx.body = "Hello World"));
app.listen(3000);
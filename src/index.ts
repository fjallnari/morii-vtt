import Koa from 'koa';
import dotenv from "dotenv";
import serve from 'koa-static';
import path from 'path';

dotenv.config();

const port = process.env.PORT || 4000;

const main = async () => {
  const app = new Koa();

  app.use(serve(path.join(__dirname, 'client/public')));

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/?#`);
  });

};

main();
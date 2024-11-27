import DotenvFlow from 'dotenv-flow';

DotenvFlow.config();

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  env: process.env.ENV,
  server_url: process.env.SERVER_URL
};

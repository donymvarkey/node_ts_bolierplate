interface ServerOptions {
  port: string | undefined;
  database_url: string | undefined;
  env: string | undefined;
  server_url: string | undefined;
}

type THttpResponse = {
  success: boolean;
  statusCode: number;
  request: {
    ip?: string | null;
    method: string;
    url: string;
  };
  message: string;
  data: unknown;
};

type THttpError = {
  success: boolean;
  statusCode: number;
  request: {
    ip?: string | null;
    method: string;
    url: string;
  };
  message: string;
  data: unknown;
  trace?: object | null;
};

export { ServerOptions, THttpResponse, THttpError };


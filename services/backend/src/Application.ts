import debug from 'debug';
import express from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';
import { ApolloServer, CorsOptions } from 'apollo-server';
import { ApolloServerExpressConfig } from 'apollo-server-express';

interface GraphQLConfig {
  port: number;
}
export interface ApplicationOptions {
  rootDir: string;
  port?: number;
  graphqlConfig?: GraphQLConfig;
}

export type ApolloServerConfig = ApolloServerExpressConfig & {
  cors?: CorsOptions | boolean;
  onHealthCheck?: (req: express.Request) => Promise<any>;
  stopGracePeriodMillis?: number;
};

export class Application {
  // Set instance of Debug module
  private log: debug.Debugger = debug('app:Application');

  // Root directory of the project
  private rootDir: string;

  // Express Applicatin instance
  public app: express.Application = express();

  // Nodejs HTTP server instance
  private httpServer: http.Server = http.createServer(this.app);

  // Apollo Server instance
  private apolloServer!: ApolloServer;

  // Constant Port
  private readonly DEFAULT_PORT: number = ((process.env.PORT as unknown) as number) || 3043;

  // application port
  private port: number;

  // Graphql Config
  private gqlConfig: GraphQLConfig;

  constructor({ rootDir, port, graphqlConfig }: ApplicationOptions) {
    this.rootDir = rootDir || __dirname;
    this.port = port || this.DEFAULT_PORT;
    this.gqlConfig = { port: 4000, ...(graphqlConfig || {}) };
  }

  private setupMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  // Setup Apollo Server for GraphQL
  public createApolloServer(config: ApolloServerConfig): Application {
    this.apolloServer = new ApolloServer(config);
    return this;
  }

  // Setup and run graphql server
  private runApolloServer() {
    this.apolloServer
      .listen(this.gqlConfig.port)
      .then(({ url }) => {
        this.log(`Apollo Server ready at ${url}`);
      })
      .catch((err) => {
        this.log(err);
      });
  }

  // Initialize an run servers
  public listen(callback?: (port: number) => void): void {
    this.httpServer.listen(this.port, () => {
      this.log(`Application up and running on http://localhost:${this.port}`);
      this.log('Starting Apollo Server.');
      // Run apollo-server only if it is created
      if (this.apolloServer) {
        this.runApolloServer();
      }
      if (callback) {
        callback(this.port);
      }
    });
  }
}

export default Application;

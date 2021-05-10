/* eslint-disable */
import debug from 'debug';
import express from 'express';
import * as http from 'http';
import { ApolloServer, CorsOptions, IResolvers } from 'apollo-server';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { readFileSync } from 'fs';
import { join } from 'path';
import { sync as readdirSync } from 'glob';
import { makeExecutableSchema } from '@graphql-tools/schema';
import Database from './utils/database/database';
import { exec } from 'child_process'
const log = debug("app:shell")
const shell = async (cmd: string) => {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      log(error.message);
      return;
    }
    if (stderr) {
      log(stderr);
      return;
    }
    log(stdout);

  })
}

interface GraphQLConfig {
  port: number;
}
export interface ApplicationOptions {
  rootDir: string;
  port?: number;
  graphqlConfig?: GraphQLConfig;
  resolvers?: Array<any>;
}

export type ApolloServerConfig = ApolloServerExpressConfig & {
  cors?: CorsOptions | boolean;
  onHealthCheck?: (req: express.Request) => Promise<any>;
  stopGracePeriodMillis?: number;
};

export class Application {
  // Set instance of Debug module
  private log: debug.Debugger = debug('app:Application');

  // resolvers
  private resolvers: Array<any>;

  // Root directory of the project
  private rootDir: string;

  // private database
  private database: Database

  // Express Applicatin instance
  public app: express.Application = express();

  // Nodejs HTTP server instance
  private httpServer: http.Server = http.createServer(this.app);

  // Apollo Server instance
  private apolloServer!: ApolloServer;

  // Constant Port
  private readonly DEFAULT_PORT: number = ((process.env.PORT as unknown) as number) || 3001;

  // application port
  private port: number;

  // Graphql Config
  private gqlConfig: GraphQLConfig;

  constructor({ rootDir, port, graphqlConfig, resolvers }: ApplicationOptions) {
    this.rootDir = rootDir || __dirname;
    this.port = port || this.DEFAULT_PORT;
    this.gqlConfig = { port: 3000, ...(graphqlConfig || {}) };
    this.resolvers = resolvers || [];
    this.database = Database.createConnection({})
  }

  private async connectToDatabase() {
    try {
      await this.database.connect()
      this.log('Database connection has beend established succefully');
      // Execuating migration

    } catch (error) {
      this.log('Something went wrong while connecting to the database.')
      this.log(error);
    }
  }


  // setup graphql schema
  generateGraphQlSchema(): GraphQLSchema {
    const gqlFiles: Array<string> = readdirSync(join(this.rootDir, '**/*.graphql'));
    let typeDefs = '';
    const resolvers = this.loadReslovers();
    gqlFiles.forEach((file) => {
      typeDefs += readFileSync(file, {
        encoding: 'utf8',
      });
    });
    return makeExecutableSchema({
      typeDefs,
      resolvers,
    });
  }

  // load resolvers
  loadReslovers(): IResolvers {
    const Mutation: Record<string, any> = {};
    const Query: Record<string, any> = {};
    this.resolvers.forEach((Reslover: any) => {
      const instance = new Reslover();
      // load mutations form reslover
      const mutations = (Reflect.getMetadata('mutations', Reslover) || []) as Array<string>;
      mutations.forEach((key: string) => {
        Mutation[key] = instance[key as keyof typeof instance].bind(instance);
      });
      // load queries form reslover
      const queries = (Reflect.getMetadata('queries', Reslover) || []) as Array<string>;
      queries.forEach((key: string) => {
        Query[key] = instance[key as keyof typeof instance].bind(instance);
      });
    });
    return {
      Mutation,
      Query,
    };
  }

  // Setup Apollo Server for GraphQL
  public createApolloServer(): Application {
    this.apolloServer = new ApolloServer({ schema: this.generateGraphQlSchema() });
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
    this.log('Running migration')
    // Execute mgiration before running the server
    shell('yarn typeorm migration:run')
    this.httpServer.listen(this.port, () => {
      this.log(`Application up and running on http://localhost:${this.port}`);
      this.log('Starting Apollo Server.');
      this.connectToDatabase()
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

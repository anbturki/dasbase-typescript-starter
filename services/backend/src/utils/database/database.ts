import debug from 'debug';
import { Pool, Client, ClientConfig } from 'pg';

interface Connection {
  [key: string]: {
    client: Client;
    connectedAt: Date;
  };
}

export class Database {
  private client: Client;

  private static connection: Database;

  private log: debug.Debugger = debug('Database');

  constructor(config: ClientConfig) {
    this.client = new Client(config);
  }

  public connect() {
    return this.client.connect();
  }

  public getClient() {
    return this.client;
  }

  public close() {
    return this.client.end();
  }

  public exec(text: string, values: Array<any>) {
    return this.client.query(text, values);
  }

  static createConnection(config: ClientConfig): Database {
    if (!Database.connection) {
      Database.connection = new Database(config);
    }
    const db: Database = Database.connection;
    return db;
  }
}

export default Database;

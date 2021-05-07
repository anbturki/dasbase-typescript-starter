import { readFileSync } from 'fs';
import { sync as readdirSync } from 'glob';
import { makeExecutableSchema } from '@graphql-tools/schema';

const gqlFiles: Array<string> = readdirSync('./**/*.graphql');

let typeDefs = '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(file, {
    encoding: 'utf8',
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  // resolvers pending...
});

export default schema;

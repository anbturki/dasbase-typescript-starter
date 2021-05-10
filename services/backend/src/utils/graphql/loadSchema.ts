import { readFileSync } from 'fs';
import { join } from 'path';
import { sync as readdirSync } from 'glob';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { IResolvers } from 'apollo-server';

export const loadSchema = (
  rootDir: string,
  resolvers: {
    Query: IResolvers;
    Mutation: IResolvers;
  },
): GraphQLSchema => {
  const gqlFiles: Array<string> = readdirSync(join(rootDir, '**/*.graphql'));
  let typeDefs = '';
  gqlFiles.forEach((file) => {
    typeDefs += readFileSync(file, {
      encoding: 'utf8',
    });
  });
  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};

export default loadSchema;

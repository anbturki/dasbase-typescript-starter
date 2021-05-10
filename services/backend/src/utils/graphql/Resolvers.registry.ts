import { GraphQLObjectType } from 'graphql';
import { IResolverObject, IResolvers } from 'graphql-tools';
import { Maybe } from 'graphql/jsutils/Maybe';

class ResloversRegistry {
  private mutationsDs: IResolvers = {};

  private queriesDs: IResolvers = {};

  public addQuery(key: string, query: any) {
    this.queriesDs[key] = query as IResolverObject;
  }

  public addMutation(key: string, mutation: any) {
    this.mutationsDs[key] = mutation as IResolverObject;
  }

  get mutations(): IResolvers {
    return this.mutationsDs;
  }

  get queries(): IResolvers {
    return this.queriesDs;
  }
}

export default new ResloversRegistry();

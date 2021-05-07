import { IResolvers } from 'apollo-server';
import { authModule } from '../auth/auth.module';
import { usersModule } from '../users/users.module';

type Mutation = Record<string, IResolvers>
// Interface for a module
interface IModule {
  mutations?:  any;
  queries?:  any;
}
// Interface for the RootModule
interface IRootModule {
  modules: Record<string, IModule>;
  getResolvers: () => {
    Mutation: IResolvers;
    Query: IResolvers;
  };
}

export const rootModule: IRootModule = {
  modules: {
    usersModule,
    authModule,
  },
  getResolvers() {
    let Query = {};
    let Mutation = {};
    // Load sub-modules
    Object.keys(this.modules).forEach((mKey: string) => {
      // Get a module by its name
      const module: IModule = this.modules[mKey];
      // check mutations in a module
      if (module.mutations) {
        Mutation = { ...module.mutations, ...Mutation };
      }
      // check queries in a module
      if (module.queries) {
        Query = { ...module.queries, ...Query };
      }
    });
    // return mutations and queries
    return {
      Mutation,
      Query,
    };
  },
};

export default rootModule;

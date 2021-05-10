import ResloversRegistry from '../graphql/Resolvers.registry';

export const Mutation = () => (target: Object, key: string) => {
  if (!Reflect.hasMetadata('mutations', target.constructor)) {
    Reflect.defineMetadata('mutations', [], target.constructor);
  }
  const mutations = Reflect.getMetadata('mutations', target.constructor) as Array<string>;
  mutations.push(key);
  Reflect.defineMetadata('mutations', mutations, target.constructor);
  // ResloversRegistry.addMutation(key, target[key as keyof typeof target] as any);
};
export const Query = (qKey?: string) => (target: Object, key: any) => {
  if (!Reflect.hasMetadata('queries', target.constructor)) {
    Reflect.defineMetadata('queries', [], target.constructor);
  }
  const queries = Reflect.getMetadata('queries', target.constructor) as Array<string>;
  queries.push(key);
  Reflect.defineMetadata('queries', queries, target.constructor);

  // const method: any = target[(qKey as keyof typeof target) || (key as keyof typeof target)];
  // ResloversRegistry.addQuery(key, method.bind(target));
};

export default Mutation;

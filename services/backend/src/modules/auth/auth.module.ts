import { authMutations } from './auth.mutations';
import { authQueries } from './auth.quries';

export const authModule = {
  mutations: authMutations,
  queries: authQueries,
};
export default authModule;

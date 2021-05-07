// import { usersMutations } from './users.mutations';
const users: any = [];
export const usersModule = {
  queries: {
    users: () => {
      return users;
    },
    user: (root: any, args: any) => {
      const { id } = args;
      const user = users.find((user: any) => user.id == id);
      console.log(user);
      return user;
    },
  },
  mutations: {
    createUser: (root: any, args: any, context: any) => {
      const { user: usr } = args;
      const user: any = { id: users.length + 1, ...usr };
      users.push(user);
      return user;
    },
  },
};

export default usersModule;

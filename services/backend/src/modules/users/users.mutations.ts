export const usersMutations = {
  createUser: (_,args) => {
    console.log(_,args)
    return {
      id: 1,
      firstName: 'ali',
      lastName: 'turki',
      email: 'al',
    };
  }
}
import User from '../models/user';

const checkExistenceOfUser = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export default checkExistenceOfUser;

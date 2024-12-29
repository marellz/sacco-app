export const createUser = async ({
  email,
  name,
  password,
}) => {
  const user = {
    _id: "id",
    name,
    email,
    avatar: 'avatar'
  };

  return user;
};

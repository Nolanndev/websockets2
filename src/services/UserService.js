

const users = new Map();

const addUser = (userId, userData) => {
  users.set(userId, userData);
};

const removeUser = (userId) => {
  users.delete(userId);
};

const getUsers = () => {
  return Array.from(users.values());
};

const getUser = (userId) => {
  return users.get(userId) || null;
};

const UserService = {
    addUser: addUser,
    removeUser: removeUser,
    getUsers: getUsers,
    getUser: getUser,
};

export default UserService;
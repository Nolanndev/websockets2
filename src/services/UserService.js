const users = new Map();

let plus = 0;

const addUser = (userId, userData) => {
	users.set(userId, userData);
};

const removeUser = (userId) => {
	users.delete(userId);
};


const getUsers = () => {
	return Array.from(users, ([id, userData]) => ({
	  ...userData,
	  id
	}));
  };

const getUser = (userId) => {
	return users.get(userId) || null;
};

const deleteUser = (userId) => {
	users.delete(userId);
};

const UserService = {
	addUser: addUser,
	removeUser: removeUser,
	getUsers: getUsers,
	getUser: getUser,
	deleteUser: deleteUser,
};

export default UserService;

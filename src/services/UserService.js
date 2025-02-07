const users = new Map();

const addUser = (userId, userData) => {
	users.set(userId, userData);
};

const removeUser = (userId) => {
	users.delete(userId);
};

const getUsers = () => {
	return Array.from(users.values());
	// return users;
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

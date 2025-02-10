/**
 * Service gérant la liste des utilisateurs connectés.
 * Utilise une Map pour stocker les utilisateurs, ce qui facilite l'ajout,
 * la suppression et la récupération d'informations.
 */

/**
 * Map conservant les utilisateurs sous la forme :
 * key = userId, value = userData (objet contenant les infos de l'utilisateur)
 */
const users = new Map();

/**
 * Exemple de variable globale pour illustrer un éventuel compteur ou état interne
 * (non utilisé dans le reste du code, pourrait être retiré ou utilisé pour une autre logique).
 */
let plus = 0;

/**
 * Ajoute un nouvel utilisateur dans la Map.
 * @param {string} userId - Identifiant unique du socket de l'utilisateur.
 * @param {object} userData - Données associées à l'utilisateur (pseudo, position, etc.).
 */
const addUser = (userId, userData) => {
	users.set(userId, userData);
};

/**
 * Supprime un utilisateur de la Map (ne supprime que les données, pas la logique socket).
 * @param {string} userId - Identifiant unique du socket de l'utilisateur.
 */
const removeUser = (userId) => {
	users.delete(userId);
};

/**
 * Retourne la liste de tous les utilisateurs sous forme de tableau.
 * Chaque élément contient les données de l'utilisateur + son identifiant.
 * @returns {Array} - Tableau d'objets utilisateurs.
 */
const getUsers = () => {
	return Array.from(users, ([id, userData]) => ({
		...userData,
		id,
	}));
};

/**
 * Retourne un utilisateur spécifique en fonction de son identifiant.
 * @param {string} userId - Identifiant unique du socket de l'utilisateur.
 * @returns {object|null} - Données de l'utilisateur ou null si inexistant.
 */
const getUser = (userId) => {
	return users.get(userId) || null;
};

/**
 * Supprime un utilisateur de la Map (identique à removeUser, mis à disposition pour une alternative).
 * @param {string} userId - Identifiant unique du socket de l'utilisateur.
 */
const deleteUser = (userId) => {
	users.delete(userId);
};

/**
 * Regroupe toutes les fonctions de gestion d'utilisateurs dans un seul objet,
 * pour simplifier l'import et l'utilisation ailleurs dans le projet.
 */
const UserService = {
	addUser,
	removeUser,
	getUsers,
	getUser,
	deleteUser,
};

export default UserService;

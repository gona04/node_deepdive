import { createAuthToken } from './middleware/authTokens.js';

export let users = [
    {id: '1',name: 'Goonja', email:'gona.gandhi@gmail.com', password:'secret', role: 'employee'},
    {id: '2',name: 'Sonali', email:'Sonal@gmail.com', password:'secret1', role:'manager'},
    {id: '3',name: 'admin', email: 'admin@gmail.com',password:'secret12', role:'admin'}
]
export const getUsers =  (req,res) => {
    res.json(users.map(({ password, ...user }) => user));
}

export const loginUser = (req, res) => {
    const { password, ...user } = req.user;
    res.json({ token: createAuthToken(user.id), user });
}

export const getUserById = (req, res) => {
    const {id} = req.params;
    const user = users.find(user => user.id === id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { password, ...safeUser } = user;
    res.json(safeUser);
}
import express from 'express';
import { createUser, getUserByEmail } from '../models/users';

export const getUserByEmailId = async (req: express.Request, res: express.Response) => {
    try {
        console.log('inside get user by email id');
        const { email } = req.body;
        const user = await getUserByEmail(email);

        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const createInternalUser = async (req: express.Request, res: express.Response) => {
    try {
        console.log('inside create internal user');
        const { name, email, role } = req.body;
        if(!name || !email || !role) {
            return res.status(400).json({message: 'Invalid request'});
        }

        const user = await createUser({ name, email, role });

        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
}
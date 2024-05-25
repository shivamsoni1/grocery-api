import express from 'express';
import { createCustomer } from '../models/customers';

export const registerCustomer = async (req: express.Request, res: express.Response) => {
    try {
        const { name,email,mobile} = req.body;
        if(!name || !email || !mobile) {
            return res.status(400).json({message: 'Invalid request'});
        }
        console.log('inside register customer');
        const customer = await createCustomer({
           name,
           email,
           mobile
        });
        

        return res.status(200).json(customer);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

import express from "express";

import { createOrder } from "../models/orders";

export const placeOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { customerId, cartId } = req.body;
        if(!customerId || !cartId) {
            return res.status(400).json({message: 'Invalid request'});
        }
        console.log('inside place order');
        const order = await createOrder(cartId);
        return res.status(200).json(order);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
}
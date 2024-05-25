import express from 'express';
import { CartDto, NewCart, addCart, getCartById,updateCart } from '../models/cart';
import { deleteCartItem, updateCartItem } from '../models/cartItems';
import { CartItemDto } from '../models/cartItems';

export const addItem = async (req: express.Request, res: express.Response) => {
    try {
        const { customerId, productId,mrp ,price,quantity,cartId } = req.body;
        if(!customerId || !productId || !mrp || !price || !quantity) {
            return res.status(400).json({message: 'Invalid request'});
        }
        console.log('inside add product');
        const params :CartItemDto= {
            productId, 
            mrp,
            price,
            quantity,
        }
        if(!cartId){
            const cart : NewCart={
                customerId,
                total:quantity*price,
            }
            const data = await addCart(cart,params);
            
    
            return res.status(200).json(data);
        }
        else{
            const getCart = await getCartById(cartId);
            const newCart:CartDto={
                id:cartId,
                total:getCart[0].total+quantity*price,
            }
            const data = await updateCart(newCart,params);
            return res.status(200).json(data);
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const updateItem = async (req: express.Request, res: express.Response) => {
    try {
        const { customerId, productId,mrp ,price,quantity,cartId } = req.body;
        if(!customerId || !productId || !mrp || !price || !quantity || !cartId) {
            return res.status(400).json({message: 'Invalid request'});
        }
        console.log('inside update product');
        const params :CartItemDto= {
            productId, 
            mrp,
            price,
            quantity,
        }
        const newCart:CartDto={
            id:cartId,
        }
        const data = await updateCartItem(newCart,params);
        

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const deleteItem = async (req: express.Request, res: express.Response) => {
    try {
        const {customerId, productId, cartId } = req.body;
        if(!productId || !cartId || !customerId) {
            return res.status(400).json({message: 'Invalid request'});
        }
        console.log('inside remove product',productId,cartId);
        const data = await deleteCartItem(cartId,productId);
        

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};
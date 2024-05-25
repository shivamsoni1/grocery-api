import express from 'express';
import { addInventory, getAvailableItems, getInventory,getInventoryItemByPid, updateInventoryById } from '../models/inventory';

export const addInventoryItem = async (req: express.Request, res: express.Response) => {
    try {
        const {productId,mrp,unitCostPrice,quantity,status} = req.body;
        if(!productId || !quantity) {
            return res.status(400).json({message: 'Invalid request'});
        }
        console.log('inside add product');
        const getItemRes = await getInventoryItemByPid(productId);
        let inventory;
        if(getItemRes.length>0){

            inventory = await updateInventoryById(getItemRes[0].id,{
                quantity: quantity + getItemRes[0].quantity,
    
            });
            return res.status(200).json(inventory);
        }
        if(!productId || !mrp || !unitCostPrice || !quantity || !status) {
            return res.status(400).json({message: 'product not exist , pass all the fields'});
        }
        inventory = await addInventory({
           productId,
           mrp,
           unitCostPrice,
           quantity,
           status
        });
        

        return res.status(200).json(inventory);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const getInventoryItems = async (req: express.Request, res: express.Response) => {
    try {
        console.log('inside get inventory items');
        const inventory = await getInventory();
        

        return res.status(200).json(inventory);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const getAvailableInventoryItems = async (req: express.Request, res: express.Response) => {
    try {
        console.log('inside get available inventory items');
        const inventory = await getAvailableItems();
       
        return res.status(200).json(inventory);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
}
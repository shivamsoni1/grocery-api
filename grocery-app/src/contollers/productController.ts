import express from 'express';
import { createProduct, disableProductById, getProducts, updateProductById } from '../models/products';

export const addProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { name,imageUrl,price,mrp,status } = req.body;
        if(!name || !imageUrl || !price || !mrp || !status) {
            return res.status(400).json({message: 'Invalid request'});
        }
        console.log('inside add product');
        const product = await createProduct({
            name,
            imageUrl,
            price,
            mrp,
            status
        });
        

        return res.status(200).json(product);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const getProduct = async (req: express.Request, res: express.Response) => {
    try {
        console.log('inside get product');
        const product = await getProducts();
        

        return res.status(200).json(product);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

// remove product
export const disableProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.body;
        if(!id) {
            return res.status(400).json({message: 'Invalid request'});
        }
        console.log('inside disable product');
        const product = await disableProductById(id);
        return res.status(200).json(product);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
}

// update Product
export const updateProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id,name,imageUrl,price,mrp,status } = req.body;
        if(!id && (!name || !imageUrl || !price || !mrp) ) {
            return res.status(400).json({message: 'Invalid request'});
        }
       
        console.log('inside update product');
        const product = await updateProductById(id,{
            ...(name && {name}),
            ...(imageUrl && {imageUrl}),
            ...(price && {price}),
            ...(mrp && {mrp}),
        });
        

        return res.status(200).json(product);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};
import { drizzle } from 'drizzle-orm/node-postgres';
import { InferInsertModel, InferSelectModel, eq } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import PostgreSQLConnectionSingleton from '../connections/pgConnection';


export const productStatus = pgEnum('status', ["ACTIVE", "INACTIVE"]);

export type ProductDto = {
    name?: string,
    imageUrl?: string,
    price?: number,
    mrp?: number,
};

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    imageUrl: text('imageUrl').notNull(),
    mrp: integer('mrp').notNull(),
    price: integer('price').notNull(),
    status: productStatus('status').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

const pool = PostgreSQLConnectionSingleton.getInstance().getPool();

const db = drizzle(pool);

export const getProducts = async () =>
    await db.select({id: products.id, mrp: products.mrp, name: products.name, imageUrl: products.imageUrl, price: products.price, status: products.status }).from(products);
export const createProduct = async (newProduct: NewProduct) =>
    await db
        .insert(products)
        .values(newProduct)
        .returning({ id: products.id, mrp: products.mrp, name: products.name, imageUrl: products.imageUrl, price: products.price, status: products.status });   
export const disableProductById = async (id: number) =>
    await db
        .update(products)
        .set({ status: 'INACTIVE' })
        .where(eq(products.id, id))
        .returning({ id: products.id, mrp: products.mrp, name: products.name, imageUrl: products.imageUrl, price: products.price, status: products.status });
export const updateProductById = async (id: number, newProduct: ProductDto) =>
    await db
        .update(products)
        .set(newProduct)
        .where(eq(products.id, id))
        .returning({ id: products.id, mrp: products.mrp, name: products.name, imageUrl: products.imageUrl, price: products.price, status: products.status });
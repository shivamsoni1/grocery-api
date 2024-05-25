import { drizzle } from 'drizzle-orm/node-postgres';
import { InferInsertModel, InferModel, InferSelectModel, eq,count } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import PostgreSQLConnectionSingleton from '../connections/pgConnection';
import { products } from './products';


export const inventoryStatus = pgEnum('status', ["READY_FOR_SALE", "DAMAGED"]);

export type InventoryDto ={
    id?: number,
    productId?: number,
    quantity?: number,
    unitCostPrice?: number,
    mrp?: number,

}

export const inventory = pgTable('inventory', {
    id: serial('id').primaryKey(),
    productId: integer('productId').notNull(),
    quantity: integer('quantity').notNull(),
    unitCostPrice: integer('unitCostPrice').notNull(),
    mrp: integer('mrp').notNull(),
    status: inventoryStatus('status').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});

export type Inventory = InferSelectModel<typeof inventory>;
export type NewInventory = InferInsertModel<typeof inventory>;

const pool = PostgreSQLConnectionSingleton.getInstance().getPool();

const db = drizzle(pool);

export const getInventory = async () =>
    await db.select({
        id: inventory.id,
        productId: inventory.productId,
        quantity: inventory.quantity,
        unitCostPrice: inventory.unitCostPrice,
        mrp: inventory.mrp,
        status: inventory.status,
     }).from(inventory);
export const getInventoryItemByPid = async (productId: number) =>   
    await db.select({
        id : inventory.id,
        quantity: inventory.quantity,
     }).from(inventory).where(eq(inventory.productId, productId));
export const getAvailableItems = async () =>
    await db.select({
        id: inventory.id,
        productId: inventory.productId,
        quantity: inventory.quantity,
        status: inventory.status,
        productName: products.name,
        productImageUrl: products.imageUrl,
        productPrice: products.price,
        productMrp: products.mrp,
     }).from(inventory).leftJoin(products,eq(products.id, inventory.productId)).where(eq(inventory.quantity, 0));
export const addInventory = async (newInventory: NewInventory) =>
    await db
        .insert(inventory)
        .values(newInventory)
        .returning({ 
            inventoryId: inventory.id,
            productId: inventory.productId,
            quantity: inventory.quantity,
            unitCostPrice: inventory.unitCostPrice,
            mrp: inventory.mrp,
            status: inventory.status,
        });   
export const updateInventoryById = async (id: number, updatedInventory: InventoryDto) =>
    await db
        .update(inventory)
        .set(updatedInventory)
        .where(eq(inventory.id, id))
        .returning({
            inventoryId: inventory.id,
            productId: inventory.productId,
            quantity: inventory.quantity,
            unitCostPrice: inventory.unitCostPrice,
            mrp: inventory.mrp,
            status: inventory.status,
        });
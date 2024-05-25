import { drizzle } from 'drizzle-orm/node-postgres';
import { InferModel, eq } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { Pool } from 'pg';
import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';


export const productStatus = pgEnum('status', ["ACTIVE", "INACTIVE"]);

export const orderItems = pgTable('orderItems', {
    id: serial('id').primaryKey(),
    orderId: integer('orderId').notNull(),
    productId: integer('productId').notNull(),
    total: integer('total').notNull(),
    mrp: integer('mrp').notNull(),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});
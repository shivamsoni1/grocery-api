import { drizzle } from 'drizzle-orm/node-postgres';
import { InferInsertModel, InferSelectModel, eq } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { Pool } from 'pg';
import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import PostgreSQLConnectionSingleton from '../connections/pgConnection';
import { cart } from './cart';
import { cartItems } from './cartItems';
import{ orderItems} from './orderItems';


export const productStatus = pgEnum('status', ["ACTIVE", "INACTIVE"]);

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    customerId: integer('customerId').notNull(),
    note: text('note').notNull(),
    total: integer('total').notNull(),
    orderedAt: timestamp('orderedAt').defaultNow(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;

const pool = PostgreSQLConnectionSingleton.getInstance().getPool();

const db = drizzle(pool);

export const createOrder = async (cartId:number) =>
    await db.transaction(async (tx) => {
        const cartRes = await tx.select().from(cart).where(eq(cart.id, cartId));
        const cartItemRes = await tx.select().from(cartItems).where(eq(cartItems.cartId, cartId));
        const orderData ={
            customerId: cartRes[0].customerId,
            total: cartRes[0].total,
            note: 'Order placed successfully'
        }
        const orderRes = await tx.insert(orders).values(orderData).returning({ id: orders.id });
        await tx.update(cart).set({orderId: orderRes[0].id }).where(eq(cart.id, cartId));
        const orderItemsData = cartItemRes.map((item:any) => {
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                mrp: item.mrp,
                total: item.total,
                orderId: orderRes[0].id
            }
        })
        await tx.insert(orderItems).values(orderItemsData);

        return orderRes[0];

      });


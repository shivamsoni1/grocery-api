import { drizzle } from 'drizzle-orm/node-postgres';
import { InferInsertModel, InferModel, InferSelectModel, eq } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { customers } from './customers';
import { orders } from './orders';
import { decimal } from 'drizzle-orm/pg-core';
import PostgreSQLConnectionSingleton from '../connections/pgConnection';
import { CartItemDto, NewCartItem, cartItems } from './cartItems';

export type CartDto = {
    id: number,
    total?: number,
};
export const cart = pgTable('cart', {
    id: serial('id').primaryKey(),
    customerId: integer('customerId').notNull().references(()=>customers.id),
    total: integer('total').notNull(),
    orderId: integer('orderId').references(()=> orders.id),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  });

export type Cart = InferSelectModel<typeof cart>;
export type NewCart = InferInsertModel<typeof cart>;

const pool = PostgreSQLConnectionSingleton.getInstance().getPool();

const db = drizzle(pool);

export const addCart = async (newCart: NewCart, cartIem:CartItemDto) =>
    await db.transaction(async (tx) => {
        const res = await tx.insert(cart).values(newCart).returning({ id: cart.id });
        const cartId = res[0].id;
        const item:NewCartItem ={
            ...cartIem,
            cartId,
            total: cartIem.price * cartIem.quantity
        }
        await tx.insert(cartItems).values(item);
      });
export const updateCart = async (newCart: CartDto, cartIem:CartItemDto) =>
    await db.transaction(async (tx) => {
        const res = await tx.update(cart).set(newCart).where(eq(cart.id, newCart.id)).returning({ id: cart.id });
        const cartId = res[0].id;
        const item:NewCartItem ={
            ...cartIem,
            cartId,
            total: cartIem.price * cartIem.quantity
        }
        await tx.insert(cartItems).values(item);
    });

export const getCart = async () =>
    await db.select({id: cart.id, customerId: cart.customerId, total: cart.total, orderId: cart.orderId }).from(cart);

export const getCartById = async (id : number) =>
    await db.select({id: cart.id, customerId: cart.customerId, total: cart.total, orderId: cart.orderId }).from(cart).where(eq(cart.id, id));
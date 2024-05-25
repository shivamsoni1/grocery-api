import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { decimal } from 'drizzle-orm/pg-core';
import { CartDto, cart } from './cart';
import { products } from './products';
import { InferInsertModel, InferSelectModel ,and,eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import PostgreSQLConnectionSingleton from '../connections/pgConnection';
import { type } from 'os';

export type CartItemDto = {
    productId: number, 
    mrp: number,
    price : number,
    quantity : number,
    cartId?: number,
};


export const cartItems = pgTable('cartItems', {
    id: serial('id').primaryKey(),
    cartId: integer('cartId').notNull().references(()=> cart.id),
    productId: integer('productId').notNull().references(()=> products.id),
    mrp: integer('mrp').notNull(),
    price: integer('price').notNull(),
    total: integer('total').notNull(),
    quantity: integer('quantity').notNull(),
    //orderId: integer('orderId').notNull().references(()=> orders.id),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  });


export type CartItem = InferSelectModel<typeof cartItems>;
export type NewCartItem = InferInsertModel<typeof cartItems>;

const pool = PostgreSQLConnectionSingleton.getInstance().getPool();

const db = drizzle(pool);

export const updateCartItem = async (newCart: CartDto, cartIem:CartItemDto) =>
    await db.transaction(async (tx) => {
        const cartRes = await tx.select({id: cart.id, customerId: cart.customerId, total: cart.total, orderId: cart.orderId}).from(cart).where(eq(cart.id, newCart.id));
        const cartItemRes = await tx.select({id: cartItems.id, cartId: cartItems.cartId, productId: cartItems.productId, mrp: cartItems.mrp, price: cartItems.price, total: cartItems.total, quantity: cartItems.quantity}).from(cartItems).where(eq(cartItems.productId, cartIem.productId));
        console.log(cartRes[0].total,cartItemRes[0].total,cartIem.price * cartIem.quantity);
        const data:CartDto = {
            id: cartItemRes[0].cartId,
            total: cartRes[0].total - cartItemRes[0].total + cartIem.price * cartIem.quantity
        }
        const res = await tx.update(cart).set(data).where(eq(cart.id, newCart.id)).returning({ id: cart.id });
        const cartId = res[0].id;
        const item ={
            total: cartIem.price * cartIem.quantity,
            quantity: cartIem.quantity
        }
        await tx.update(cartItems).set(item).where(eq(cartItems.id, cartItemRes[0].id)).returning({ id: cartItems.id });
    });

    export const deleteCartItem = async (cartId: number, productId: number) =>
        await db.transaction(async (tx) => {
            console.log(cartId,productId);
            const cartRes = await tx.select({id: cart.id, customerId: cart.customerId, total: cart.total, orderId: cart.orderId}).from(cart)
            .where(eq(cart.id, cartId));
            console.log(cartRes);
            const cartItemRes = await tx.select({id: cartItems.id, cartId: cartItems.cartId, productId: cartItems.productId, mrp: cartItems.mrp, price: cartItems.price, total: cartItems.total, quantity: cartItems.quantity}).from(cartItems).where(and(eq(cartItems.id,cartId),eq(cartItems.productId, productId)));
            const data:CartDto = {
                id: cartRes[0].id,
                total: cartRes[0].total - cartItemRes[0].total
            }
            await tx.update(cart).set(data).where(eq(cart.id, cartId)).returning({ id: cart.id });
            await tx.delete(cartItems).where(eq(cartItems.id, cartItemRes[0].id));
    });
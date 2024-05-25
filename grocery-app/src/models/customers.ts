import { drizzle } from 'drizzle-orm/node-postgres';
import { InferInsertModel, InferModel, InferSelectModel, eq } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import PostgreSQLConnectionSingleton from '../connections/pgConnection';


export const customers = pgTable('customers', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    mobile: text('mobile').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});

export type Customer = InferSelectModel<typeof customers>;
export type NewCustomer = InferInsertModel<typeof customers>;

const pool = PostgreSQLConnectionSingleton.getInstance().getPool();

const db = drizzle(pool);

export const getCustomer = async () =>
    await db.select({ 
        id: customers.id, 
        name: customers.name, 
        email: customers.email, 
        mobile: customers.mobile
     }).from(customers);
// export const getUserByEmail = async (email: string) =>
//     await db.select().from(users).where(eq(users.email, email));
export const createCustomer = async (newCustomer: NewCustomer) =>
    await db
        .insert(customers)
        .values(newCustomer)
        .returning({ 
            id: customers.id, 
            name: customers.name, 
            email: customers.email, 
            mobile: customers.mobile
         });
export const updateCustomerById = async (id: number, updatedCustomer: Customer) =>
    await db
        .update(customers)
        .set(updatedCustomer)
        .where(eq(customers.id, id))
        .returning({
            id: customers.id, 
            name: customers.name, 
            email: customers.email, 
            mobile: customers.mobile
         });
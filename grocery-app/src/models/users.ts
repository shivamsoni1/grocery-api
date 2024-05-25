import { drizzle } from 'drizzle-orm/node-postgres';
import { InferInsertModel,InferSelectModel, eq } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import PostgreSQLConnectionSingleton from '../connections/pgConnection';


export const userRole = pgEnum('role', ['ADMIN']);

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    role: userRole('role').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

const pool = PostgreSQLConnectionSingleton.getInstance().getPool();

const db = drizzle(pool);

export const getUsers = async () =>
    await db.select({ id: users.id, username: users.name, email: users.email }).from(users);
export const getUserByEmail = async (email: string) =>
    await db.select().from(users).where(eq(users.email, email));
export const createUser = async (newUser: NewUser) =>
    await db
        .insert(users)
        .values(newUser)
        .returning({ id: users.id, username: users.name, email: users.email });
export const updateUserById = async (id: number, updatedUser: User) =>
    await db
        .update(users)
        .set(updatedUser)
        .where(eq(users.id, id))
        .returning({ id: users.id, username: users.name, email: users.email, role: users.role});
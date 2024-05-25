-- -------------------------------------------------------------
-- TablePlus 6.0.0(550)
--
-- https://tableplus.com/
--
-- Database: grocery_app
-- Generation Time: 2024-05-23 14:03:18.9790
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cart_id_seq;

-- Table Definition
CREATE TABLE "public"."cart" (
    "id" int4 NOT NULL DEFAULT nextval('cart_id_seq'::regclass),
    "customerId" int4 NOT NULL,
    "total" float8 NOT NULL,
    "orderId" int4,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "cartItems_id_seq";

-- Table Definition
CREATE TABLE "public"."cartItems" (
    "id" int4 NOT NULL DEFAULT nextval('"cartItems_id_seq"'::regclass),
    "cartId" int4,
    "productId" int4,
    "mrp" float8,
    "price" float8,
    "total" float8,
    "quantity" int4,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS customers_id_seq;

-- Table Definition
CREATE TABLE "public"."customers" (
    "id" int4 NOT NULL DEFAULT nextval('customers_id_seq'::regclass),
    "name" varchar NOT NULL,
    "email" varchar,
    "mobile" varchar NOT NULL,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS inventory_id_seq;
DROP TYPE IF EXISTS "public"."inventoryStatus";
CREATE TYPE "public"."inventoryStatus" AS ENUM ('READY_FOR_SALE', 'DAMAGED');

-- Table Definition
CREATE TABLE "public"."inventory" (
    "id" int4 NOT NULL DEFAULT nextval('inventory_id_seq'::regclass),
    "productId" int4 NOT NULL,
    "quantity" int4 NOT NULL,
    "unitCostPrice" int4 NOT NULL,
    "mrp" int4 NOT NULL,
    "status" "public"."inventoryStatus" NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "updatedAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "orderItems_id_seq";

-- Table Definition
CREATE TABLE "public"."orderItems" (
    "id" int4 NOT NULL DEFAULT nextval('"orderItems_id_seq"'::regclass),
    "orderId" int4 NOT NULL,
    "productId" int4 NOT NULL,
    "mrp" int4 NOT NULL,
    "quantity" int4 NOT NULL,
    "price" int4 NOT NULL,
    "total" int4 NOT NULL,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS orders_id_seq;

-- Table Definition
CREATE TABLE "public"."orders" (
    "id" int4 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    "customerId" int4 NOT NULL,
    "total" int4 NOT NULL,
    "note" varchar,
    "orderedAt" timestamp DEFAULT now(),
    "created_at" timestamp DEFAULT now(),
    "updatedAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS products_id_seq;
DROP TYPE IF EXISTS "public"."productStatus";
CREATE TYPE "public"."productStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- Table Definition
CREATE TABLE "public"."products" (
    "id" int4 NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    "name" varchar NOT NULL,
    "imageUrl" varchar NOT NULL,
    "mrp" int4 NOT NULL,
    "price" int4 NOT NULL,
    "status" "public"."productStatus" NOT NULL,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;
DROP TYPE IF EXISTS "public"."userRole";
CREATE TYPE "public"."userRole" AS ENUM ('ADMIN');

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "role" "public"."userRole" NOT NULL,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."cart" ADD FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id");
ALTER TABLE "public"."cart" ADD FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id");
ALTER TABLE "public"."cartItems" ADD FOREIGN KEY ("cartId") REFERENCES "public"."cart"("id");
ALTER TABLE "public"."cartItems" ADD FOREIGN KEY ("productId") REFERENCES "public"."products"("id");
ALTER TABLE "public"."inventory" ADD FOREIGN KEY ("productId") REFERENCES "public"."products"("id");
ALTER TABLE "public"."orderItems" ADD FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id");
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id");

// db.ts
import { Pool } from 'pg';

class PostgreSQLConnectionSingleton {
  private static instance: PostgreSQLConnectionSingleton;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
        //connectionString: "postgres://postgres:postgres@localhost:5432/grocery_app?password=spsrlm14ss"
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432'),
      });
  }

  public static getInstance(): PostgreSQLConnectionSingleton {
    if (!PostgreSQLConnectionSingleton.instance) {
        PostgreSQLConnectionSingleton.instance = new PostgreSQLConnectionSingleton();
    }
    return PostgreSQLConnectionSingleton.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }
}

export default PostgreSQLConnectionSingleton;

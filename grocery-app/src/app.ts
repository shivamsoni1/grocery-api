import { Express } from 'express';
import PostgreSQLConnectionSingleton from './connections/pgConnection'

export const buildApp = function (app: Express) {
  PostgreSQLConnectionSingleton.getInstance();
};

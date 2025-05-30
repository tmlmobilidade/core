/* * */

import { type DeleteResult as MongoDeleteResult, type InsertOneResult as MongoInsertOneResult, type UpdateResult as MongoUpdateResult } from 'mongodb';

/* * */

export type DeleteResult = MongoDeleteResult;
export type InsertOneResult<T> = MongoInsertOneResult<T>;
export type UpdateResult = MongoUpdateResult;

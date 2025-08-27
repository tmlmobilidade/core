/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ride } from '@tmlmobilidade/types';
import { Filter } from 'mongodb';

interface MatchStage<T> { $match: Filter<T> }
interface ProjectStage<T> { $project: Partial<Record<keyof T, 0 | 1>> }
interface GroupStage {
	$group: {
		[key: string]: any
		_id: Record<string, any> | string
	}
}
interface SortStage<T> { $sort: Partial<Record<keyof T, -1 | 1>> }
interface LimitStage { $limit: number }
interface SkipStage { $skip: number }

type AggregationStage<T> =
  | GroupStage
  | LimitStage
  | MatchStage<T>
  | ProjectStage<T>
  | SkipStage
  | SortStage<T>;

export type AggregationPipeline<T> = AggregationStage<T>[];

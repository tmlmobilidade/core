/* eslint-disable perfectionist/sort-classes */
import { MongoConnector } from '@tmlmobilidade/connectors';
import { HttpException, HttpStatus } from '@tmlmobilidade/lib';
import {
	Census,
	District,
	DistrictDocument,
	Locality,
	LocalityDocument,
	Location,
	LocationCollections,
	Municipality,
	MunicipalityDocument,
	Parish,
	ParishDocument,
} from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Collection, Filter, FindOptions, Sort, WithId } from 'mongodb';

/* * */

class LocationsClass {
	private static _instance: LocationsClass;
	private collections: { [K in keyof LocationCollections]: Collection<LocationCollections[K]> };

	private mongoConnector: MongoConnector;

	private constructor() {
		this.collections = {} as typeof this.collections;
	}

	public static async getInstance() {
		if (!this._instance) {
			const instance = new LocationsClass();
			await instance.connect();
			this._instance = instance;
		}
		return this._instance;
	}

	/*  Public Methods */

	/*  Find All */
	public findCensus = async (filter: Filter<Census>, perPage?: number, page?: number, sort?: Sort): Promise<WithId<Census>[]> =>
		await this.findMany(this.collections.census, filter, perPage, page, sort);

	public findDistricts = async (filter: Filter<DistrictDocument>, perPage?: number, page?: number, sort?: Sort): Promise<District[]> => {
		const documents = await this.findMany(this.collections.districts, filter, perPage, page, sort);
		return documents.map(doc => this.transformDocument<DistrictDocument, District>(doc));
	};

	public findLocalities = async (filter: Filter<LocalityDocument>, perPage?: number, page?: number, sort?: Sort): Promise<Locality[]> => {
		const documents = await this.findMany(this.collections.localities, filter, perPage, page, sort);
		return documents.map(doc => this.transformDocument<LocalityDocument, Locality>(doc));
	};

	public findMunicipalities = async (filter: Filter<MunicipalityDocument>, perPage?: number, page?: number, sort?: Sort): Promise<Municipality[]> => {
		const documents = await this.findMany(this.collections.municipalities, filter, perPage, page, sort);
		return documents.map(doc => this.transformDocument<MunicipalityDocument, Municipality>(doc));
	};

	public findParishes = async (filter: Filter<ParishDocument>, perPage?: number, page?: number, sort?: Sort): Promise<Parish[]> => {
		const documents = await this.findMany(this.collections.parishes, filter, perPage, page, sort);
		return documents.map(doc => this.transformDocument<ParishDocument, Parish>(doc));
	};

	/*  Find By Id */
	public findCensusById = async (id: string, options?: FindOptions): Promise<null | WithId<Census>> =>
		await this.findById(this.collections.census, id, options);

	public findDistrictById = async (id: string, options?: FindOptions): Promise<District | null> => {
		const document = await this.findById(this.collections.districts, id, options);
		return document ? this.transformDocument<DistrictDocument, District>(document) : null;
	};

	public findLocalityById = async (id: string, options?: FindOptions): Promise<Locality | null> => {
		const document = await this.findById(this.collections.localities, id, options);
		return document ? this.transformDocument<LocalityDocument, Locality>(document) : null;
	};

	public findMunicipalityById = async (id: string, options?: FindOptions): Promise<Municipality | null> => {
		const document = await this.findById(this.collections.municipalities, id, options);
		return document ? this.transformDocument<MunicipalityDocument, Municipality>(document) : null;
	};

	public findParishById = async (id: string, options?: FindOptions): Promise<null | Parish> => {
		const document = await this.findById(this.collections.parishes, id, options);
		return document ? this.transformDocument<ParishDocument, Parish>(document) : null;
	};

	/*  Find By Geo */
	public findMunicipalitiesByGeo = async (lat: number, lon: number): Promise<Municipality | null> => {
		const document = await this.findOne(this.collections.municipalities, this.geoFilter(lat, lon));
		return document ? this.transformDocument<MunicipalityDocument, Municipality>(document) : null;
	};

	public findParishesByGeo = async (lat: number, lon: number): Promise<null | Parish> => {
		const document = await this.findOne(this.collections.parishes, this.geoFilter(lat, lon));
		return document ? this.transformDocument<ParishDocument, Parish>(document) : null;
	};

	public findDistrictsByGeo = async (lat: number, lon: number): Promise<District | null> => {
		const document = await this.findOne(this.collections.districts, this.geoFilter(lat, lon));
		return document ? this.transformDocument<DistrictDocument, District>(document) : null;
	};

	public findLocalitiesByGeo = async (lat: number, lon: number): Promise<Locality | null> => {
		const document = await this.findOne(this.collections.localities, this.geoFilter(lat, lon));
		return document ? this.transformDocument<LocalityDocument, Locality>(document) : null;
	};

	public findCensusByGeo = async (lat: number, lon: number): Promise<null | WithId<Census>> =>
		await this.findOne(this.collections.census, this.geoFilter(lat, lon));

	public async findLocationByGeo(lat: number, lon: number, { census = false }: { census?: boolean } = {}): Promise<Location> {
		if (!lat || !lon) throw new HttpException(HttpStatus.BAD_REQUEST, 'Missing latitude or longitude');

		const municipality = await this.findMunicipalitiesByGeo(lat, lon);
		const parish = await this.findParishesByGeo(lat, lon);
		const district = await this.findDistrictsByGeo(lat, lon);
		const locality = await this.findLocalitiesByGeo(lat, lon);
		const _census = census ? await this.findCensusByGeo(lat, lon) : undefined;

		return {
			census: _census,
			district: district,
			latitude: lat,
			locality: locality,
			longitude: lon,
			municipality: municipality,
			parish: parish,
		};
	};

	/*  Private Methods - Database Connection */

	private async connect() {
		const dbUri = process.env.TML_INTERFACE_LOCATIONS;
		if (!dbUri) throw new Error(`Missing TML_INTERFACE_LOCATIONS environment variable`);

		try {
			this.mongoConnector = new MongoConnector(dbUri);
			await this.mongoConnector.connect();
			const db = this.mongoConnector.client.db('production');

			this.collections = {
				census: db.collection<Census>('census'),
				districts: db.collection<DistrictDocument>('districts'),
				localities: db.collection<LocalityDocument>('localities'),
				municipalities: db.collection<MunicipalityDocument>('municipalities'),
				parishes: db.collection<ParishDocument>('parishes'),
			};
		}
		catch (error) {
			throw new Error(`Error connecting to MongoDB`, { cause: error });
		}
	}

	/*  Private Methods - Database Operations */

	private async findById<T extends Document>(collection: Collection<T>, id: string, options?: FindOptions): Promise<null | WithId<T>> {
		return collection.findOne({ _id: { $eq: id } } as Filter<T>, options);
	}

	private async findMany<T extends Document>(collection: Collection<T>, filter: Filter<T> = {}, perPage?: number, page?: number, sort?: Sort): Promise<WithId<T>[]> {
		const query = collection.find(filter);
		if (perPage) query.limit(perPage);
		if (page && perPage) query.skip(perPage * (page - 1));
		if (sort) query.sort(sort);
		return query.toArray();
	}

	private async findOne<T extends Document>(collection: Collection<T>, filter: Filter<T>): Promise<null | WithId<T>> {
		return collection.findOne(filter);
	}

	private geoFilter = (lat: number, lon: number) => ({ geometry: { $geoIntersects: { $geometry: { coordinates: [lon, lat], type: 'Point' } } } });

	private transformDocument<T extends Omit<LocationCollections[keyof LocationCollections], 'census'>, U = District | Locality | Municipality | Parish>(doc: WithId<T>): U {
		return {
			_id: doc._id,
			...doc.properties,
			geojson: {
				geometry: doc.geometry,
				properties: {},
				type: doc.type,
			},
		} as U;
	}
}

/* * */

export const locations = AsyncSingletonProxy(LocationsClass);

import { CreateAgencyDto, CreateAlertDto, CreateMunicipalityDto, CreateOrganizationDto, CreateRoleDto, CreateStopDto, CreateUserDto, CreateZoneDto, Email, Permission, Stop, User } from '@tmlmobilidade/types';
import { getUnixTimestamp, validateOperationalDate } from '@tmlmobilidade/utils';

export const mockPermissions: Permission<unknown>[] = [
	// Write
	{ action: 'write', scope: 'stop' } as Permission<Stop>,
	{ action: 'write', scope: 'user' } as Permission<User>,
	// Read
	{ action: 'read', scope: 'user' } as Permission<User>,
	{ action: 'read', scope: 'stop' } as Permission<Stop>,
	// With resource
	{ action: 'read', resource: { code: ['111'] }, scope: 'stop' } as Permission<Stop>,
	{ action: 'read', resource: { code: ['222'] }, scope: 'stop' } as Permission<Stop>,
	{ action: 'write', resource: { code: ['111'] }, scope: 'stop' } as Permission<Stop>,

];

export const mockRoles: CreateRoleDto[] = [
	{ name: 'writer', permissions: mockPermissions.slice(0, 1) },
	{ name: 'reader', permissions: mockPermissions.slice(3, 4) },
];

export const mockUsers: CreateUserDto[] = [
	{
		email: 'writer@example.com' as Email,
		first_name: 'Writer',
		last_name: 'User',
		organization_ids: [
			'1',
			'2',
		],
		permissions: [],
		phone: '1234567890',
		role_ids: [
			'writer',
		],
		session_ids: [],
		verification_token_ids: [],
	},
	{
		avatar: '',
		bio: '',
		email: 'reader@example.com' as Email,
		first_name: 'Reader',
		last_name: 'User',
		organization_ids: [],
		permissions: [
			mockPermissions[4],
		],
		phone: '0987654321',
		role_ids: [
			'reader',
		],
		session_ids: [],
		verification_token_ids: [],
	},
	{
		avatar: '',
		bio: '',
		email: 'permission@example.com' as Email,
		first_name: 'Permission',
		last_name: 'User',
		organization_ids: [],
		permissions: [
			mockPermissions[1],
		],
		phone: '1234567890',
		role_ids: [],
		session_ids: [],
		verification_token_ids: [],
	},

];

export const mockZones: CreateZoneDto[] = [
	{
		border_color: '#cf7508',
		border_opacity: 0.5,
		border_width: 3,
		code: '1507',
		fill_color: '#cf7508',
		fill_opacity: 0.2,
		geojson: {
			geometry: {
				coordinates: [
					[
						[
							[
								-8.965806944622736,
								38.72688987365539,
							],
							[
								-8.96621857862725,
								38.72767872130188,
							],
						],
					],
					[
						[
							[
								-8.68484270610704,
								38.82667216470655,
							],
							[
								-8.68502407329156,
								38.82668395423508,
							],
						],
					],
				],
				type: 'MultiPolygon',
			},
			properties: {},
			type: 'Feature',
		},
		is_locked: false,
		name: 'Montijo',
	},
	{
		border_color: '#1ef916',
		border_opacity: 0.5,
		border_width: 3,
		code: '1502',
		fill_color: '#1fff17',
		fill_opacity: 0.2,
		geojson: {
			geometry: {
				coordinates: [
					[
						[
							[
								-8.965806944622736,
								38.72688987365539,
							],
							[
								-8.96621857862725,
								38.72767872130188,
							],
						],
					],
					[
						[
							[
								-8.68484270610704,
								38.82667216470655,
							],
							[
								-8.68502407329156,
								38.82668395423508,
							],
						],
					],
				],
				type: 'MultiPolygon',
			},
			properties: {},
			type: 'Feature',
		},
		is_locked: false,
		name: 'Montijo',
	},
];

export const mockStops: CreateStopDto[] = [
	{
		_id: '010101',
		bench_status: 'unknown',
		comments: [],
		connections: [],
		district_id: '1504',
		docking_bay_type: 'unknown',
		electricity_status: 'unknown',
		facilities: [],
		flag_status: 'unknown',
		jurisdiction: 'unknown',
		latitude: 38.7487576,
		lighting_status: 'unknown',
		locality_id: 'AHSNX',
		longitude: -8.9671055,
		municipality_id: '649b4cce0ac399a0115319e3',
		name: 'ALCOCHETE (R LIBERDADE) ESCOLA VALBOM',
		operational_status: 'active',
		pavement_type: 'unknown',
		pole_status: 'unknown',
		road_type: 'unknown',
		shelter_status: 'unknown',
		short_name: 'Escola Básica n.º 2 de Alcochete (Valbom)',
		sidewalk_type: 'unknown',
		tts_name: 'Alcochete ( Rua Liberdade ) Escola Valbom',
	},
	{
		_id: '020202',
		bench_status: 'unknown',
		comments: [],
		connections: [],
		district_id: '1504',
		docking_bay_type: 'unknown',
		electricity_status: 'unknown',
		facilities: [],
		flag_status: 'unknown',
		jurisdiction: 'unknown',
		latitude: 38.7487576,
		lighting_status: 'unknown',
		locality_id: 'AHSNX',
		longitude: -8.9671055,
		municipality_id: '649b4cce0ac399a0115319e3',
		name: 'ALCOCHETE (R LIBERDADE) ESCOLA VALBOM',
		operational_status: 'active',
		pavement_type: 'unknown',
		pole_status: 'unknown',
		road_type: 'unknown',
		shelter_status: 'unknown',
		short_name: 'Escola Básica n.º 2 de Alcochete (Valbom)',
		sidewalk_type: 'unknown',
		tts_name: 'Alcochete ( Rua Liberdade ) Escola Valbom',
	},
];

export const mockOrganizations: CreateOrganizationDto[] = [
	{
		code: '1',
		name: 'Organization 1',
	},
	{
		code: '2',
		name: 'Organization 2',
	},
];

export const mockMunicipalities: CreateMunicipalityDto[] = [
	{
		border_color: '#ffffff',
		border_opacity: 0.5,
		border_width: 3,
		code: '1115',
		district: '11',
		fill_color: '#611919',
		fill_opacity: 0.5,
		geojson: {
			geometry: {
				coordinates: [
					[
						[
							-9.23542624099997,
							38.79627920200005,
						],
						[
							-9.235565959999974,
							38.79641254500007,
						],

					],
				],
				type: 'Polygon',
			},
			properties: {},
			type: 'Feature',
		},
		is_locked: false,
		name: 'Amadora',
		prefix: '03',
		region: 'PT170',
	},
	{
		border_color: '#ffffff',
		border_opacity: 0.5,
		border_width: 3,
		code: '1504',
		district: '15',
		fill_color: '#ad6666',
		fill_opacity: 0.5,
		geojson: {
			geometry: {
				coordinates: [
					[
						[
							-9.036244457999942,
							38.68370353600005,
						],
						[
							-9.03532428099993,
							38.68390666000005,
						],
					],
				],
				type: 'Polygon',
			},
			properties: {},
			type: 'Feature',
		},
		is_locked: false,
		name: 'Barreiro',
		prefix: '04',
		region: 'PT170',
	},
];

export const mockAgencies: CreateAgencyDto[] = [
	{
		code: '1',
		email: 'agency1@example.com',
		fare_url: '',
		is_locked: false,
		lang: 'pt',
		name: 'Agency 1',
		operation_start_date: validateOperationalDate('20240101'),
		phone: '1234567890',
		price_per_km: 0,
		timezone: 'Europe/Lisbon',
		total_vkm_per_year: 0,
		url: 'https://agency1.example.com',
	},
	{
		code: '2',
		email: 'agency2@example.com',
		fare_url: '',
		is_locked: false,
		lang: 'pt',
		name: 'Agency 2',
		operation_start_date: validateOperationalDate('20240101'),
		phone: '1234567890',
		price_per_km: 0,
		timezone: 'Europe/Lisbon',
		total_vkm_per_year: 0,
		url: 'https://agency2.example.com',
	},
];

export const mockAlerts: CreateAlertDto[] = [
	{
		active_period_end_date: undefined,
		active_period_start_date: getUnixTimestamp(),
		cause: 'ACCIDENT',
		created_by: '1',
		description: '',
		effect: 'SIGNIFICANT_DELAYS',
		file_id: '',
		info_url: '',
		modified_by: '1',
		municipality_ids: [
			'649b4cce0ac399a0115319e3',
		],
		publish_end_date: getUnixTimestamp(),
		publish_start_date: getUnixTimestamp(),
		publish_status: 'PUBLISHED',
		reference_type: 'STOP',
		references: [{
			child_ids: ['1'],
			parent_id: '1',
		}],
		title: 'Alert 1',
		type: 'PLANNED',
	},
	{
		active_period_end_date: getUnixTimestamp(),
		active_period_start_date: getUnixTimestamp(),
		cause: 'ACCIDENT',
		created_by: '1',
		description: '',
		effect: 'SIGNIFICANT_DELAYS',
		file_id: '',
		info_url: '',
		modified_by: '1',
		municipality_ids: [
			'649b4cce0ac399a0115319e3',
		],
		publish_end_date: getUnixTimestamp(),
		publish_start_date: getUnixTimestamp(),
		publish_status: 'PUBLISHED',
		reference_type: 'LINE',
		references: [{
			child_ids: ['1'],
			parent_id: '1',
		}],
		title: 'Alert 2',
		type: 'PLANNED',
	},
	{
		active_period_end_date: getUnixTimestamp(),
		active_period_start_date: getUnixTimestamp(),
		cause: 'ACCIDENT',
		created_by: '1',
		description: '',
		effect: 'SIGNIFICANT_DELAYS',
		file_id: '',
		info_url: '',
		modified_by: '1',
		municipality_ids: [
			'649b4cce0ac399a0115319e3',
		],
		publish_end_date: getUnixTimestamp(),
		publish_start_date: getUnixTimestamp(),
		publish_status: 'PUBLISHED',
		reference_type: 'AGENCY',
		references: [{
			child_ids: ['1'],
			parent_id: '1',
		}],
		title: 'Alert 3',
		type: 'PLANNED',
	},
];

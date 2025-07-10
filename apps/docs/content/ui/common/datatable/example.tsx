'use client';

import { ComponentWrapper, DataTable, DataTableColumn, Pane } from '@tmlmobilidade/ui';

interface SampleObject {
	_id: string
	publish_status: string
	title: string
	title2: string
	title3: string
}

const sampleData: SampleObject[] = [
	{ _id: '1', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '2', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '3', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '4', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '5', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '6', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '7', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '8', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '9', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '10', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '11', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '12', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '13', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '14', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '15', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '16', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '17', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '18', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '19', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
	{ _id: '20', publish_status: 'published', title: 'Sample Title 1', title2: 'Sample Title 1', title3: 'Sample Title 1' },
];

export default function DatatableExample() {
//

	const columns: DataTableColumn<SampleObject>[] = [
		{ accessor: '_id', title: 'Estado', width: 350 },
		{ accessor: 'title', title: 'Título', width: 350 },
		{ accessor: 'publish_status', title: 'Título', width: 350 },
		{ accessor: 'title2', title: 'Título', width: 350 },
		{ accessor: 'title3', title: 'Título', width: 350 },
	];

	return (
		<ComponentWrapper>
			{/* <AppProvider> */}
			{/* <AppWrapper> */}
			<Pane>
				<DataTable
					columns={columns}
					records={sampleData}
					rowIdAccessor="_id"
				/>
			</Pane>
			{/* </AppWrapper> */}
			{/* </AppProvider> */}
		</ComponentWrapper>
	);
}

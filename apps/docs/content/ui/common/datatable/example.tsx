'use client';

import { ComponentWrapper, DataTable, DataTableColumn } from '@tmlmobilidade/ui';

interface SampleObject {
	_id: string
	publish_status: string
	title: string
}

const sampleData: SampleObject[] = [
	{
		_id: 'ABC',
		publish_status: 'published',
		title: 'Sample Title 1',
	},
	{
		_id: 'DEF',
		publish_status: 'published',
		title: 'Sample Title 1',
	},
	{
		_id: 'GHI',
		publish_status: 'published',
		title: 'Sample Title 1',
	},
	{
		_id: 'JKL',
		publish_status: 'published',
		title: 'Sample Title 1',
	},
	{
		_id: 'MNO',
		publish_status: 'published',
		title: 'Sample Title 1',
	},
];

export default function DatatableExample() {
//

	const columns: DataTableColumn<SampleObject>[] = [
		{ accessor: '_id', title: 'Estado', width: 150 },
		{ accessor: 'title', title: 'Título', width: 400 },
		{ accessor: 'publish_status', title: 'Título', width: 400 },
	];

	return (
		// <ComponentWrapper>
		<DataTable
			columns={columns}
			records={sampleData}
			rowIdAccessor="_id"
			title="Título"
		/>
		// </ComponentWrapper>
	);
}

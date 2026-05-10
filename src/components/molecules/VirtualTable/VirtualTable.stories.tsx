import type { Meta, StoryObj } from '@storybook/react';
import VirtualTable from './VirtualTable';
import type { ColumnData } from '../Table/Table';

const meta = {
	title: 'Molecules/VirtualTable',
	component: VirtualTable,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A highly performant data table that uses `@tanstack/react-virtual` to render thousands of rows by only rendering items visible in the scroll viewport. Implements Challenge B.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof VirtualTable>;

export default meta;
type Story = StoryObj<typeof meta>;

interface LogEntry {
	id: number;
	timestamp: string;
	level: string;
	message: string;
	source: string;
}

const generateLogs = (count: number): LogEntry[] => {
	const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
	const sources = ['api-gateway', 'auth-service', 'billing-engine', 'web-client'];
	const messages = [
		'User logged in successfully',
		'Failed to fetch usage data',
		'Rate limit exceeded',
		'Invoice generated',
		'Subscription updated',
		'Database connection timeout',
	];

	return Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
		level: levels[Math.floor(Math.random() * levels.length)],
		source: sources[Math.floor(Math.random() * sources.length)],
		message: messages[Math.floor(Math.random() * messages.length)],
	}));
};

const LOG_COLUMNS: ColumnData<LogEntry>[] = [
	{ title: 'ID', fieldName: 'id', width: '80px', fieldVariant: 'title' },
	{
		title: 'Level',
		width: '100px',
		render: (row) => {
			const colors: Record<string, string> = {
				INFO: '#2563eb',
				WARN: '#d97706',
				ERROR: '#dc2626',
				DEBUG: '#4b5563',
			};
			return (
				<span
					className='text-xs font-semibold px-2 py-0.5 rounded'
					style={{ backgroundColor: `${colors[row.level]}15`, color: colors[row.level] }}>
					{row.level}
				</span>
			);
		},
	},
	{ title: 'Source', fieldName: 'source', width: '150px' },
	{ title: 'Message', fieldName: 'message', flex: 1 },
	{
		title: 'Timestamp',
		width: '200px',
		align: 'right',
		render: (row) => new Date(row.timestamp).toLocaleString(),
	},
];

export const ThousandRows: Story = {
	args: {
		columns: LOG_COLUMNS as ColumnData<any>[],
		data: generateLogs(1000),
		rowHeight: 44,
	},
};

export const TenThousandRows: Story = {
	args: {
		columns: LOG_COLUMNS as ColumnData<any>[],
		data: generateLogs(10000),
		rowHeight: 44,
	},
};

import type { Meta, StoryObj } from '@storybook/react';
import FlexpriceTable, { ColumnData } from './Table';

/**
 * Main table component used for customers, invoices, and subscriptions.
 * Supports typed columns, custom renderers, row actions, and empty/loading states.
 */
const meta = {
	title: 'Molecules/DataTable',
	component: FlexpriceTable,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Core data table with typed columns, custom cells, and empty/loading states.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof FlexpriceTable>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Customer {
	id: string;
	name: string;
	email: string;
	plan: string;
	mrr: string;
	status: string;
}

const MOCK_CUSTOMERS: Customer[] = [
	{ id: 'cust_001', name: 'Acme Corp', email: 'billing@acme.io', plan: 'Enterprise', mrr: '$4,200', status: 'Active' },
	{ id: 'cust_002', name: 'Globex Inc', email: 'accounts@globex.com', plan: 'Growth', mrr: '$850', status: 'Active' },
	{ id: 'cust_003', name: 'Initech LLC', email: 'fin@initech.net', plan: 'Starter', mrr: '$99', status: 'Trialing' },
	{ id: 'cust_004', name: 'Umbrella Corp', email: 'billing@umbrella.com', plan: 'Enterprise', mrr: '$12,000', status: 'Active' },
	{ id: 'cust_005', name: 'Stark Industries', email: 'finance@stark.io', plan: 'Growth', mrr: '$1,200', status: 'Cancelled' },
];

const STATUS_COLORS: Record<string, string> = {
	Active: '#16a34a',
	Trialing: '#2563eb',
	Cancelled: '#dc2626',
};

const CUSTOMER_COLUMNS: ColumnData<Customer>[] = [
	{ title: 'Customer', fieldName: 'name', fieldVariant: 'title' },
	{ title: 'Email', fieldName: 'email' },
	{ title: 'Plan', fieldName: 'plan' },
	{ title: 'MRR', fieldName: 'mrr', align: 'right' },
	{
		title: 'Status',
		render: (row) => (
			<span
				style={{
					color: STATUS_COLORS[row.status] ?? '#57646e',
					backgroundColor: (STATUS_COLORS[row.status] ?? '#57646e') + '18',
				}}
				className='text-xs font-medium px-2 py-0.5 rounded-full'>
				{row.status}
			</span>
		),
	},
];

interface Invoice {
	id: string;
	customer: string;
	amount: string;
	date: string;
	status: string;
}

const MOCK_INVOICES: Invoice[] = [
	{ id: 'inv_001', customer: 'Acme Corp', amount: '$4,200.00', date: 'May 1, 2025', status: 'Paid' },
	{ id: 'inv_002', customer: 'Globex Inc', amount: '$850.00', date: 'May 1, 2025', status: 'Draft' },
	{ id: 'inv_003', customer: 'Initech LLC', amount: '$99.00', date: 'Apr 28, 2025', status: 'Void' },
];

export const Customers: Story = {
	args: {
		columns: CUSTOMER_COLUMNS as ColumnData<any>[],
		data: MOCK_CUSTOMERS,
		onRowClick: (row) => console.log('Row clicked:', row),
	},
};

export const Invoices: Story = {
	args: {
		columns: [
			{ title: 'Invoice ID', fieldName: 'id', fieldVariant: 'title' },
			{ title: 'Customer', fieldName: 'customer' },
			{ title: 'Amount', fieldName: 'amount', align: 'right' },
			{ title: 'Date', fieldName: 'date' },
			{
				title: 'Status',
				render: (row: Invoice) => {
					const colors: Record<string, string> = { Paid: '#16a34a', Draft: '#2563eb', Void: '#dc2626' };
					return (
						<span className='text-xs font-medium' style={{ color: colors[row.status] ?? '#57646e' }}>
							● {row.status}
						</span>
					);
				},
			},
		] as ColumnData<any>[],
		data: MOCK_INVOICES,
	},
};

export const EmptyState: Story = {
	args: {
		columns: CUSTOMER_COLUMNS as ColumnData<any>[],
		data: [],
		showEmptyRow: true,
	},
};

export const LoadingSkeleton: Story = {
	args: { columns: [], data: [] },
	render: () => {
		const skeletonRows = Array.from({ length: 5 }, (_, i) => ({
			id: `skeleton_${i}`,
			name: '',
			email: '',
			plan: '',
			mrr: '',
			status: '',
		}));
		const skeletonColumns: ColumnData<any>[] = [
			{
				title: 'Customer',
				render: () => <div className='h-4 bg-gray-200 rounded animate-pulse w-32' />,
			},
			{
				title: 'Email',
				render: () => <div className='h-4 bg-gray-200 rounded animate-pulse w-48' />,
			},
			{
				title: 'Plan',
				render: () => <div className='h-4 bg-gray-200 rounded animate-pulse w-20' />,
			},
			{
				title: 'MRR',
				render: () => <div className='h-4 bg-gray-200 rounded animate-pulse w-16' />,
				align: 'right',
			},
			{
				title: 'Status',
				render: () => <div className='h-4 bg-gray-200 rounded animate-pulse w-16' />,
			},
		];
		return <FlexpriceTable columns={skeletonColumns} data={skeletonRows} />;
	},
};

export const NoBorderVariant: Story = {
	args: {
		columns: CUSTOMER_COLUMNS as ColumnData<any>[],
		data: MOCK_CUSTOMERS.slice(0, 3),
		variant: 'no-bordered',
	},
};

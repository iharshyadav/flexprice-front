import type { Meta, StoryObj } from '@storybook/react';

import MetricCard from './MetricCard';

/**
 * KPI card used on the dashboard.
 * Displays a formatted metric value with optional up/down trend indicator.
 */
const meta = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'KPI card used on the FlexPrice dashboard. Displays a label, formatted value, and optional trend indicator.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text', description: 'Metric label' },
		value: { control: 'number', description: 'Numeric value' },
		currency: { control: 'text', description: 'ISO currency code (e.g. USD)' },
		isPercent: { control: 'boolean' },
		showChangeIndicator: { control: 'boolean' },
		isNegative: { control: 'boolean' },
	},
	args: {
		title: 'Monthly Revenue',
		value: 12450.5,
		currency: 'USD',
		isPercent: false,
		showChangeIndicator: false,
		isNegative: false,
	},
	decorators: [
		(Story) => (
			<div className='w-72'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Revenue: Story = {
	args: {
		title: 'Monthly Revenue',
		value: 48250.75,
		currency: 'USD',
		showChangeIndicator: true,
		isNegative: false,
	},
};

export const PositiveTrend: Story = {
	args: {
		title: 'Active Subscriptions',
		value: 1248,
		showChangeIndicator: true,
		isNegative: false,
	},
};

export const NegativeTrend: Story = {
	args: {
		title: 'Churn Rate',
		value: 3.4,
		isPercent: true,
		showChangeIndicator: true,
		isNegative: true,
	},
};

export const PercentMetric: Story = {
	args: {
		title: 'Trial Conversion',
		value: 24.8,
		isPercent: true,
		showChangeIndicator: true,
		isNegative: false,
	},
};

export const PlainNumber: Story = {
	args: {
		title: 'Total Customers',
		value: 3891,
		showChangeIndicator: false,
	},
};

export const DashboardGrid: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-4 p-4'>
			<MetricCard title='MRR' value={48250.75} currency='USD' showChangeIndicator isNegative={false} />
			<MetricCard title='Active Subscriptions' value={1248} showChangeIndicator isNegative={false} />
			<MetricCard title='Churn Rate' value={3.4} isPercent showChangeIndicator isNegative />
			<MetricCard title='Trial Conversion' value={24.8} isPercent showChangeIndicator isNegative={false} />
		</div>
	),
};

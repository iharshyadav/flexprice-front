import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

/**
 * Two-month date range picker used for analytics and table filters.
 * Supports controlled values, constraints, timezone toggle, and clear action.
 */
const meta = {
	title: 'Molecules/DateRangePicker',
	component: DateRangePicker,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Two-month date range picker for analytics and list filters.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		title: { control: 'text' },
		disabled: { control: 'boolean' },
	},
	args: {
		placeholder: 'Select date range',
		disabled: false,
		onChange: () => {},
	},
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle: Story = {
	args: {
		title: 'Analytics Period',
		placeholder: 'Select range',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: 'Date range locked',
	},
};

const PreselectedRangeStory = () => {
	const [range, setRange] = useState<{ startDate?: Date; endDate?: Date }>({
		startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
		endDate: new Date(),
	});
	return (
		<div className='flex flex-col gap-2'>
			<DateRangePicker title='Usage Period' startDate={range.startDate} endDate={range.endDate} onChange={setRange} />
			{range.startDate && range.endDate && (
				<p className='text-xs text-muted-foreground text-center'>
					{range.startDate.toLocaleDateString()} → {range.endDate.toLocaleDateString()}
				</p>
			)}
		</div>
	);
};

export const WithPreselectedRange: Story = {
	render: () => <PreselectedRangeStory />,
};

export const WithConstraints: Story = {
	args: {
		title: 'Invoice Date Range',
		placeholder: 'Current month only',
		minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
		maxDate: new Date(),
	},
};

const InteractiveStory = () => {
	const [range, setRange] = useState<{ startDate?: Date; endDate?: Date }>({});
	return (
		<div className='flex flex-col items-center gap-3'>
			<DateRangePicker title='Filter Period' startDate={range.startDate} endDate={range.endDate} onChange={setRange} />
			<p className='text-xs text-muted-foreground'>
				{range.startDate && range.endDate
					? `Selected: ${range.startDate.toLocaleDateString()} – ${range.endDate.toLocaleDateString()}`
					: 'No range selected'}
			</p>
		</div>
	);
};

export const Interactive: Story = {
	render: () => <InteractiveStory />,
};

import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

/**
 * Animated loading spinner for async states.
 * Size and color can be customized via props.
 */
const meta = {
	title: 'Atoms/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Animated loading spinner with configurable size and color.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'number', min: 12, max: 96, step: 4 },
			description: 'Width and height in pixels',
		},
		className: {
			control: 'text',
			description: 'Tailwind/CSS classes for colour etc.',
		},
	},
	args: {
		size: 24,
		className: '',
	},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
	args: { size: 16 },
};

export const Medium: Story = {
	args: { size: 32 },
};

export const Large: Story = {
	args: { size: 48 },
};

export const Branded: Story = {
	args: {
		size: 32,
		className: 'text-blue-500',
	},
};

export const InlineLoading: Story = {
	render: () => (
		<div className='flex items-center gap-2 text-sm text-muted-foreground'>
			<Spinner size={16} />
			<span>Loading invoices...</span>
		</div>
	),
};

export const PageLoading: Story = {
	render: () => (
		<div className='flex flex-col items-center justify-center gap-3 p-16 text-muted-foreground'>
			<Spinner size={40} className='text-blue-500' />
			<p className='text-sm'>Fetching your data...</p>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div className='flex items-center gap-6'>
			{[12, 16, 24, 32, 40, 48].map((s) => (
				<div key={s} className='flex flex-col items-center gap-1'>
					<Spinner size={s} className='text-blue-500' />
					<span className='text-xs text-muted-foreground'>{s}px</span>
				</div>
			))}
		</div>
	),
};

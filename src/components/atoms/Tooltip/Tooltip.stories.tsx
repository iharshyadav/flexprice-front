import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button/Button';
import Tooltip from './Tooltip';

/**
 * Tooltip wrapper used for inline help and context across the UI.
 * Supports placement, alignment, and delay controls.
 */
const meta = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Tooltip wrapper for contextual help with configurable placement and delay.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
			description: 'Which side of the trigger the tooltip appears on',
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
			description: 'Tooltip alignment relative to trigger',
		},
		delayDuration: {
			control: { type: 'number', min: 0, max: 2000, step: 100 },
			description: 'Delay in ms before tooltip appears',
		},
		sideOffset: {
			control: { type: 'number', min: 0, max: 20 },
			description: 'Pixel gap between trigger and tooltip',
		},
	},
	args: {
		content: 'This is a tooltip',
		children: <button className='px-4 py-2 border rounded'>Hover me</button>,
		side: 'top',
		align: 'center',
		delayDuration: 300,
		sideOffset: 4,
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		content: 'Hover for more info',
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button variant='outline'>Hover me</Button>
		</Tooltip>
	),
};

export const NoDelay: Story = {
	args: {
		content: 'Appears instantly',
		delayDuration: 0,
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button variant='outline'>No Delay</Button>
		</Tooltip>
	),
};

export const RightSide: Story = {
	args: {
		content: 'Tooltip on the right',
		side: 'right',
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button variant='outline'>Right</Button>
		</Tooltip>
	),
};

export const Bottom: Story = {
	args: {
		content: 'Tooltip below',
		side: 'bottom',
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button variant='outline'>Bottom</Button>
		</Tooltip>
	),
};

export const RichContent: Story = {
	args: {
		content: (
			<div className='space-y-1 text-xs'>
				<p className='font-semibold'>MRR Calculation</p>
				<p className='text-muted-foreground'>Sum of all active subscription monthly amounts.</p>
			</div>
		),
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button variant='outline'>What is MRR?</Button>
		</Tooltip>
	),
};

export const DisabledButtonExplanation: Story = {
	args: {
		content: 'Upgrade to Enterprise to access this feature.',
		delayDuration: 0,
	},
	render: (args) => (
		<Tooltip {...args}>
			<span>
				<Button disabled>Premium Feature</Button>
			</span>
		</Tooltip>
	),
};

export const AllPlacements: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-4 p-8'>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Tooltip key={side} content={`Tooltip on ${side}`} side={side} delayDuration={0}>
					<Button variant='outline' size='sm' className='w-full'>
						{side}
					</Button>
				</Tooltip>
			))}
		</div>
	),
};

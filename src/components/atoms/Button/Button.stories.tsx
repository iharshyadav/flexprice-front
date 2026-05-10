import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Download, Plus, Trash2 } from 'lucide-react';
import Button from './Button';

/**
 * Primary action button used across FlexPrice.
 * Supports style variants, sizes, loading state, and optional prefix/suffix icons.
 */
const meta = {
	title: 'Atoms/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Primary action button with variants, sizes, loading, and icon support.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'outline', 'destructive', 'ghost', 'secondary', 'link', 'black'],
			description: 'Visual style variant',
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg', 'xs', 'icon'],
			description: 'Button size',
		},
		isLoading: {
			control: 'boolean',
			description: 'Show loading spinner in place of children',
		},
		disabled: {
			control: 'boolean',
			description: 'Disable interaction',
		},
		children: {
			control: 'text',
			description: 'Button label',
		},
	},
	args: {
		children: 'Button',
		variant: 'default',
		size: 'default',
		isLoading: false,
		disabled: false,
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Create Plan',
		variant: 'default',
	},
};

export const Outline: Story = {
	args: {
		children: 'View Details',
		variant: 'outline',
	},
};

export const Destructive: Story = {
	args: {
		children: 'Delete Invoice',
		variant: 'destructive',
		prefixIcon: <Trash2 />,
	},
};

export const Ghost: Story = {
	args: {
		children: 'Cancel',
		variant: 'ghost',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Export',
		variant: 'secondary',
		prefixIcon: <Download />,
	},
};

export const Small: Story = {
	args: {
		children: 'Add Feature',
		size: 'sm',
		prefixIcon: <Plus />,
	},
};

export const Large: Story = {
	args: {
		children: 'Get Started',
		size: 'lg',
	},
};

export const Loading: Story = {
	args: {
		children: 'Saving...',
		isLoading: true,
	},
};

export const Disabled: Story = {
	args: {
		children: 'Unavailable',
		disabled: true,
	},
};

export const WithIcons: Story = {
	args: {
		children: 'Add Customer',
		prefixIcon: <Plus />,
		suffixIcon: <Download />,
		variant: 'outline',
	},
};

export const ClickTest: Story = {
	args: {
		children: 'Click Me',
		id: 'btn-click-test',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const btn = canvas.getByRole('button', { name: /click me/i });
		await userEvent.click(btn);
		await expect(btn).toBeInTheDocument();
	},
};

import type { Meta, StoryObj } from '@storybook/react';
import { Package, Users, Zap, FileText } from 'lucide-react';
import Button from '@/components/atoms/Button/Button';

/**
 * `EmptyState` is a full-area empty state component used in FlexPrice
 * when a list or resource has no data yet.
 *
 * Shows an icon, headline, descriptive text, and a primary CTA button.
 * Used on Customers, Plans, Invoices, Subscriptions, and Events pages.
 *
 * @prop icon - SVG/Lucide icon shown at the top
 * @prop heading - Bold headline
 * @prop description - Explanatory subtext
 * @prop ctaLabel - Text for the primary action button
 * @prop onCtaClick - Handler for the CTA button
 */

interface EmptyStateProps {
	icon?: React.ReactNode;
	heading: string;
	description: string;
	ctaLabel?: string;
	onCtaClick?: () => void;
}

const EmptyState = ({ icon, heading, description, ctaLabel, onCtaClick }: EmptyStateProps) => (
	<div className='bg-[#fafafa] border border-[#E9E9E9] rounded-md w-full h-[360px] flex flex-col items-center justify-center gap-4 px-8 text-center'>
		{icon && <div className='h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400'>{icon}</div>}
		<div className='space-y-2'>
			<h3 className='text-lg font-semibold text-gray-800'>{heading}</h3>
			<p className='text-sm text-gray-400 max-w-xs leading-relaxed'>{description}</p>
		</div>
		{ctaLabel && onCtaClick && (
			<Button onClick={onCtaClick} variant='outline' className='mt-2 !border-[#CFCFCF] !bg-white !px-5'>
				{ctaLabel}
			</Button>
		)}
	</div>
);

const meta = {
	title: 'Organisms/EmptyState',
	component: EmptyState,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Full-area empty state shown when a FlexPrice list page has no data. Displays an icon, headline, description, and optional CTA. Used on Customers, Plans, Invoices, Subscriptions, and Events pages.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		heading: { control: 'text', description: 'Empty state headline' },
		description: { control: 'text', description: 'Explanatory subtext' },
		ctaLabel: { control: 'text', description: 'CTA button label' },
	},
	args: {
		heading: 'No customers yet',
		description: 'Add your first customer to start managing subscriptions and billing.',
		ctaLabel: 'Add Customer',
		onCtaClick: () => console.log('CTA clicked'),
	},
	decorators: [
		(Story) => (
			<div className='max-w-3xl'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Customers: Story = {
	args: {
		icon: <Users size={28} />,
		heading: 'No customers yet',
		description: 'Add your first customer to start managing subscriptions, invoices, and usage.',
		ctaLabel: 'Add Customer',
	},
};

export const Plans: Story = {
	args: {
		icon: <Package size={28} />,
		heading: 'No plans created',
		description: 'Create your first pricing plan. Define charges, billing periods, and feature limits.',
		ctaLabel: 'Create Plan',
	},
};

export const Invoices: Story = {
	args: {
		icon: <FileText size={28} />,
		heading: 'No invoices yet',
		description: 'Invoices are generated automatically when subscriptions are active.',
		ctaLabel: undefined,
		onCtaClick: undefined,
	},
};

export const Events: Story = {
	args: {
		icon: <Zap size={28} />,
		heading: 'No usage events',
		description: 'Start sending metered usage events via the FlexPrice API to see them here.',
		ctaLabel: 'View API Docs',
	},
};

export const WithoutIcon: Story = {
	args: {
		heading: 'Nothing here yet',
		description: 'There are no items matching your current filters. Try adjusting the date range or status.',
		ctaLabel: 'Reset Filters',
	},
};

export const WithoutCTA: Story = {
	args: {
		icon: <FileText size={28} />,
		heading: 'No invoices for this period',
		description: 'There are no invoices in the selected date range.',
		ctaLabel: undefined,
		onCtaClick: undefined,
	},
};

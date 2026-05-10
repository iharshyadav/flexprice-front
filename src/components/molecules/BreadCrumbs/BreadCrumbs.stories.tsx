import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight } from 'lucide-react';

/**
 * `BreadcrumbNav` is a standalone breadcrumb navigation component for Storybook.
 *
 * The production `BreadCrumbs` component depends on react-router and Zustand stores,
 * so this story demonstrates the UI pattern directly with mock data.
 *
 * Used in the FlexPrice header to show current location:
 * e.g. Customers → Acme Corp → Subscriptions → sub_001
 */

interface BreadcrumbItem {
	label: string;
	href?: string;
	isActive?: boolean;
}

const BreadcrumbNav = ({ items }: { items: BreadcrumbItem[] }) => (
	<header className='bg-white border-b border-gray-200'>
		<div className='px-6 py-4 flex items-center'>
			<nav className='flex items-center space-x-2 text-sm text-gray-500'>
				{items.map((item, index) => (
					<span key={index} className='flex items-center space-x-2 min-w-0'>
						{item.href && !item.isActive ? (
							<a
								href={item.href}
								onClick={(e) => e.preventDefault()}
								className='hover:text-gray-800 capitalize max-w-[140px] truncate block transition-colors'>
								{item.label}
							</a>
						) : (
							<span className={`capitalize max-w-[180px] truncate ${item.isActive ? 'font-normal text-[#020617]' : 'text-gray-500'}`}>
								{item.label}
							</span>
						)}
						{index < items.length - 1 && <ChevronRight size={12} className='shrink-0 text-gray-400' />}
					</span>
				))}
			</nav>
		</div>
	</header>
);

const meta = {
	title: 'Molecules/BreadcrumbNav',
	component: BreadcrumbNav,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Header breadcrumb navigation pattern used in FlexPrice. Shows current page location as a hierarchical path. The production component integrates with react-router and a Zustand store.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		items: {
			description: 'Array of breadcrumb items — label, optional href, optional isActive flag',
		},
	},
} satisfies Meta<typeof BreadcrumbNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLevel: Story = {
	args: {
		items: [{ label: 'Customers', isActive: true }],
	},
};

export const TwoLevels: Story = {
	args: {
		items: [
			{ label: 'Customers', href: '/customers' },
			{ label: 'Acme Corp', isActive: true },
		],
	},
};

export const ThreeLevels: Story = {
	args: {
		items: [
			{ label: 'Customers', href: '/customers' },
			{ label: 'Acme Corp', href: '/customers/acme' },
			{ label: 'Subscriptions', isActive: true },
		],
	},
};

export const FourLevels: Story = {
	args: {
		items: [
			{ label: 'Customers', href: '/customers' },
			{ label: 'Acme Corp', href: '/customers/acme' },
			{ label: 'Subscriptions', href: '/customers/acme/subscriptions' },
			{ label: 'sub_01HM...', isActive: true },
		],
	},
};

export const Loading: Story = {
	args: { items: [] },
	render: () => (
		<header className='bg-white border-b border-gray-200'>
			<div className='px-6 py-4'>
				<div className='h-5 animate-pulse bg-gray-200 rounded w-48' />
			</div>
		</header>
	),
};

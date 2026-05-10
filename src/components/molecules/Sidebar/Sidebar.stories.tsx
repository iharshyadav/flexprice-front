import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
	Home,
	Landmark,
	Layers2,
	CodeXml,
	Puzzle,
	GalleryHorizontalEnd,
	BarChart3,
	Settings,
	ChevronRight,
	ChevronDown,
	LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * `SidebarNav` is the collapsible left navigation for the FlexPrice application.
 *
 * Displays hierarchical nav items with icons, active route highlighting,
 * and expandable sub-menus. The production component uses Radix UI sidebar
 * primitives and react-router — this story demonstrates the UI pattern standalone.
 *
 * @prop items - Array of nav items with title, icon, url, and optional sub-items
 * @prop activeUrl - Currently active route URL
 */

interface NavSubItem {
	title: string;
	url: string;
}

interface NavItem {
	title: string;
	url: string;
	icon: LucideIcon;
	items?: NavSubItem[];
}

const NAV_ITEMS: NavItem[] = [
	{ title: 'Home', url: '/dashboard', icon: Home },
	{
		title: 'Product Catalog',
		url: '/features',
		icon: Layers2,
		items: [
			{ title: 'Features', url: '/features' },
			{ title: 'Plans', url: '/plans' },
			{ title: 'Coupons', url: '/coupons' },
			{ title: 'Addons', url: '/addons' },
			{ title: 'Price Units', url: '/price-units' },
		],
	},
	{
		title: 'Billing',
		url: '/customers',
		icon: Landmark,
		items: [
			{ title: 'Customers', url: '/customers' },
			{ title: 'Subscriptions', url: '/subscriptions' },
			{ title: 'Invoices', url: '/invoices' },
			{ title: 'Credit Notes', url: '/credit-notes' },
			{ title: 'Payments', url: '/payments' },
		],
	},
	{ title: 'Revenue', url: '/revenue', icon: BarChart3 },
	{
		title: 'Tools',
		url: '/imports',
		icon: Settings,
		items: [
			{ title: 'Imports', url: '/imports' },
			{ title: 'Exports', url: '/exports' },
		],
	},
	{
		title: 'Developers',
		url: '/events',
		icon: CodeXml,
		items: [
			{ title: 'Events Debugger', url: '/events' },
			{ title: 'API Keys', url: '/api-keys' },
			{ title: 'Webhooks', url: '/webhooks' },
		],
	},
	{ title: 'Integrations', url: '/integrations', icon: Puzzle },
	{ title: 'Pricing Widget', url: '/pricing', icon: GalleryHorizontalEnd },
];

interface SidebarNavProps {
	activeUrl?: string;
	collapsed?: boolean;
}

const SidebarNavDemo = ({ activeUrl = '/dashboard', collapsed = false }: SidebarNavProps) => {
	const [expandedItems, setExpandedItems] = useState<string[]>(['Billing', 'Product Catalog']);
	const [active, setActive] = useState(activeUrl);

	const toggleExpand = (title: string) => {
		setExpandedItems((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]));
	};

	return (
		<div
			className={cn(
				'flex flex-col h-[600px] border-r border-gray-200 bg-[#f9f9f9] transition-all duration-200',
				collapsed ? 'w-14' : 'w-56',
			)}>
			{/* Logo / Header */}
			<div className={cn('flex items-center gap-2 px-4 py-4 border-b border-gray-200', collapsed && 'justify-center')}>
				<div className='h-7 w-7 rounded bg-[#092E44] flex items-center justify-center'>
					<span className='text-white text-xs font-bold'>F</span>
				</div>
				{!collapsed && <span className='font-semibold text-sm text-gray-800'>FlexPrice</span>}
			</div>

			{/* Nav Items */}
			<nav className='flex-1 overflow-y-auto py-2 px-2 space-y-0.5'>
				{NAV_ITEMS.map((item) => {
					const isExpanded = expandedItems.includes(item.title);
					const isActiveParent = active === item.url || item.items?.some((sub) => sub.url === active);
					const Icon = item.icon;

					return (
						<div key={item.title}>
							<button
								onClick={() => {
									if (item.items) {
										toggleExpand(item.title);
									} else {
										setActive(item.url);
									}
								}}
								className={cn(
									'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
									isActiveParent ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
									collapsed && 'justify-center',
								)}>
								<Icon size={16} className='shrink-0' />
								{!collapsed && (
									<>
										<span className='flex-1 text-left'>{item.title}</span>
										{item.items && <span className='ml-auto'>{isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}</span>}
									</>
								)}
							</button>

							{/* Sub-items */}
							{item.items && isExpanded && !collapsed && (
								<div className='ml-4 mt-0.5 space-y-0.5 border-l border-gray-200 pl-2'>
									{item.items.map((sub) => (
										<button
											key={sub.url}
											onClick={() => setActive(sub.url)}
											className={cn(
												'w-full text-left px-2 py-1 rounded-md text-xs transition-colors',
												active === sub.url
													? 'bg-white text-gray-900 font-medium shadow-sm border border-gray-100'
													: 'text-gray-500 hover:bg-gray-100 hover:text-gray-800',
											)}>
											{sub.title}
										</button>
									))}
								</div>
							)}
						</div>
					);
				})}
			</nav>

			{/* Footer */}
			{!collapsed && (
				<div className='border-t border-gray-200 px-4 py-3'>
					<div className='flex items-center gap-2'>
						<div className='h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center'>
							<span className='text-xs text-gray-600 font-medium'>HY</span>
						</div>
						<div className='flex-1 min-w-0'>
							<p className='text-xs font-medium text-gray-800 truncate'>Harsh Yadav</p>
							<p className='text-xs text-gray-500 truncate'>admin@flexprice.io</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const meta = {
	title: 'Organisms/SidebarNav',
	component: SidebarNavDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Left navigation sidebar for the FlexPrice app. Features icon+label nav items, collapsible sub-menus, active route highlighting, and a user profile footer. The production component integrates with Radix UI sidebar primitives and react-router.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		activeUrl: {
			control: 'select',
			options: ['/dashboard', '/customers', '/plans', '/invoices', '/events', '/integrations'],
			description: 'Currently active route',
		},
		collapsed: {
			control: 'boolean',
			description: 'Collapse to icon-only mode',
		},
	},
	args: {
		activeUrl: '/customers',
		collapsed: false,
	},
	decorators: [
		(Story) => (
			<div className='flex h-screen'>
				<Story />
				<div className='flex-1 p-8 bg-white'>
					<p className='text-sm text-muted-foreground'>App content area</p>
				</div>
			</div>
		),
	],
} satisfies Meta<typeof SidebarNavDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { activeUrl: '/customers' },
};

export const HomeActive: Story = {
	args: { activeUrl: '/dashboard' },
};

export const InvoicesActive: Story = {
	args: { activeUrl: '/invoices' },
};

export const Collapsed: Story = {
	args: { collapsed: true },
};

export const DevelopersActive: Story = {
	args: { activeUrl: '/events' },
};

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

/**
 * `FlexPricePagination` is a standalone pagination component for Storybook.
 *
 * The production `FLexpricePagination` depends on `react-router` `useSearchParams`,
 * so this story demonstrates the pattern with local state.
 *
 * Used in FlexPrice for all paginated lists: customers, invoices, subscriptions, plans.
 *
 * @prop totalPages - Total number of pages
 * @prop currentPage - Currently active page (1-indexed)
 * @prop onPageChange - Callback fired when a new page is selected
 */

interface PaginationDemoProps {
	totalPages: number;
	initialPage?: number;
}

const PaginationDemo = ({ totalPages, initialPage = 1 }: PaginationDemoProps) => {
	const [currentPage, setCurrentPage] = useState(initialPage);

	const getPageNumbers = (): (number | 'ellipsis')[] => {
		if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
		const pages: (number | 'ellipsis')[] = [1];
		if (currentPage > 3) pages.push('ellipsis');
		for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
			pages.push(i);
		}
		if (currentPage < totalPages - 2) pages.push('ellipsis');
		pages.push(totalPages);
		return pages;
	};

	return (
		<div className='space-y-2'>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
							className={cn('!font-normal !text-gray-500', currentPage === 1 && 'opacity-50 pointer-events-none')}
						/>
					</PaginationItem>
					{getPageNumbers().map((page, i) =>
						page === 'ellipsis' ? (
							<PaginationItem key={`e-${i}`}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={page}>
								<PaginationLink
									isActive={currentPage === page}
									onClick={() => setCurrentPage(page)}
									className={cn('cursor-pointer', currentPage === page && 'text-gray-500')}>
									{page}
								</PaginationLink>
							</PaginationItem>
						),
					)}
					<PaginationItem>
						<PaginationNext
							onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
							className={cn('!font-normal !text-gray-500', currentPage === totalPages && 'opacity-50 pointer-events-none')}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<p className='text-xs text-center text-muted-foreground'>
				Page {currentPage} of {totalPages}
			</p>
		</div>
	);
};

const meta = {
	title: 'Molecules/Pagination',
	component: PaginationDemo,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Pagination control for all paginated lists in FlexPrice. Supports ellipsis truncation for large page counts. The production component integrates with react-router URL params.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		totalPages: {
			control: { type: 'number', min: 2, max: 100 },
			description: 'Total number of pages',
		},
		initialPage: {
			control: { type: 'number', min: 1 },
			description: 'Starting page number',
		},
	},
} satisfies Meta<typeof PaginationDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FewPages: Story = {
	args: { totalPages: 5 },
};

export const ManyPages: Story = {
	args: { totalPages: 24, initialPage: 12 },
};

export const FirstPage: Story = {
	args: { totalPages: 10, initialPage: 1 },
};

export const LastPage: Story = {
	args: { totalPages: 10, initialPage: 10 },
};

export const HundredPages: Story = {
	args: { totalPages: 100, initialPage: 50 },
};

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';
import type { ColumnData } from '../Table/Table';

interface VirtualTableProps<T> {
	data: T[];
	columns: ColumnData<T>[];
	rowHeight?: number;
	className?: string;
	onRowClick?: (row: T) => void;
}

function VirtualTable<T>({ data, columns, rowHeight = 44, className, onRowClick }: VirtualTableProps<T>) {
	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: data.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => rowHeight,
		overscan: 5,
	});

	return (
		<div ref={parentRef} className={cn('w-full max-h-[500px] overflow-auto border border-gray-200 rounded-md bg-white', className)}>
			<table className='w-full text-sm text-left border-collapse' style={{ display: 'grid' }}>
				<thead
					className='sticky top-0 z-10 bg-gray-50 shadow-sm border-b border-gray-200'
					style={{
						display: 'grid',
						gridTemplateColumns: columns.map((c) => c.width || `${c.flex || 1}fr`).join(' '),
					}}>
					<tr style={{ display: 'contents' }}>
						{columns.map((col, i) => (
							<th
								key={i}
								className={cn(
									'px-4 py-3 font-medium text-gray-500 uppercase tracking-wide text-xs flex items-center',
									col.align === 'right' && 'justify-end',
									col.align === 'center' && 'justify-center',
								)}>
								{col.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody
					className='relative block'
					style={{
						height: `${rowVirtualizer.getTotalSize()}px`,
						width: '100%',
					}}>
					{rowVirtualizer.getVirtualItems().map((virtualRow) => {
						const row = data[virtualRow.index];
						return (
							<tr
								key={virtualRow.index}
								data-index={virtualRow.index}
								ref={rowVirtualizer.measureElement}
								onClick={() => onRowClick?.(row)}
								className={cn(
									'absolute top-0 left-0 w-full border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors',
									onRowClick && 'cursor-pointer',
								)}
								style={{
									display: 'grid',
									gridTemplateColumns: columns.map((c) => c.width || `${c.flex || 1}fr`).join(' '),
									transform: `translateY(${virtualRow.start}px)`,
									height: `${virtualRow.size}px`,
								}}>
								{columns.map((col, i) => {
									const cellContent = col.render ? col.render(row) : col.fieldName ? (row as any)[col.fieldName] : null;

									return (
										<td
											key={i}
											className={cn(
												'px-4 py-2 truncate flex items-center',
												col.align === 'right' && 'justify-end',
												col.align === 'center' && 'justify-center',
												col.fieldVariant === 'title' && 'font-medium text-gray-900',
												!col.fieldVariant && 'text-gray-600',
											)}>
											{cellContent}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default VirtualTable;

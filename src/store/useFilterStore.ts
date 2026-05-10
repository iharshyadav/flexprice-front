import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FilterValue = string | number | boolean | null;

interface FilterState {
	filters: Record<string, FilterValue>;
	setFilter: (key: string, value: FilterValue) => void;
	clearFilter: (key: string) => void;
	resetAllFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
	persist(
		(set) => ({
			filters: {},
			setFilter: (key, value) =>
				set((state) => ({
					filters: { ...state.filters, [key]: value },
				})),
			clearFilter: (key) =>
				set((state) => {
					const newFilters = { ...state.filters };
					delete newFilters[key];
					return { filters: newFilters };
				}),
			resetAllFilters: () => set({ filters: {} }),
		}),
		{
			name: 'flexprice-filter-storage',
		},
	),
);

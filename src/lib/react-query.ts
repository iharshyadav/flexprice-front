import { QueryClientConfig } from '@tanstack/react-query';

export const createQueryConfig = (): QueryClientConfig => {
	return {
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				retry: 1,
				refetchOnWindowFocus: false,
			},
		},
	};
};

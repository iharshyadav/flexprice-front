export type InputVariant = 'text' | 'number' | 'formatted-number' | 'integer';

export interface NumberFormatOptions {
	allowNegative?: boolean;
	allowDecimals?: boolean;
	thousandSeparator: string;
	decimalSeparator: string;
}

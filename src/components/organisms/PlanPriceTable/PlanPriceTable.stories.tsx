import type { Meta, StoryObj } from '@storybook/react';

/**
 * Pricing table examples for flat, tiered, and graduated charge models.
 * Uses mock data in Storybook to document how plan pricing is displayed in FlexPrice.
 */

interface TierRow {
	from: number;
	to: string | number;
	unitPrice: string;
	flatFee?: string;
}

interface PricingTierTableProps {
	tiers: TierRow[];
	currency?: string;
	unitLabel?: string;
}

const PricingTierTableDisplay = ({ tiers, currency = '$', unitLabel = 'unit' }: PricingTierTableProps) => (
	<div className='rounded-md border border-gray-200 overflow-hidden'>
		<table className='w-full text-sm'>
			<thead>
				<tr className='bg-gray-50 border-b border-gray-200'>
					<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>From</th>
					<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>To</th>
					<th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide'>Per {unitLabel}</th>
					<th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide'>Flat Fee</th>
				</tr>
			</thead>
			<tbody>
				{tiers.map((tier, i) => (
					<tr key={i} className='border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors'>
						<td className='px-4 py-3 font-medium text-gray-800'>{tier.from.toLocaleString()}</td>
						<td className='px-4 py-3 text-gray-600'>
							{typeof tier.to === 'string' ? (
								<span className='inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600 font-medium'>∞</span>
							) : (
								tier.to.toLocaleString()
							)}
						</td>
						<td className='px-4 py-3 text-right font-medium text-gray-800'>
							{currency}
							{tier.unitPrice}
						</td>
						<td className='px-4 py-3 text-right text-gray-500'>{tier.flatFee ? `${currency}${tier.flatFee}` : '—'}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

interface FlatPricingProps {
	price: string;
	currency?: string;
	billingPeriod?: string;
	description?: string;
}

const FlatPricingDisplay = ({ price, currency = '$', billingPeriod = 'monthly', description }: FlatPricingProps) => (
	<div className='rounded-md border border-gray-200 overflow-hidden'>
		<table className='w-full text-sm'>
			<thead>
				<tr className='bg-gray-50 border-b border-gray-200'>
					<th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>Charge</th>
					<th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide'>Amount</th>
					<th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide'>Billing</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className='px-4 py-3 text-gray-700'>{description ?? 'Base subscription fee'}</td>
					<td className='px-4 py-3 text-right font-semibold text-gray-900'>
						{currency}
						{price}
					</td>
					<td className='px-4 py-3 text-right text-gray-500 capitalize'>{billingPeriod}</td>
				</tr>
			</tbody>
		</table>
	</div>
);

const meta = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTableDisplay,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Pricing table examples for flat, tiered, and graduated models.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		currency: { control: 'text' },
		unitLabel: { control: 'text' },
	},
	decorators: [
		(Story) => (
			<div className='max-w-2xl'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof PricingTierTableDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GraduatedPricing: Story = {
	args: {
		unitLabel: 'API call',
		tiers: [
			{ from: 0, to: 10000, unitPrice: '0.0050' },
			{ from: 10001, to: 50000, unitPrice: '0.0040' },
			{ from: 50001, to: 200000, unitPrice: '0.0025' },
			{ from: 200001, to: '∞', unitPrice: '0.0010' },
		],
	},
};

export const TieredPricing: Story = {
	args: {
		unitLabel: 'seat',
		tiers: [
			{ from: 1, to: 5, unitPrice: '29.00', flatFee: '0.00' },
			{ from: 6, to: 20, unitPrice: '24.00', flatFee: '0.00' },
			{ from: 21, to: 100, unitPrice: '19.00', flatFee: '0.00' },
			{ from: 101, to: '∞', unitPrice: '14.00', flatFee: '0.00' },
		],
	},
};

export const PackagePricing: Story = {
	args: {
		unitLabel: '1,000 events',
		tiers: [
			{ from: 0, to: 5, unitPrice: '10.00', flatFee: '5.00' },
			{ from: 6, to: 50, unitPrice: '8.00', flatFee: '0.00' },
			{ from: 51, to: '∞', unitPrice: '5.00', flatFee: '0.00' },
		],
	},
};

export const FlatPricing: Story = {
	args: { tiers: [] },
	render: () => (
		<div className='space-y-4'>
			<p className='text-sm font-medium text-gray-700'>Flat Rate Charge</p>
			<FlatPricingDisplay price='299.00' currency='$' billingPeriod='monthly' description='Enterprise Platform Fee' />
		</div>
	),
};

export const FullPlanPricing: Story = {
	args: { tiers: [] },
	render: () => (
		<div className='space-y-6 max-w-2xl'>
			<div>
				<div className='flex items-center justify-between mb-2'>
					<p className='text-sm font-semibold text-gray-800'>Platform Fee</p>
					<span className='text-xs bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded-full'>Active</span>
				</div>
				<FlatPricingDisplay price='499.00' billingPeriod='monthly' description='Base platform access' />
			</div>
			<div>
				<div className='flex items-center justify-between mb-2'>
					<p className='text-sm font-semibold text-gray-800'>API Calls</p>
					<span className='text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full'>Usage-based</span>
				</div>
				<PricingTierTableDisplay
					unitLabel='API call'
					tiers={[
						{ from: 0, to: 100000, unitPrice: '0.0050' },
						{ from: 100001, to: 1000000, unitPrice: '0.0030' },
						{ from: 1000001, to: '∞', unitPrice: '0.0010' },
					]}
				/>
			</div>
			<div>
				<div className='flex items-center justify-between mb-2'>
					<p className='text-sm font-semibold text-gray-800'>Seats</p>
					<span className='text-xs bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded-full'>Active</span>
				</div>
				<PricingTierTableDisplay
					unitLabel='seat'
					tiers={[
						{ from: 1, to: 10, unitPrice: '25.00' },
						{ from: 11, to: '∞', unitPrice: '20.00' },
					]}
				/>
			</div>
		</div>
	),
};

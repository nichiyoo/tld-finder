import Action from '@/components/bottom-action';
import TLDFilter from '@/components/tld-filter';

export default async function Page() {
	const text = await fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt').then((res) => res.text());
	const tlds = text
		.split('\n')
		.slice(2)
		.filter((line) => line.trim() !== '')
		.map((line) => '.' + line.trim());

	return (
		<div className='container py-20 max-w-xl'>
			<h1 className='text-5xl font-bold mb-2 font-heading'>Top-Level Domain (TLD) Finder</h1>
			<p className='text-muted-foreground mb-6'>
				Search the comprehensive list of ICANN-approved Top-Level Domains. Filter by name to find specific TLDs
				quickly.
			</p>
			<TLDFilter tlds={tlds} />

			<Action className='fixed bottom-8 right-8 rounded-full' />
			<p className='fixed bottom-8 left-8 text-xs text-muted-foreground'>
				Data source:
				<a
					href='https://data.iana.org/TLD/tlds-alpha-by-domain.txt'
					target='_blank'
					rel='noopener noreferrer'
					className='font-medium underline'>
					ICANN List of TLDs
				</a>
			</p>
		</div>
	);
}

'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Button } from './ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

type TLD = string;

interface TLDFilter {
	tlds: TLD[];
}

export default function TLDFilter({ tlds }: TLDFilter) {
	const [filter, setFilter] = useState('');
	const filtered = tlds
		.filter((tld) => {
			const input = filter.toLowerCase();
			const check = tld.toLowerCase();
			return check.includes(input);
		})
		.slice(0, 15);

	const container = {
		hidden: {
			opacity: 1,
		},
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.02,
			},
		},
	};

	const variant = {
		hidden: { opacity: 0, x: 10 },
		visible: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 10 },
	};

	return (
		<>
			<div className='flex space-x-2'>
				<Input
					type='text'
					placeholder='Filter TLDs (e.g., .com, .org, .io)...'
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className='w-full mb-4 bg-card'
				/>
				<Button className='font-medium'>
					<Search className='h-4 w-4' />
					<span>Search</span>
				</Button>
			</div>

			<div className='border rounded-md p-4 bg-card'>
				<motion.ul
					variants={container}
					initial='hidden'
					animate='visible'
					className='uppercase list-none text-sm font-mono flex flex-col space-y-2'>
					<AnimatePresence key={filter}>
						{filtered.map((tld) => (
							<motion.li layout key={tld} variants={variant}>
								{tld}
							</motion.li>
						))}
						{filtered.length === 0 && <motion.li key='empty'>No results found</motion.li>}
					</AnimatePresence>
				</motion.ul>
			</div>

			<p className='mt-4 text-sm text-muted-foreground'>
				Showing {filtered.length} of {tlds.length} TLDs
			</p>
		</>
	);
}

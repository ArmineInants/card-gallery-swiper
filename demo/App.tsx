import React from 'react';
import { SwiperSemiConstrained } from '../src';

export const App: React.FC = () => {
	const imageUrls: Record<number, string> = {
		1: 'https://picsum.photos/seed/child1/800/800',
		2: 'https://picsum.photos/seed/child2/800/800',
		3: 'https://picsum.photos/seed/child3/800/800',
		4: 'https://picsum.photos/seed/child4/800/800',
		5: 'https://picsum.photos/seed/child5/800/800',
		6: 'https://picsum.photos/seed/child6/800/800',
		7: 'https://picsum.photos/seed/child7/800/800',
		8: 'https://picsum.photos/seed/child8/800/800',
		9: 'https://picsum.photos/seed/child9/800/800',
		10: 'https://picsum.photos/seed/child10/800/800',
		11: 'https://picsum.photos/seed/child11/800/800',
		12: 'https://picsum.photos/seed/child12/800/800',
		13: 'https://picsum.photos/seed/child13/800/800',
		14: 'https://picsum.photos/seed/child14/800/800',
		15: 'https://picsum.photos/seed/child15/800/800',
		16: 'https://picsum.photos/seed/child16/800/800',
		17: 'https://picsum.photos/seed/child17/800/800',
	};
	return (
		<div className="app">
			<h1>Card Gallery Swiper Demo</h1>
			<p>Scroll horizontally or use the navigation controls to move between cards.</p>
			<SwiperSemiConstrained
				imageUrls={imageUrls}
			/>
		</div>
	);
};


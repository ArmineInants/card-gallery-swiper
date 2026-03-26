import React from 'react';
import { SwiperSemiConstrained } from '../src';
import {ConstrainedBox} from '../src/components/constraints/ConstrainedBox';

export const App: React.FC = () => {
	const imageUrls: Record<number, string> = {
		1: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&h=800&q=80', // bright bedroom
		2: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&h=800&q=80', // dining area
		3: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&h=800&q=80', // home office
		4: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&h=800&q=80', // entryway
		5: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&h=800&q=80', // loft
		6: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&h=800&q=80', // bright bedroom
		7: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&h=800&q=80', // dining area
		8: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&h=800&q=80', // home office
		9: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&h=800&q=80', // entryway
		10: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&h=800&q=80', // loft
	};
	const innerWidth = window.innerWidth;
	const containerMaxWidth = innerWidth < 360 ? 320 : innerWidth < 768 ? 360 : innerWidth < 1280 ? 688 : innerWidth < 1440 ? 1040 : innerWidth < 1920 ? 1128 : 1440;
	return (
		<main className="app">
			<div className="demo-header">
				<ConstrainedBox containerMaxWidth={containerMaxWidth}>	
					<h1>Card Gallery Swiper Demo</h1>
					<p>Scroll horizontally or use the navigation controls to move between cards.</p>
					<p>You may click on the cards to open the modal gallery.</p>
					<p>The gallery starts aligned with the page container while extending to the full right edge of the screen</p>
				</ConstrainedBox>
			</div>
			<SwiperSemiConstrained
					imageUrls={imageUrls}
			/>
			<ConstrainedBox containerMaxWidth={containerMaxWidth}>
				<div className="demo-block">
					<p>Here goes gallery with full screen mode disabled</p>
					<SwiperSemiConstrained
						imageUrls={imageUrls}
						fullScreenMode={false}
					/>
				</div>
			</ConstrainedBox>
		</main>
	);
};


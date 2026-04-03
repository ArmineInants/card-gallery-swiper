import React from 'react';

import Image from '../Image/Image';
import { CardStyle, CardImageSlot } from './Card.styles';
import { ICssMax } from '../../SwiperSemiConstrained';

interface CardProps {
	className?: string;
	imageUrl: string;
	id: number;
	cssMax: ICssMax;
	onClickImage: (id: number) => void;
	borderWidth?: number;
	borderColor?: string;
	shimmerColor?: string;
	clickable: boolean;
}

export const Card: React.FC<CardProps> = ({
	imageUrl,
	className = '',
	id = 1,
	onClickImage,
	cssMax,
	borderWidth,
	borderColor,
	shimmerColor,
	clickable,
}) => {
	return (
		<CardStyle
			$cssMax={cssMax}
			className={className}
			$borderWidth={borderWidth}
			$borderColor={borderColor}
			$clickable={clickable}
			onClick={() => onClickImage(id)}
		>
			<CardImageSlot>
				<Image
					id={`card-${id}`}
					shimmerColor={shimmerColor ?? borderColor}
					alt="image"
					url={imageUrl}
					loading="lazy"
					withShimmer
				/>
			</CardImageSlot>
		</CardStyle>
	);
};

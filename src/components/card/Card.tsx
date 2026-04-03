import React, { useCallback } from 'react';

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

const CardInner: React.FC<CardProps> = ({
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
	const handleClick = useCallback(() => {
		onClickImage(id);
	}, [onClickImage, id]);

	return (
		<CardStyle
			$cssMax={cssMax}
			className={className}
			$borderWidth={borderWidth}
			$borderColor={borderColor}
			$clickable={clickable}
			onClick={handleClick}
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

export const Card = React.memo(CardInner);

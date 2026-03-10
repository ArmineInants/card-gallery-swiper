import React from 'react';
import LazyLoad from 'react-lazyload';

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
	clickable: boolean;
}

// TODO: LazyLoad по горизонту не работает. Попробовать поиграться с пропом scrollContainer.
export const Card: React.FC<CardProps> = ({
	imageUrl,
	className = '',
	id = 1,
	onClickImage,
	cssMax,
	borderWidth,
	borderColor,
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
				<LazyLoad once offset={500}>
					<Image shimmerColor={borderColor} alt="novatar" url={imageUrl} loading="eager" withShimmer />
				</LazyLoad>
			</CardImageSlot>
		</CardStyle>
	);
};

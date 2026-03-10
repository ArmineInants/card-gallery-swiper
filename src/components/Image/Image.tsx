import React, { useState } from 'react';

import { StyledPicture, StyledImg, ShimmerImg } from './Image.styles';

interface IImageProps {
	url: string;
	classNamePicture?: string;
	className?: string;
	alt: string;
	loading?: "lazy" | "eager" | undefined;
	style?: any;
	withShimmer?: boolean;
	id?: string;
	shimmerColor?: string;
}

const Image: React.FC<IImageProps> = ({
	classNamePicture,
	className,
	style,
	alt,
	loading = 'eager',
	withShimmer,
	id,
	shimmerColor,
	url,
}) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const handleLoadImage = () => {
		if (!withShimmer) {
			return;
		}

		setIsImageLoaded(true);
	};

	return (
		<>
			{withShimmer && !isImageLoaded && (
				<StyledPicture className={classNamePicture}>
					<ShimmerImg
						alt={alt}
						src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
						className={className}
						style={style}
						$shimmerColor={shimmerColor}
					/>
				</StyledPicture>
			)}
			<StyledPicture
				className={classNamePicture}
				$hidden={withShimmer && !isImageLoaded}
				onLoad={handleLoadImage}
			>
				<StyledImg
					src={url}
					alt={alt}
					className={className}
					loading={loading}
					style={style}
					id={id}
				/>
			</StyledPicture>
		</>
	);
}

export default Image;

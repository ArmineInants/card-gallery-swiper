import React, { useState } from 'react';

import { StyledPicture, StyledImg, ShimmerImg } from './Image.styles';

interface IImageProps {
	id: string;
	url: string;
	classNamePicture?: string;
	className?: string;
	alt: string;
	loading?: "lazy" | "eager" | undefined;
	withShimmer?: boolean;
	shimmerColor?: string;
}

const Image: React.FC<IImageProps> = ({
	classNamePicture,
	className,
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
						id={`${id}-shimmer`}
						alt={alt}
						src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
						className={className}
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
					id={id}
				/>
			</StyledPicture>
		</>
	);
}

export default Image;

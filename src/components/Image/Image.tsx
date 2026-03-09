import React, { useState } from 'react';

import { StyledPicture, StyledImg, ShimmerImg } from './Image.styles';

interface IImageProps {
	classNamePicture?: string;
	className?: string;
	alt: string;
	loading?: "lazy" | "eager" | undefined;
	style?: any;
	withShimmer?: boolean;
	id?: string;

	watch?: string;
	watch2x?: string;
	watchWebp?: string;
	watchWebp2x?: string;

	mobile?: string;
	mobile2x?: string;
	mobileWebp?: string;
	mobileWebp2x?: string;

	tablet?: string;
	tablet2x?: string;
	tabletWebp?: string;
	tabletWebp2x?: string;

	laptop?: string;
	laptop2x?: string;
	laptopWebp?: string;
	laptopWebp2x?: string;

	desktop?: string;
	desktop2x?: string;
	desktopWebp?: string,
	desktopWebp2x?: string,

	large?: string;
	large2x?: string;
	largeWebp?: string,
	largeWebp2x?: string,
}

const getSrcSet = (image?: string, image2x?: string) => `${image} 1x${image2x ? `, ${image2x} 2x` : ''}`;

const Image: React.FC<IImageProps> = ({
	classNamePicture,
	className,
	style,
	alt,
	loading = 'eager',
	withShimmer,
	id,

	watch,
	watch2x,
	watchWebp,
	watchWebp2x,

	mobile,
	mobile2x,
	mobileWebp,
	mobileWebp2x,

	tablet,
	tablet2x,
	tabletWebp,
	tabletWebp2x,

	laptop,
	laptop2x,
	laptopWebp,
	laptopWebp2x,

	desktop,
	desktop2x,
	desktopWebp,
	desktopWebp2x,

	large,
	large2x,
	largeWebp,
	largeWebp2x,
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
					/>
				</StyledPicture>
			)}
			<StyledPicture
				className={classNamePicture}
				$hidden={withShimmer && !isImageLoaded}
				onLoad={handleLoadImage}
			>

				{
					watchWebp && (
						<source
							type="image/webp"
							srcSet={getSrcSet(watchWebp, watchWebp2x)}
							media="(max-width: 359px)"
						/>
					)
				}
				{
					watch && (
						<source
							srcSet={getSrcSet(watch, watch2x)}
							media="(max-width: 359px)"
						/>
					)
				}
				{
					mobileWebp && (
						<source
							type="image/webp"
							srcSet={getSrcSet(mobileWebp, mobileWebp2x)}
							media="(max-width: 767px)"
						/>
					)
				}
				{
					mobile && (
						<source
							srcSet={getSrcSet(mobile, mobile2x)}
							media="(max-width: 767px)"
						/>
					)
				}

				{
					tabletWebp && (
						<source
							type="image/webp"
							srcSet={getSrcSet(tabletWebp, tabletWebp2x)}
							media="(max-width: 1279px)"
						/>
					)
				}
				{
					tablet && (
						<source
							srcSet={getSrcSet(tablet, tablet2x)}
							media="(max-width: 1279px)"
						/>
					)
				}

{
					laptopWebp && (
						<source
							type="image/webp"
							srcSet={getSrcSet(laptopWebp, laptopWebp2x)}
							media="(max-width: 1439px)"
						/>
					)
				}
				{
					laptop && (
						<source
							srcSet={getSrcSet(laptop, laptop2x)}
							media="(max-width: 1439px)"
						/>
					)
				}

				{
					largeWebp && (
						<source
							type="image/webp"
							srcSet={getSrcSet(largeWebp, largeWebp2x)}
							media="(min-width: 1920px)"
						/>
					)
				}
				{
					large && (
						<source
							srcSet={getSrcSet(large, large2x)}
							media="(min-width: 1920px)"
						/>
					)
				}

				{
					desktopWebp && (
						<source
							type="image/webp"
							srcSet={getSrcSet(desktopWebp, desktopWebp2x)}
						/>
					)
				}

				<StyledImg
					srcSet={getSrcSet(desktop, desktop2x)}
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

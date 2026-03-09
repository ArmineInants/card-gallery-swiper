import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { ICssMax } from '../../SwiperSemiConstrained';
import {
	ModalBox,
	ImageWrapper,
} from './ModalGalery.styles';

import { NavigationWrapper, NavigationButton, ProgressBarVisible, ProgressBar, ProgressPoint} from '../../SwiperSemiConstrained.styles';

interface IModalGallery {
	isOpenedGalleryModal: boolean;
	closeGalleryModal: () => void;
	currentImage: number;
	imagesList: Record<number, string>;
	cssMax: ICssMax;
	setCurrentImage: (image: number) => void;
	pointsCount: number;
	pointColor: string;
	arrowColor: string;
	arrowHoverColor: string;
	modalBackgroundColor: string;
	modalOverlayColor: string;
	modalOverlayOpacity: number;
	modalOverlayBlur: number;
	modalOverlayShadow: string;
	modalOverlayTransition: string;
	modalOverlayTransitionDuration: number;
	cardBorderWidth: number;
	cardBorderColor: string;
}

export const ModalGallery: React.FC<IModalGallery> = ({
	isOpenedGalleryModal,
	closeGalleryModal,
	currentImage,
	imagesList,
	setCurrentImage,
	cssMax,
	pointsCount,
	pointColor,
	arrowColor,
	arrowHoverColor,
	modalBackgroundColor,
	modalOverlayColor,
	modalOverlayOpacity,
	modalOverlayBlur,
	modalOverlayShadow,
	modalOverlayTransition,
	modalOverlayTransitionDuration,
	cardBorderWidth,
	cardBorderColor,
}) => {
	const imageRef = useRef<HTMLDivElement>(null);
	const barRef = useRef<HTMLDivElement | null>(null);
	const [modalWidth, setModalWidth] = useState<number>(936);

	const totalImages = Object.keys(imagesList).length;

	useEffect(() => {
		if (!isOpenedGalleryModal) return;
		if (currentImage <= pointsCount - 1) return;
		const bar = barRef.current;
		if (!bar) return;

		const translate: number = Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
		if (!translate) {
			if (currentImage < totalImages) {
				bar.style.transform = `translateX(${-32 * (currentImage - (pointsCount - 1))}px)`;
			} else {
				bar.style.transform = `translateX(${-32 * (currentImage - pointsCount)}px)`;
			}
		}
	}, [isOpenedGalleryModal, currentImage, pointsCount, totalImages]);

	const slide = (side: 'left' | 'right') => {
		const bar = barRef.current;
		if (currentImage === 1 && side === 'left') return;
		if (currentImage === totalImages && side === 'right') return;
		const newCurrentImage = side === 'left' ? currentImage - 1 : currentImage + 1;

		if (side === 'left' && currentImage !== 1) {
			if (bar && currentImage < totalImages - (pointsCount - 3) && currentImage > 2) {
				const translate: number =
					Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
				if ((currentImage * 32 + translate) / 32 <= 2) {
					bar.style.transform = `translateX(${32 + translate}px)`;
				}
			}
		} else if (side === 'right' && currentImage !== totalImages) {
			if (bar && currentImage > pointsCount - 2 && currentImage < totalImages - 1) {
				const translate: number =
					Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
				if ((currentImage * 32 + translate) / 32 > pointsCount - 2) {
					bar.style.transform = `translateX(${-32 + translate}px)`;
				}
			}
		}
		setCurrentImage(newCurrentImage);
	};

	const setWidth = (e: React.SyntheticEvent<HTMLImageElement>) => {
		setModalWidth(e.currentTarget.offsetWidth);
	};

	return (
		<ModalBox
			$cssMax={cssMax}
			cssMax={cssMax}
			maxWidth={`${modalWidth}px`}
			modalBackgroundColor={modalBackgroundColor}
			modalOverlayColor={modalOverlayColor}
			modalOverlayOpacity={modalOverlayOpacity}
			modalOverlayBlur={modalOverlayBlur}
			modalOverlayShadow={modalOverlayShadow}
			modalOverlayTransition={modalOverlayTransition}
			modalOverlayTransitionDuration={modalOverlayTransitionDuration}
			header={{
				type: 'custom',
				content: <></>,
			}}
			onCancel={() => {
				const bar = barRef.current;
				if (bar) {
					const translate: number =
						Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
					bar.style.transform = `translateX(${-translate}px)`;
				}
				closeGalleryModal();
			}}
			isOpened={isOpenedGalleryModal}
			frameless
		>
			<ImageWrapper $cssMax={cssMax} ref={imageRef} id="image-gallery" $cardBorderWidth={cardBorderWidth} $cardBorderColor={cardBorderColor}>
				<img
					src={(imagesList as any)[currentImage] as string}
					alt="novatar"
					onLoad={setWidth}
				/>
			</ImageWrapper>
			<NavigationWrapper>
				<NavigationButton
					$active={currentImage > 1}
					$left={true}
					$hoverColor={arrowHoverColor}
					onClick={() => slide('left')}
				>
					<ArrowRightIcon color={arrowColor} />
				</NavigationButton>
				<ProgressBarVisible $pointsCount={pointsCount} id="scrollable-wrap">
					<ProgressBar
						style={{ width: `${32 * totalImages}px` }}
						id="scrollable-bar"
						ref={barRef}
					>
						{Array.from({ length: totalImages }, (_, i) => i).map((i) => (
							<ProgressPoint
								key={i}
								$active={currentImage === i + 1}
								$pointColor={pointColor}
							/>
						))}
					</ProgressBar>
				</ProgressBarVisible>
				<NavigationButton
					$active={currentImage < totalImages}
					$hoverColor={arrowHoverColor}
					onClick={() => slide('right')}
				>
					<ArrowRightIcon color={arrowColor} />
				</NavigationButton>
			</NavigationWrapper>
		</ModalBox>
	);
};

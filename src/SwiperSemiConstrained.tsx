import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ConstrainedBox } from './components/constraints/ConstrainedBox';
import { Card } from './components/card/Card';
import { ModalGallery } from './components/modalGallery/ModalGallery';
import { ArrowRightIcon } from './components/icons/ArrowRightIcon';
import {
	Section,
	List,
	SliderList,
	SliderConstraintWrapper,
	SliderConstraintInner,
	NavigationWrapper,
	NavigationButton,
	ProgressBarVisible,
	ProgressBar,
	ProgressPoint,
  } from './SwiperSemiConstrained.styles';

export interface ICssMax {
	MOBILE_MAX: number;
	TABLET_MAX: number;
	LAPTOP_MAX: number;
	DESKTOP_MAX: number;
}

export interface IBreakpoints {
	mobile: number;
	tablet: number;
	laptop: number;
	desktop: number;
	large: number;
}
export interface CardGallerySwiperProps {
	imageUrls: Record<number, string>;
	withModal?: boolean;
	pointsCountDefault?: 3 | 4 | 5 | 6;
	pointsType?: 'circle' | 'square';
	pointSize?: number;
	pointsGap?: number;
	fullScreenMode?: boolean;
	spaceBetween?: IBreakpoints;
	breakpoints?: IBreakpoints;
	containerMaxWidths?: IBreakpoints;
	className?: string;
	arrowColor?: string;
	arrowHoverColor?: string;
	pointColor?: string;
	cardWidths?: IBreakpoints;
	cardHeights?: IBreakpoints;
	cardClassName?: string;
	cardBorderWidth?: number;
	cardBorderColor?: string;
	cardShimmerColor?: string;
	modalArrowColor?: string;
	modalPointColor?: string;
	modalClassName?: string;
	modalExitClassName?: string;
	modalArrowHoverColor?: string;
	modalBackgroundColor?: string;
	modalOverlayColor?: string;
	modalOverlayOpacity?: number;
	modalOverlayBlur?: number;
	modalOverlayShadow?: string;
	modalOverlayTransition?: string;
	modalOverlayTransitionDuration?: number;
	modalImageWidths?: IBreakpoints;
	modalImageHeights?: IBreakpoints;
}

export const CardGallerySwiper: React.FC<CardGallerySwiperProps> = ({
	withModal = true,
	spaceBetween = {
		mobile: 12,
		tablet: 24,
		laptop: 24,
		desktop: 24,
		large: 24,
	},
	pointsCountDefault = 5,
	pointsType = 'circle',
	pointSize = 10,
	pointsGap = 10,
	imageUrls,
	className,
	fullScreenMode = true,
	breakpoints = {
		mobile: 360,
		tablet: 768,
		laptop: 1280,
		desktop: 1440,
		large: 1920,
	},
	containerMaxWidths = {
		mobile: 360,
		tablet: 688,
		laptop: 1040,
		desktop: 1128,
		large: 1440,
	},
	cardWidths = {
		mobile: 288,
		tablet: 300,
		laptop: 300,
		desktop: 400,
		large: 400,
	},
	cardHeights = {
		mobile: 288,
		tablet: 300,
		laptop: 300,
		desktop: 400,
		large: 400,
	},
	arrowColor = '#2D2926',
	pointColor = '#D1CDC7',
	arrowHoverColor = '#8C7355',
	modalBackgroundColor = 'transparent',
	modalOverlayColor = 'rgba(45, 41, 38, 0.85)',
	modalArrowColor = '#FFFFFF',
	modalPointColor = 'rgba(255, 255, 255, 0.3)',
	modalArrowHoverColor = '#D4AF37',
	modalOverlayOpacity = 1,
	modalOverlayBlur = 5,
	modalOverlayShadow = 'none',
	modalOverlayTransition = 'all 0.3s ease-in-out',
	modalOverlayTransitionDuration = 300,
	modalClassName = "",
	modalExitClassName = "",
	modalImageWidths = {
		mobile: 328,
		tablet: 504,
		laptop: 504,
		desktop: 504,
		large: 504,
	},
	modalImageHeights = {
		mobile: 328,
		tablet: 504,
		laptop: 504,
		desktop: 504,
		large: 504,
	},
	cardClassName = "",
	cardBorderWidth = 2,
	cardBorderColor = '#E5E2DF',
	cardShimmerColor,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentActivePoint, setCurrentActivePoint] = useState(1);
	const [currentImage, setCurrentImage] = useState(1);
	const [viewportWidth, setViewportWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : breakpoints.desktop
	);
	const sliderElement = useRef<HTMLDivElement>(null);
	const sliderContentWrapper = useRef<HTMLDivElement>(null);
	const sliderNavElement = useRef<HTMLDivElement>(null);
	const scrollRafRef = useRef<number | null>(null);

	const delta = pointSize + pointsGap;

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const handleResize = () => setViewportWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const breakValue = React.useMemo(
		() =>
			Object.values(breakpoints)
				.filter((breakpoint) => breakpoint <= viewportWidth)
				.reduce((max, curr) => (curr > max ? curr : max), -Infinity),
		[breakpoints, viewportWidth]
	);

	const device = Object.keys(breakpoints).find(
		(key) => breakpoints[key as keyof typeof breakpoints] === breakValue
	);

	const spaceBetweenValue = spaceBetween[device as keyof typeof spaceBetween] || spaceBetween.mobile;
	const containerMaxWidth = containerMaxWidths[device as keyof typeof containerMaxWidths] || Math.min(viewportWidth - spaceBetweenValue * 2, containerMaxWidths.mobile);
	const cardWidth = cardWidths[device as keyof typeof cardWidths] || Math.min(cardWidths.mobile, containerMaxWidth);
	const cardHeight = cardHeights[device as keyof typeof cardHeights] || Math.min(cardHeights.mobile, containerMaxWidth);
	const modalImageWidth = modalImageWidths[device as keyof typeof modalImageWidths] || Math.min(modalImageWidths.mobile, containerMaxWidth);
	const modalImageHeight = modalImageHeights[device as keyof typeof modalImageHeights] || Math.min(modalImageHeights.mobile, containerMaxWidth);
	const cardCount = Object.keys(imageUrls).length;
	const slidesPerView = Math.floor(containerMaxWidth / cardWidth) || 1;
	const totalSlides = Math.ceil(cardCount / slidesPerView) || 1;
	const pointsCount = Math.min(totalSlides, pointsCountDefault);

	const onClickImage = (id: number) => {
		if (!withModal) return;
		setCurrentImage(id);
		setIsModalOpen(true);
	}

	const onSlide = (side: 'left' | 'right') => {
		if (!(sliderElement?.current && sliderContentWrapper?.current)) return;
		const wrapperWidth = sliderContentWrapper.current.getBoundingClientRect().width;
		const scrollWidth = (wrapperWidth + spaceBetweenValue) * slidesPerView;
		const newScroll = side === 'right' ? (currentActivePoint - 1) * scrollWidth + scrollWidth : (currentActivePoint - 1) * scrollWidth - scrollWidth;

		sliderElement.current.scrollTo({
			top: 0,
			left: newScroll,
			behavior: 'smooth',
		});
	};

	const bar = sliderNavElement.current;
	if (currentActivePoint > pointsCount - 1 && bar) {
		const translate: number = Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
		if (!translate) {
			if (currentActivePoint < totalSlides) {
				bar.style.transform = `translateX(${-delta * (currentActivePoint - (pointsCount - 1))}px)`;
			} else {
				bar.style.transform = `translateX(${-delta * (currentActivePoint - pointsCount)}px)`;
			}
		}
	}

	const runScrollUpdate = useCallback(() => {
		if (!sliderElement?.current || !sliderContentWrapper.current) return;
		const wrapperWidth = sliderContentWrapper.current.getBoundingClientRect().width;
		const scrollLeft = sliderElement.current.scrollLeft;
		const scrollableWidth = (wrapperWidth + spaceBetweenValue) * slidesPerView;
		const percent = (scrollLeft / scrollableWidth) / 100;
		const pointPercent = 100 * percent;
		let activePoint = (Math.round(pointPercent) + 1) || 1;

		const maxScrollLeft = (cardWidth + spaceBetweenValue) * cardCount - spaceBetweenValue - containerMaxWidth;

		if (Math.round(scrollLeft) === Math.round(maxScrollLeft)) {
			activePoint = totalSlides;
		}
		if (activePoint > totalSlides) {
			activePoint = totalSlides;
		}
		if (scrollLeft === 0) {
			activePoint = 1;
		}

		const bar = sliderNavElement.current;
		if (totalSlides <= pointsCount) {
			setCurrentActivePoint(activePoint);
			scrollRafRef.current = null;
			return;
		}
		if (currentActivePoint > activePoint && activePoint > 1 && bar && activePoint < totalSlides - 1) {
			const translate: number = Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
			const direction = currentActivePoint - activePoint;
			if ((activePoint * delta + translate) / delta <= 1) {
				bar.style.transform = `translateX(${delta * (direction) + translate}px)`;
			}
		}
		if (currentActivePoint <= activePoint && activePoint < totalSlides && bar && activePoint > pointsCount - 2) {
			const translate: number = Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
			const direction = activePoint - currentActivePoint;
			if ((activePoint * delta + translate) / delta > pointsCount - 1) {
				bar.style.transform = `translateX(${-delta * (direction) + translate}px)`;
			}
		}
		if (bar && activePoint === totalSlides) {
			bar.style.transform = `translateX(${-delta * (totalSlides - pointsCount)}px)`;
		}
		if (bar && activePoint === 1) {
			bar.style.transform = `translateX(${0}px)`;
		}
		setCurrentActivePoint(activePoint);
		scrollRafRef.current = null;
	}, [
		spaceBetweenValue,
		slidesPerView,
		cardWidth,
		cardCount,
		containerMaxWidth,
		totalSlides,
		pointsCount,
		currentActivePoint,
	]);

	const onScroll = useCallback(() => {
		if (scrollRafRef.current !== null) return;
		scrollRafRef.current = requestAnimationFrame(runScrollUpdate);
	}, [runScrollUpdate]);

	useEffect(() => () => {
		if (scrollRafRef.current !== null) {
			cancelAnimationFrame(scrollRafRef.current);
		}
	}, []);

	const cssMax = {
		MOBILE_MAX: breakpoints.tablet - 1,
		TABLET_MAX: breakpoints.laptop - 1,
		LAPTOP_MAX: breakpoints.desktop - 1,
		DESKTOP_MAX: breakpoints.large - 1,
	}

	return (
		<>
			<Section className={className}>
				<List $cssMax={cssMax}>
					<SliderList ref={sliderElement} onScroll={onScroll} $cssMax={cssMax}>
						<SliderConstraintWrapper containerMaxWidth={containerMaxWidth}>
							<SliderConstraintInner ref={sliderContentWrapper} $cssMax={cssMax} $containerMaxWidth={containerMaxWidth} $cardWidth={cardWidth} $cardHeight={cardHeight} $spaceBetween={spaceBetweenValue} $fullScreenMode={fullScreenMode}>
								{Array.from({ length: cardCount }, (_, idx) => idx + 1).map((i) => (
									<Card
										imageUrl={imageUrls[i]}
										id={i}
										key={i}
										onClickImage={() => onClickImage(i)}
										cssMax={cssMax}
										className={cardClassName}
										borderWidth={cardBorderWidth}
										borderColor={cardBorderColor}
										shimmerColor={cardShimmerColor}
										clickable={withModal}
									/>
								))}
							</SliderConstraintInner>
						</SliderConstraintWrapper>
					</SliderList>
				</List>
				{pointsCount > 1 && (
					<ConstrainedBox containerMaxWidth={containerMaxWidth}>
						<NavigationWrapper>
							<NavigationButton aria-label="Previous slides" $active={currentActivePoint > 1} $left={true} $hoverColor={arrowHoverColor} onClick={() => currentActivePoint > 1 && onSlide('left')}>
								<ArrowRightIcon color={arrowColor} />
							</NavigationButton>
							<ProgressBarVisible $pointsCount={pointsCount} $delta={delta}>
								<ProgressBar
									style={{ width: `${delta * totalSlides + 6}px` }}
									ref={sliderNavElement}
								>
									{Array.from({ length: totalSlides }, (_, idx) => idx + 1).map((i) => (
										<ProgressPoint
											key={i}
											$active={currentActivePoint === i}
											$pointColor={pointColor}
											$pointsType={pointsType}
											$pointSize={pointSize}
											$pointsGap={pointsGap}
										/>
									))}
								</ProgressBar>
							</ProgressBarVisible>
							<NavigationButton
								aria-label="Next slides"
								$active={currentActivePoint < totalSlides}
								$hoverColor={arrowHoverColor}
								onClick={() => currentActivePoint < totalSlides && onSlide('right')}
							>
								<ArrowRightIcon color={arrowColor} />
							</NavigationButton>
						</NavigationWrapper>
					</ConstrainedBox>
				)}
			</Section>
			{withModal && (
				<ModalGallery
					isOpenedGalleryModal={isModalOpen}
					closeGalleryModal={() => setIsModalOpen(false)}
					currentImage={currentImage}
					imagesList={imageUrls}
					setCurrentImage={setCurrentImage}
					cssMax={cssMax}
					pointsCount={Math.min(cardCount, pointsCountDefault)}
					pointColor={modalPointColor}
					arrowColor={modalArrowColor}
					arrowHoverColor={modalArrowHoverColor}
					modalBackgroundColor={modalBackgroundColor}
					modalOverlayColor={modalOverlayColor}
					modalOverlayOpacity={modalOverlayOpacity}
					modalOverlayBlur={modalOverlayBlur}
					modalOverlayShadow={modalOverlayShadow}
					modalOverlayTransition={modalOverlayTransition}
					modalOverlayTransitionDuration={modalOverlayTransitionDuration}
					modalImageWidth={modalImageWidth}
					modalImageHeight={modalImageHeight}
					cardBorderWidth={cardBorderWidth}
					cardBorderColor={cardBorderColor}
					delta={delta}
					pointsGap={pointsGap}
					pointSize={pointSize}
					pointsType={pointsType}
					className={modalClassName}
					exitClassName={modalExitClassName}
				/>
			)}
		</>
	);
};

// Backwards-compatible alias
export { CardGallerySwiper as SwiperSemiConstrained };

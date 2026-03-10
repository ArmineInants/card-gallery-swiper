import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ConstrainedBox } from './components/constraints/ConstrainedBox';
import { Card } from './components/card/Card';
import { ModalGallery } from './components/modalGallery/ModalGallery';
import { ArrowRightIcon } from './components/icons/ArrowRightIcon';
import {
	Section,
	NovatarList,
	SliderList,
	SliderConstraintWrapper,
	SliderConstraintInner,
	NavigationWrapper,
	NavigationButton,
	ProgressBarVisible,
	ProgressBar,
	ProgressPoint,
	ModalContainer,
  } from './SwiperSemiConstrained.styles';

export interface ICssMax {
	MOBILE_MAX: number;
	TABLET_MAX: number;
	LAPTOP_MAX: number;
}

export interface IBreakpoints {
	mobile: number;
	tablet: number;
	laptop: number;
	desktop: number;
}


export interface CardGallerySwiperProps {
	imageUrls: Record<number, string>;
	slidesPerView?: number;
	pointsCount?: 3 | 4 | 5 | 6;
	pointsType?: 'circle' | 'square';
	pointSize?: number;
	pointsGap?: number;
	spaceBetween?: IBreakpoints;
	breakpoints?: IBreakpoints;
	containerMaxWidths?: IBreakpoints;
	cardWidths?: IBreakpoints;
	cardHeights?: IBreakpoints;
	className?: string;
	arrowColor?: string;
	arrowHoverColor?: string;
	pointColor?: string;
	modalBackgroundColor?: string;
	modalOverlayColor?: string;
	modalOverlayOpacity?: number;
	modalOverlayBlur?: number;
	modalOverlayShadow?: string;
	modalOverlayTransition?: string;
	modalOverlayTransitionDuration?: number;
	cardClassName?: string;
	cardBorderWidth?: number;
	cardBorderColor?: string;
}

export const CardGallerySwiper: React.FC<CardGallerySwiperProps> = ({
	slidesPerView,
	spaceBetween = {
		mobile: 12,
		tablet: 24,
		laptop: 24,
		desktop: 24,
	},
	pointsCount = 5,
	pointsType = 'circle',
	pointSize = 10,
	pointsGap = 10,
	imageUrls,
	className,
	breakpoints = {
		mobile: 360,
		tablet: 768,
		laptop: 1280,
		desktop: 1440,
	},
	containerMaxWidths = {
		mobile: 360,
		tablet: 688,
		laptop: 1040,
		desktop: 1128,
	},
	cardWidths = {
		mobile: 288,
		tablet: 300,
		laptop: 300,
		desktop: 400,
	},
	cardHeights = {
		mobile: 288,
		tablet: 300,
		laptop: 300,
		desktop: 400,
	},
	arrowColor = '#ffffff',
	pointColor = '#56CCF2',
	arrowHoverColor = '#56CCF2',
	modalBackgroundColor = 'transparent',
	modalOverlayColor = 'rgba(34, 27, 88, 0.92)',
	modalOverlayOpacity = 1,
	modalOverlayBlur = 0,
	modalOverlayShadow = '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
	modalOverlayTransition = 'all 0.3s ease-in-out',
	modalOverlayTransitionDuration = 300,
	cardClassName,
	cardBorderWidth = 2,
	cardBorderColor = '#251f97',
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

	const containerMaxWidth = containerMaxWidths[device as keyof typeof containerMaxWidths];
	const cardWidth = cardWidths[device as keyof typeof cardWidths];
	const cardHeight = cardHeights[device as keyof typeof cardHeights];
	const cardCount = Object.keys(imageUrls).length;
	const slidesPerViewValue = slidesPerView || Math.floor(containerMaxWidth / cardWidth);
	const totalSlides = Math.ceil(cardCount / slidesPerViewValue);
	const spaceBetweenValue = spaceBetween[device as keyof typeof spaceBetween];

	const onClickImage = (id: number) => {
		setCurrentImage(id);
		setIsModalOpen(true);
	}

	const onSlide = (side: 'left' | 'right') => {
		if (!(sliderElement?.current && sliderContentWrapper?.current)) return;
		const wrapperWidth = sliderContentWrapper.current.getBoundingClientRect().width;
		const scrollWidth = (wrapperWidth + spaceBetweenValue) * slidesPerViewValue;
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
		const scrollableWidth = (wrapperWidth + spaceBetweenValue) * slidesPerViewValue;
		const percent = (scrollLeft / scrollableWidth) / 100;
		const pointPercent = 100 * percent;
		let activePoint = (Math.round(pointPercent) + 1) || 1;

		if (scrollLeft === (cardWidth + spaceBetweenValue) * cardCount - spaceBetweenValue - containerMaxWidth) {
			activePoint = totalSlides;
		}
		if (activePoint > totalSlides) {
			activePoint = totalSlides;
		}
		if (scrollLeft === 0) {
			activePoint = 1;
		}

		const bar = sliderNavElement.current;
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
		slidesPerViewValue,
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
	}

	return (
		<>
			<Section className={className}>
				<NovatarList $cssMax={cssMax}>
					<SliderList ref={sliderElement} onScroll={onScroll} $cssMax={cssMax}>
						<SliderConstraintWrapper containerMaxWidth={containerMaxWidth}>
							<SliderConstraintInner ref={sliderContentWrapper} $cssMax={cssMax} $containerMaxWidths={containerMaxWidths} $cardWidth={cardWidth} $cardHeight={cardHeight} $spaceBetween={spaceBetweenValue}>
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
									/>
								))}
							</SliderConstraintInner>
						</SliderConstraintWrapper>
					</SliderList>
				</NovatarList>
				<ConstrainedBox containerMaxWidth={containerMaxWidth}>
					<NavigationWrapper>
						<NavigationButton aria-label="Previous slides" $active={currentActivePoint > 1} $left={true} $hoverColor={arrowHoverColor} onClick={() => currentActivePoint > 1 && onSlide('left')}>
							<ArrowRightIcon color={arrowColor} />
						</NavigationButton>
						<ProgressBarVisible $pointsCount={pointsCount} $delta={delta}>
							<ProgressBar
								style={{ width: `${delta * totalSlides + ((pointSize + pointsGap/2) * pointsCount) / totalSlides}px` }}
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
			</Section>
			<ModalContainer style={{ display: isModalOpen ? 'block' : 'none' }}>
				<ModalGallery
					isOpenedGalleryModal={isModalOpen}
					closeGalleryModal={() => setIsModalOpen(false)}
					currentImage={currentImage}
					imagesList={imageUrls}
					setCurrentImage={setCurrentImage}
					cssMax={cssMax}
					pointsCount={pointsCount}
					pointColor={pointColor}
					arrowColor={arrowColor}
					arrowHoverColor={arrowHoverColor}
					modalBackgroundColor={modalBackgroundColor}
					modalOverlayColor={modalOverlayColor}
					modalOverlayOpacity={modalOverlayOpacity}
					modalOverlayBlur={modalOverlayBlur}
					modalOverlayShadow={modalOverlayShadow}
					modalOverlayTransition={modalOverlayTransition}
					modalOverlayTransitionDuration={modalOverlayTransitionDuration}
					cardBorderWidth={cardBorderWidth}
					cardBorderColor={cardBorderColor}
					delta={delta}
					pointsGap={pointsGap}
					pointSize={pointSize}
					pointsType={pointsType}
				/>
			</ModalContainer>
		</>
	);
};

// Backwards-compatible alias
export { CardGallerySwiper as SwiperSemiConstrained };

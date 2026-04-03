import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { ICssMax } from '../../SwiperSemiConstrained';
import {
	ModalOverlay,
	ModalBox,
	ModalHeaderExit,
	ModalContent,
	ImageWrapper,
} from './ModalGalery.styles';
import Image from '../Image/Image';
import { ExitIcon } from '../icons/ExitIcon';

import { NavigationWrapper, NavigationButton, ProgressBarVisible, ProgressBar, ProgressPoint} from '../../SwiperSemiConstrained.styles';

let bodyScrollLockCount = 0;
let bodyScrollLockPrevStyles: { overflow: string; paddingRight: string } | null = null;

function lockBodyScroll() {
	if (typeof document === 'undefined') return;
	const body = document.body;

	if (bodyScrollLockCount === 0) {
		bodyScrollLockPrevStyles = {
			overflow: body.style.overflow,
			paddingRight: body.style.paddingRight,
		};

		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		body.style.overflow = 'hidden';
		if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
	}

	bodyScrollLockCount += 1;
}

function unlockBodyScroll() {
	if (typeof document === 'undefined') return;
	if (bodyScrollLockCount === 0) return;

	bodyScrollLockCount -= 1;
	if (bodyScrollLockCount > 0) return;

	const body = document.body;
	body.style.overflow = bodyScrollLockPrevStyles?.overflow ?? '';
	body.style.paddingRight = bodyScrollLockPrevStyles?.paddingRight ?? '';
	bodyScrollLockPrevStyles = null;
}

function getFocusableElements(root: HTMLElement) {
	const selector = [
		'a[href]',
		'button:not([disabled])',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'[tabindex]:not([tabindex="-1"])',
	].join(',');

	return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
		(el) => !el.hasAttribute('disabled') && el.tabIndex !== -1 && !el.getAttribute('aria-hidden')
	);
}

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
	navigationButtonSize: number;
	modalBackgroundColor: string;
	modalOverlayColor: string;
	modalOverlayOpacity: number;
	modalOverlayBlur: number;
	modalOverlayShadow: string;
	modalOverlayTransition: string;
	modalOverlayTransitionDuration: number;
	modalImageWidth: number;
	modalImageHeight: number;
	cardBorderWidth: number;
	cardBorderColor: string;
	shimmerColor?: string;
	delta: number;
	pointsGap: number;
	pointSize: number;
	pointsType: 'circle' | 'square';
	className: string;
	exitClassName: string;
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
	navigationButtonSize,
	modalBackgroundColor,
	modalOverlayColor,
	modalOverlayOpacity,
	modalOverlayBlur,
	modalOverlayShadow,
	modalOverlayTransition,
	modalOverlayTransitionDuration,
	modalImageWidth,
	modalImageHeight,
	cardBorderWidth,
	cardBorderColor,
	shimmerColor,
	delta,
	pointsGap,
	pointSize,
	pointsType,
	className,
	exitClassName,
}) => {
	const imageRef = useRef<HTMLDivElement>(null);
	const modalBoxRef = useRef<HTMLDivElement | null>(null);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const lastFocusedElementRef = useRef<HTMLElement | null>(null);
	const barRef = useRef<HTMLDivElement | null>(null);
	const modalWidth = 936;
	const isClosingRef = useRef(false);
	const closeFallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [contentOpen, setContentOpen] = useState(false);
	const contentOpenRef = useRef(false);
	contentOpenRef.current = contentOpen;

	const totalImages = Object.keys(imagesList).length;

	const finishClose = useCallback(() => {
		if (!isClosingRef.current) return;
		isClosingRef.current = false;
		if (closeFallbackTimerRef.current) {
			clearTimeout(closeFallbackTimerRef.current);
			closeFallbackTimerRef.current = null;
		}
		const bar = barRef.current;
		if (bar) {
			const translate: number =
				Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
			bar.style.transform = `translateX(${-translate}px)`;
		}
		closeGalleryModal();
	}, [closeGalleryModal]);

	const startCloseAnimation = useCallback(() => {
		if (isClosingRef.current) return;
		if (!contentOpenRef.current) return;
		isClosingRef.current = true;
		setContentOpen(false);
		const ms = modalOverlayTransitionDuration + 100;
		closeFallbackTimerRef.current = setTimeout(() => {
			closeFallbackTimerRef.current = null;
			finishClose();
		}, ms);
	}, [modalOverlayTransitionDuration, finishClose]);

	const handleOverlayTransitionEnd = useCallback(
		(e: React.TransitionEvent<HTMLDivElement>) => {
			if (e.target !== e.currentTarget) return;
			if (e.propertyName !== 'opacity') return;
			if (!isClosingRef.current) return;
			if (closeFallbackTimerRef.current) {
				clearTimeout(closeFallbackTimerRef.current);
				closeFallbackTimerRef.current = null;
			}
			finishClose();
		},
		[finishClose]
	);

	useLayoutEffect(() => {
		if (!isOpenedGalleryModal) return;
		isClosingRef.current = false;
		setContentOpen(false);
		// One frame is enough after layout: browser commits opacity 0, then we animate open.
		const id = requestAnimationFrame(() => setContentOpen(true));
		return () => cancelAnimationFrame(id);
	}, [isOpenedGalleryModal]);

	useEffect(() => {
		return () => {
			if (closeFallbackTimerRef.current) {
				clearTimeout(closeFallbackTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (isOpenedGalleryModal) {
			lockBodyScroll();
		} else {
			unlockBodyScroll();
		}

		return () => {
			if (isOpenedGalleryModal) unlockBodyScroll();
		};
	}, [isOpenedGalleryModal]);

	useEffect(() => {
		if (!isOpenedGalleryModal) return;
		if (currentImage <= pointsCount - 1) return;
		const bar = barRef.current;
		if (!bar) return;

		const translate: number = Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
		if (!translate) {
			if (currentImage < totalImages) {
				bar.style.transform = `translateX(${-delta * (currentImage - (pointsCount - 1))}px)`;
			} else {
				bar.style.transform = `translateX(${-delta * (currentImage - pointsCount)}px)`;
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
				if ((currentImage * delta + translate) / delta <= 2) {
					bar.style.transform = `translateX(${delta + translate}px)`;
				}
			}
		} else if (side === 'right' && currentImage !== totalImages) {
			if (bar && currentImage > pointsCount - 2 && currentImage < totalImages - 1) {
				const translate: number =
					Number(bar.style.transform.substring(11).slice(0, -3)) || 0;
				if ((currentImage * delta + translate) / delta > pointsCount - 2) {
					bar.style.transform = `translateX(${-delta + translate}px)`;
				}
			}
		}
		setCurrentImage(newCurrentImage);
	};

	useEffect(() => {
		if (typeof document === 'undefined') return;
		if (!isOpenedGalleryModal || !contentOpen) return;

		lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
		const focusTimer = window.setTimeout(() => {
			closeBtnRef.current?.focus();
		}, modalOverlayTransitionDuration);

		return () => {
			clearTimeout(focusTimer);
		};
	}, [isOpenedGalleryModal, contentOpen, modalOverlayTransitionDuration]);

	useEffect(() => {
		if (typeof document === 'undefined') return;
		if (!isOpenedGalleryModal) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				startCloseAnimation();
				return;
			}

			if (e.key === 'Tab') {
				const root = modalBoxRef.current;
				if (!root) return;
				const focusables = getFocusableElements(root);
				if (focusables.length === 0) {
					e.preventDefault();
					closeBtnRef.current?.focus();
					return;
				}

				const first = focusables[0];
				const last = focusables[focusables.length - 1];
				const active = document.activeElement as HTMLElement | null;

				if (e.shiftKey) {
					if (!active || active === first || !root.contains(active)) {
						e.preventDefault();
						last.focus();
					}
				} else {
					if (!active || active === last || !root.contains(active)) {
						e.preventDefault();
						first.focus();
					}
				}
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			lastFocusedElementRef.current?.focus?.();
			lastFocusedElementRef.current = null;
		};
	}, [isOpenedGalleryModal, startCloseAnimation]);

	if (!isOpenedGalleryModal) return null;

	/** Portal to `document.body` so `position: fixed` + z-index are not trapped by parent stacking contexts (transform/filter/z-index). */
	const modalUi = (
		<ModalOverlay
			className={className}
			$cssMax={cssMax}
			$overlayColor={modalOverlayColor}
			$overlayOpacity={modalOverlayOpacity}
			$overlayBlur={modalOverlayBlur}
			$contentOpen={contentOpen}
			$durationMs={modalOverlayTransitionDuration}
			onMouseDown={startCloseAnimation}
			onTransitionEnd={handleOverlayTransitionEnd}
			role="presentation"
		>
			<ModalBox
				ref={modalBoxRef}
				$cssMax={cssMax}
				$maxWidth={`${modalWidth}px`}
				$backgroundColor={modalBackgroundColor}
				$shadow={modalOverlayShadow}
				$transition={modalOverlayTransition}
				$transitionDuration={modalOverlayTransitionDuration}
				$contentOpen={contentOpen}
				$durationMs={modalOverlayTransitionDuration}
				onMouseDown={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label="Image gallery"
			>
				<ModalHeaderExit
					ref={closeBtnRef}
					type="button"
					aria-label="Close modal"
					onClick={startCloseAnimation}
					className={exitClassName}
					$cssMax={cssMax}
					$arrowColor={arrowColor}
					$arrowHoverColor={arrowHoverColor}
				>
					<ExitIcon />
				</ModalHeaderExit>

				<ModalContent $cssMax={cssMax}>
					<ImageWrapper
						$cssMax={cssMax}
						ref={imageRef}
						id="image-gallery"
						$cardBorderWidth={cardBorderWidth}
						$cardBorderColor={cardBorderColor}
						$modalImageWidth={modalImageWidth}
						$modalImageHeight={modalImageHeight}
					>
						<Image
							id={`modal-${currentImage}`}
							shimmerColor={shimmerColor ?? cardBorderColor}
							url={(imagesList as any)[currentImage] as string}
							alt="image"
							loading="eager"
							withShimmer
						/>
					</ImageWrapper>
					{pointsCount > 1 && (
						<NavigationWrapper $size={navigationButtonSize}>
							<NavigationButton
								aria-label="Previous slides"
								$active={currentImage > 1}
								$left={true}
								$hoverColor={arrowHoverColor}
								$size={navigationButtonSize}
								onClick={() => slide('left')}
							>
								<ArrowRightIcon color={arrowColor} />
							</NavigationButton>
							<ProgressBarVisible $pointsCount={pointsCount} $delta={delta} id="scrollable-wrap" >
								<ProgressBar
									style={{ width: `${delta * totalImages + 6}px` }}
									id="scrollable-bar"
									ref={barRef}
								>
									{Array.from({ length: totalImages }, (_, i) => i).map((i) => (
										<ProgressPoint
											key={i}
											$active={currentImage === i + 1}
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
								$active={currentImage < totalImages}
								$hoverColor={arrowHoverColor}
								$size={navigationButtonSize}
								onClick={() => slide('right')}
							>
								<ArrowRightIcon color={arrowColor} />
							</NavigationButton>
						</NavigationWrapper>
					)}
				</ModalContent>
			</ModalBox>
		</ModalOverlay>
	);

	if (typeof document === 'undefined') {
		return null;
	}

	return createPortal(modalUi, document.body);
};

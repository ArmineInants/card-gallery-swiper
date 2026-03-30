import React, { createRef, useEffect, useRef } from 'react';
import { WindowHandler, EWindowEvent } from '../../utils/WindowHandler';
import { ExitIcon } from '../icons/ExitIcon';
import {
	ModalWrapper,
	ModalBox,
	ModalHeaderExit,
	ModalContent,
} from './Modal.styles';
import { ICssMax } from '../../SwiperSemiConstrained';

interface IModalProps {
	isOpened: boolean;
	onCancel: () => void;
	header: {
		type: 'custom';
		content: React.ReactElement | string;
	};
	maxWidth?: string;
	className?: string;
	frameless?: boolean;
	cssMax: ICssMax;
	modalBackgroundColor: string;
	modalOverlayColor: string;
	modalOverlayOpacity: number;
	modalOverlayBlur: number;
	modalOverlayShadow: string;
	modalOverlayTransition: string;
	modalOverlayTransitionDuration: number;
	arrowColor: string;
	arrowHoverColor: string;
	children?: React.ReactNode;
}

export const Modal: React.FC<IModalProps> = ({
	header,
	isOpened,
	onCancel,
	children,
	frameless = false,
	className,
	cssMax,
	modalBackgroundColor,
	modalOverlayColor,
	modalOverlayOpacity,
	modalOverlayBlur,
	modalOverlayShadow,
	modalOverlayTransition,
	modalOverlayTransitionDuration,
	arrowColor,
	arrowHoverColor,
}) => {
	const modalWrapperRef = useRef<HTMLDivElement | null>(null);
	const modalContentRef = createRef<HTMLDivElement>();
	const prevBodyStylesRef = useRef<{
		overflow: string;
		paddingRight: string;
	}>({
		overflow: '',
		paddingRight: '',
	});

	useEffect(() => {
		if (typeof document === 'undefined') return;
		const body = document.body;

		if (isOpened) {
			prevBodyStylesRef.current = {
				overflow: body.style.overflow,
				paddingRight: body.style.paddingRight,
			};

			// Lock background scroll while modal is open.
			// Add scrollbar compensation to avoid layout shift.
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
			body.style.overflow = 'hidden';
			if (scrollbarWidth > 0) {
				body.style.paddingRight = `${scrollbarWidth}px`;
			}
		} else {
			body.style.overflow = prevBodyStylesRef.current.overflow;
			body.style.paddingRight = prevBodyStylesRef.current.paddingRight;
		}

		modalContentRef.current?.scrollTo({ top: 0 });
		return () => {
			// Ensure we restore scroll even if the modal unmounts while open.
			body.style.overflow = prevBodyStylesRef.current.overflow;
			body.style.paddingRight = prevBodyStylesRef.current.paddingRight;
			body.classList.remove('modal-open');
		};
	}, [isOpened]);

	const closeWithClickAway = (e: MouseEvent) => {
		if (modalWrapperRef.current && (e.target as Node).contains(modalWrapperRef.current)) {
			onCancel();
		}
	};

	if (!isOpened) return null;

	return (
		<>
			<WindowHandler event={EWindowEvent.mousedown} callback={closeWithClickAway} />
			<ModalWrapper
				ref={modalWrapperRef}
				className={className}
				$active={isOpened}
				$frameless={frameless}
				$cssMax={cssMax}
				$overlayColor={modalOverlayColor}
				$overlayOpacity={modalOverlayOpacity}
				$overlayBlur={modalOverlayBlur}
			>
				<ModalBox
					$cssMax={cssMax}
					$backgroundColor={modalBackgroundColor}
					$shadow={modalOverlayShadow}
					$transition={modalOverlayTransition}
					$transitionDuration={modalOverlayTransitionDuration}
				>
					<ModalHeaderExit onClick={onCancel} $frameless={frameless} $cssMax={cssMax} $arrowColor={arrowColor} $arrowHoverColor={arrowHoverColor}>
						<ExitIcon />
					</ModalHeaderExit>

					<ModalContent
						ref={modalContentRef}
						$frameless={frameless}
						$removeMarginOnMobile={header.type === 'custom'}
						$cssMax={cssMax}
					>
						{children}
					</ModalContent>
				</ModalBox>
			</ModalWrapper>
		</>
	);
};

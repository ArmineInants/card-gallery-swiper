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
	children?: React.ReactNode;
}

export const Modal: React.FC<IModalProps> = ({
	header,
	isOpened,
	onCancel,
	children,
	maxWidth = '430px',
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
}) => {
	const modalWrapperRef = useRef<HTMLDivElement | null>(null);
	const modalContentRef = createRef<HTMLDivElement>();

	useEffect(() => {
		const body = document.body;

		if (isOpened) {
			body.classList.add('modal-open');
		} else {
			body.classList.remove('modal-open');
		}

		modalContentRef.current?.scrollTo({ top: 0 });
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
					<ModalHeaderExit onClick={onCancel} $frameless={frameless} $cssMax={cssMax}>
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

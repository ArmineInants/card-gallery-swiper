import styled from 'styled-components';
import { ICssMax } from '../../SwiperSemiConstrained';

const rain400 = '#E4E4E4';

export const ModalOverlay = styled.div<{
	$cssMax: ICssMax;
	$overlayColor: string;
	$overlayOpacity: number;
	$overlayBlur: number;
	$contentOpen: boolean;
	$durationMs: number;
}>`
	background-color: ${({ $overlayColor }) => $overlayColor};
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	min-width: 100%;
	min-height: 100%;
	justify-content: center;
	align-items: center;
	z-index: 100000;
	isolation: isolate;
	transform: translateZ(0);
	opacity: ${({ $contentOpen, $overlayOpacity }) =>
		$contentOpen ? $overlayOpacity : 0};
	/* Static blur: animating backdrop-filter is expensive (full-layer repaints each frame). */
	backdrop-filter: ${({ $overlayBlur }) => `blur(${$overlayBlur}px)`};
	transition: opacity ${({ $durationMs }) => $durationMs}ms cubic-bezier(0.16, 1, 0.3, 1);

	@media (prefers-reduced-motion: reduce) {
		transition-duration: 0.01ms;
	}
`;

export const ModalBox = styled.div<{
	$cssMax: ICssMax;
	$backgroundColor?: string;
	$shadow?: string;
	$transition?: string;
	$transitionDuration?: number;
	$maxWidth?: string;
	$contentOpen: boolean;
	$durationMs: number;
}>`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: ${({ $backgroundColor }) => $backgroundColor};
	padding: 0;
	transform: ${({ $contentOpen }) =>
		$contentOpen
			? 'translate3d(0, 0, 0) scale(1)'
			: 'translate3d(0, 16px, 0) scale(0.97)'};
	opacity: ${({ $contentOpen }) => ($contentOpen ? 1 : 0)};
	width: auto;
	height: auto;
	max-width: ${({ $maxWidth }) => $maxWidth ?? 'unset'};
	box-shadow: ${({ $shadow }) => $shadow ?? 'none'};
	transition: ${({ $durationMs, $transition, $transitionDuration }) => {
		const enter = `opacity ${$durationMs}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${$durationMs}ms cubic-bezier(0.16, 1, 0.3, 1)`;
		if (!$transition) return enter;
		const sec =
			$transitionDuration != null && $transitionDuration > 2
				? $transitionDuration / 1000
				: ($transitionDuration ?? 0.3);
		return `${enter}, ${$transition} ${sec}s`;
	}};

	@media (prefers-reduced-motion: reduce) {
		transition-duration: 0.01ms;
	}

	@media (max-width: ${({ $cssMax }) => $cssMax.TABLET_MAX}px) {
		max-height: unset !important;
	}

	@media (max-width: ${({ $cssMax }) => $cssMax.MOBILE_MAX}px) {
		padding: 16px;
		max-width: 100%;
		border-radius: unset;
		padding-left: 0 !important;
		padding-right: 0 !important;
	}

	& * {
		padding: 0 !important;
	}
`;

export const ModalHeaderExit = styled.button<{
	$cssMax: ICssMax;
	$arrowColor: string;
	$arrowHoverColor: string;
}>`
	position: absolute;
	right: -50px;
	top: 0;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 24px;
	height: 24px;
	cursor: pointer;
	border: none;
    outline: none;
	background: none;
	padding: 0;
    &:focus {
        outline: none;
    }

	svg {
		width: 100%;
		height: 100%;
		transition: fill 0.2s;
	}
	svg path {
		fill: ${({ $arrowColor }) => $arrowColor};
	}

	&:hover {
		svg path {
			fill: ${({ $arrowHoverColor }) => $arrowHoverColor};
		}
	}

	@media (max-width: ${({ $cssMax }) => $cssMax.MOBILE_MAX}px) {
		right: 0;
		top: -30px;
        width: 20px;
        height: 20px;
	}
`;

export const ModalContent = styled.div<{ $cssMax: ICssMax }>`
	overflow-y: auto;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 !important;
	height: 100%;
	max-height: 100%;
	width: auto !important;

	&::-webkit-scrollbar {
		width: 6px;
		opacity: 0;
	}
	&::-webkit-scrollbar-thumb {
		width: 6px;
		background-color: ${rain400};
		border-radius: 24px;
	}
	scrollbar-color: ${rain400} transparent;
	scrollbar-width: thin;
`;


export const ImageWrapper = styled.div<{
	$cssMax: ICssMax;
	$cardBorderWidth?: number;
	$cardBorderColor?: string;
	$modalImageWidth?: number;
	$modalImageHeight?: number;
}>`
    position: relative;
    width: auto;
    height: calc(100% - 80px);
    max-width: 100%;
    width: 504px;
    height: 504px;
    margin-bottom: 20px;
    width: ${({ $modalImageWidth }) => $modalImageWidth}px;
    height: ${({ $modalImageHeight }) => $modalImageHeight}px;
    
    img {
        width: auto;
        height: 100%;
        border: ${({ $cardBorderWidth, $cardBorderColor }) => `${$cardBorderWidth}px solid ${$cardBorderColor}`};
    }
`;

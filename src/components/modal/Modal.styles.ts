import styled from 'styled-components';
import { ICssMax } from '../../SwiperSemiConstrained';

const rain400 = '#E4E4E4';

export const ModalWrapper = styled.div<{
    $active?: boolean;
    $frameless?: boolean;
    $cssMax: ICssMax;
    $overlayColor: string;
    $overlayOpacity: number;
    $overlayBlur: number;
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
    z-index: 1000000;

    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
    backdrop-filter: ${({ $overlayBlur }) => `blur(${$overlayBlur}px)`};

    ${({ $active, $overlayOpacity }) =>
        $active &&
        `
        visibility: visible;
        opacity: ${$overlayOpacity};
        pointer-events: unset;
    `}
`;

export const ModalBox = styled.div<{
    $cssMax: ICssMax;
    $backgroundColor?: string;
    $shadow?: string;
    $transition?: string;
    $transitionDuration?: number;
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${({ $backgroundColor }) => $backgroundColor};
    padding: 0;
    transform: translateY(0);
    width: auto;
    height: auto;
    box-shadow: ${({ $shadow }) => $shadow ?? 'none'};
    transition: ${({ $transition, $transitionDuration }) =>
        $transition
            ? `${$transition} ${$transitionDuration ?? 0.2}s`
            : 'none'};

    @media (max-width: ${({ $cssMax }) => $cssMax.TABLET_MAX }px){
        max-height: unset !important;
    }

    @media (max-width: ${({ $cssMax }) => $cssMax.MOBILE_MAX}px) {
        padding: 16px;
        max-width: 100%;
        border-radius: unset;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
`;

export const ModalHeaderExit = styled.div<{ $frameless?: boolean; $cssMax: ICssMax; $arrowColor: string; $arrowHoverColor: string; }>`
    position: absolute;
    right: 36px;
    top: 39px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 32px;
    height: 32px;
    cursor: pointer;

    svg {
        width: 24px;
        height: 24px;
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
        right: 14px;
        top: 16px;
    }

    ${({ $frameless, $cssMax }) =>
        $frameless &&
        `
        background: none;
        width: 20px;
        height: 20px;
        top: 0;
        right: -40px;

        svg {
            width: 20px;
            height: 20px;
        }

        @media (max-width: ${$cssMax.MOBILE_MAX}px) {
            right: 0;
            top: -50px;
        }
    `}
`;

export const ModalContent = styled.div<{
    $frameless?: boolean;
    $removeMarginOnMobile?: boolean;
    $cssMax: ICssMax;
}>`
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

    ${({ $frameless }) =>
        $frameless &&
        `
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
    `}

    ${({ $removeMarginOnMobile, $cssMax }) =>
        $removeMarginOnMobile &&
        `
        @media (max-width: ${$cssMax.MOBILE_MAX}px) {
            margin-top: unset !important;
        }
    `}
`;

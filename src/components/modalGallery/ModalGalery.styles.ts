import React from 'react';
import styled from 'styled-components';
import { ICssMax } from '../../SwiperSemiConstrained';
import { Modal } from '../modal/Modal';

export const ModalBox = styled(Modal as React.ComponentType<any>)<{ $cssMax: ICssMax }>`
    & * {
        padding: 0 !important;
    }
`;


export const ImageWrapper = styled.div<{ $cssMax: ICssMax; $cardBorderWidth?: number; $cardBorderColor?: string }>`
    position: relative;
    width: auto;
    height: calc(100% - 80px);
    max-width: 100%;
    height: 700px;
    width: 700px;
    @media (max-width: ${({ $cssMax }) => $cssMax.LAPTOP_MAX }px){
        width: 554px;
        height: 554px;
    }
    @media (max-width: ${({ $cssMax }) => $cssMax.TABLET_MAX }px){
        width: 688px;
        height: 688px;
    }
    @media (max-width: ${({ $cssMax }) => $cssMax.MOBILE_MAX }px){
        width: 328px;
        height: 328px;
    }
    @media (max-width: 359px){
        width: 288px;
        height: 288px;
    }
    
    img {
        width: auto;
        height: 100%;
        border: ${({ $cardBorderWidth, $cardBorderColor }) => `${$cardBorderWidth}px solid ${$cardBorderColor}`};
    }
`;

export const NavigationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    height: 50px;
`;

export const NavigationButton = styled.div<{ $active?: boolean, $left?: boolean; $hoverColor?: string }>`
    display: flex;
    position: relative;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    opacity: ${({ $active }) => ($active ? 1 : 0.3)};
    cursor: ${({ $active }) => ($active ? 'pointer' : 'not-allowed')};
    ${({ $left }) => $left && `transform: rotate(180deg);`};

    svg {
        transition: fill 0.2s ease-in;
    }

    &:hover {
        svg {
            fill: ${({ $hoverColor }) => $hoverColor};
        }
    }
`;
export const ProgressBarVisible = styled.div<{ $pointsCount: number }>`
    width: ${({ $pointsCount }) => $pointsCount * 32 + $pointsCount*2}px;
    height: 100%;
    overflow: hidden;
    transition: all 0.5s;
`;
export const ProgressBar = styled.div`
    padding: 0px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
    transition: transform 0.5s;
`;
export const ProgressPoint = styled.div<{ $active?: boolean; $pointColor?: string }>`
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    background-color: rgba(69, 142, 201, 0.5);
    margin: 0 10px;
    transition: background-color 0.2s ease-in;
    ${({ $active, $pointColor }) => $active && `
        width: 18px;
        height: 18px;
        max-width: 18px;
        max-height: 18px;
        background-color: ${$pointColor ?? '#56CCF2'};
    `}
    &:hover {
        background-color: #458EC9;
    }
`;
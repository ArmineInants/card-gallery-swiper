import React from 'react';
import styled from 'styled-components';
import { ICssMax } from '../../SwiperSemiConstrained';
import { Modal } from '../modal/Modal';

export const ModalBox = styled(Modal as React.ComponentType<any>)<{ $cssMax: ICssMax }>`
    & * {
        padding: 0 !important;
    }
`;


export const ImageWrapper = styled.div<{ $cssMax: ICssMax; $cardBorderWidth?: number; $cardBorderColor?: string; $modalImageWidth?: number; $modalImageHeight?: number }>`
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

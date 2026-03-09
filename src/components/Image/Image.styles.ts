import styled, { keyframes } from 'styled-components';

const placeholderShimmer = keyframes`
    0% {
        background-position: 120%;
    }
    100% {
        background-position: -20%;
    }
`;

export const StyledPicture = styled.picture<{ $hidden?: boolean }>`
    width: 100%;
    height: 100%;
    ${({ $hidden }) =>
        $hidden &&
        `
        position: absolute !important;
        visibility: hidden;
        will-change: transform;
        -webkit-backface-visibility: hidden;
    `}
`;

export const StyledImg = styled.img`
    z-index: 2;
    bottom: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
    left: 0;
    right: 0;
`;

export const ShimmerImg = styled(StyledImg)`
    background-color: #120c40 !important;
    background-image: linear-gradient(
        to bottom right,
        #120c40 40%,
        #524999 50%,
        #120c40 60%
    ) !important;
    background-size: 400% 400% !important;
    background-repeat: no-repeat !important;
    animation: ${placeholderShimmer} 1s infinite linear;
`;

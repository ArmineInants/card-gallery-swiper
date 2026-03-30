import styled, { keyframes } from 'styled-components';

const placeholderShimmer = keyframes`
    0% {
        background-position: 120%;
    }
    100% {
        background-position: -20%;
    }
`;

// Naive hex color lightener: takes a hex like #rrggbb and returns a lighter hex
// by interpolating each channel toward 255 by the given amount (0–1).
const lightenColor = (hex: string, amount: number): string => {
    const normalized = hex.replace('#', '');
    if (normalized.length !== 6) return hex;

    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);

    const lightenChannel = (channel: number) =>
        Math.min(255, Math.round(channel + (255 - channel) * amount));

    const rr = lightenChannel(r).toString(16).padStart(2, '0');
    const gg = lightenChannel(g).toString(16).padStart(2, '0');
    const bb = lightenChannel(b).toString(16).padStart(2, '0');

    return `#${rr}${gg}${bb}`;
};

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

export const ShimmerImg = styled(StyledImg)<{ $shimmerColor?: string }>`
    background-color: ${({ $shimmerColor }) => $shimmerColor || '#120c40'} !important;
    background-image: linear-gradient(
        to bottom right,
        ${({ $shimmerColor }) => $shimmerColor || '#120c40'} 30%,
        ${({ $shimmerColor }) =>
            $shimmerColor
                ? `${lightenColor($shimmerColor, 0.8)} 50%`
                : '#887edb 50%'}, // fallback lighter than #120c40
        ${({ $shimmerColor }) => $shimmerColor || '#120c40'} 70%
    ) !important;
    background-size: 400% 400% !important;
    background-repeat: no-repeat !important;
    animation: ${placeholderShimmer} 1s infinite linear;
`;

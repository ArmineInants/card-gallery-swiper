import React from 'react';
import styled from 'styled-components';
import { ConstrainedBox } from './components/constraints/ConstrainedBox';
import { ICssMax, IBreakpoints } from './SwiperSemiConstrained';

export const Section = styled.section`
  position: relative;
  user-select: none;

  * {
    user-select: none;
  }
`;

export const List = styled.div<{ $cssMax: ICssMax }>`
  margin: 0;
`;

export const SliderList = styled.div<{ $cssMax: ICssMax }>`
  overflow: visible;
  display: block;
  padding: 24px 0;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ $cssMax }) => $cssMax.MOBILE_MAX }px) {
    overflow-x: auto;
  }
`;

export const SliderConstraintWrapper = styled(
  ConstrainedBox as React.ComponentType<any>
)`
  display: flex;
  justify-content: center;
`;

export const SliderConstraintInner = styled.div<{ $cssMax: ICssMax, $containerMaxWidth: number, $cardWidth: number, $cardHeight: number, $spaceBetween: number, $fullScreenMode: boolean }>`
  display: block;
  width: ${({ $cardWidth }) => $cardWidth}px;
  height: ${({ $cardHeight }) => $cardHeight}px;

  > div {
    transition: transform 0.2s ease-in;
    ${({ $fullScreenMode, $containerMaxWidth}) => $fullScreenMode ? `
      &:last-child {
        margin-right: calc((100vw - ${$containerMaxWidth }px) / 2);
      }
    ` : `
      &:last-child {
        margin-right: 0px;
      }
    `}
    &:hover {
      transform: scale(1.05);

      @media (max-width: ${({ $cssMax }) => $cssMax.TABLET_MAX }px) {
        transform: scale(1.02);
      }

      @media (max-width: ${({ $cssMax }) => $cssMax.MOBILE_MAX }px) {
        transform: none;
      }
    }
  }

  > * {
    display: inline-block;
    margin-right: ${({ $spaceBetween }) => $spaceBetween}px;
    width: ${({ $cardWidth }) => $cardWidth}px;
    height: ${({ $cardHeight }) => $cardHeight}px;

  }
`;

export const NavigationWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
`;

export const NavigationButton = styled.button<{ $active?: boolean; $left?: boolean; $hoverColor: string }>`
  display: flex;
  position: relative;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  opacity: ${({ $active }) => ($active ? 1 : 0.3)};
  cursor: ${({ $active }) => ($active ? 'pointer' : 'not-allowed')};
  border: none;
  background: transparent;
  padding: 0;

  ${({$active, $hoverColor}) => $active && $hoverColor && `
    &:hover {
      svg {
        fill: ${$hoverColor} !important;
      }
    }
  `}

  ${({ $left }) => $left && `transform: rotate(180deg);`};
`;

export const ProgressBarVisible = styled.div<{ $pointsCount: number, $delta: number }>`
  width: ${({ $pointsCount, $delta }) => $pointsCount * $delta + 6}px;
  height: 100%;
  overflow: hidden;
  transition: all 0.5s;
`;

export const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  win-width: 100%;
  height: 100%;
  transition: transform 0.5s;
`;

export const ProgressPoint = styled.div<{ $active: boolean; $pointColor: string; $pointsType: 'circle' | 'square'; $pointSize: number; $pointsGap: number }>`
  width: ${({ $active, $pointSize }) => ($active ? $pointSize + 6 : $pointSize)}px;
  height: ${({ $active, $pointSize }) => ($active ? $pointSize + 6 : $pointSize)}px;
  max-width: 18px;
  max-height: 18px;
  transform: rotate(45deg);
  border-radius: ${({ $pointsType }) => $pointsType === 'square' ? 0 : '50%'};
  background-color: ${({ $pointColor }) =>
    $pointColor};
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  margin: 0 ${({ $pointsGap }) => $pointsGap / 2}px;
  transition: background-color 0.2s ease-in, width 0.2s ease-in, height 0.2s ease-in;
`;
import styled from 'styled-components';
import { ICssMax } from '../../SwiperSemiConstrained';

export const CardStyle = styled.div<{
  $cssMax: ICssMax;
  $borderWidth?: number;
  $borderColor?: string;
}>`
  display: inline;
  position: relative;
  text-align: center;
  border: ${({ $borderWidth, $borderColor}) =>
    `${$borderWidth}px solid ${$borderColor}`};
  height: 100%;
  transition: transform 0.2s ease-in;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    @media (max-width: ${({ $cssMax }) => $cssMax.TABLET_MAX}px) {
      transform: scale(1.02);
    }
    @media (max-width: ${({ $cssMax }) => $cssMax.MOBILE_MAX}px) {
      transform: none;
    }
  }
`;

export const CardImageSlot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;


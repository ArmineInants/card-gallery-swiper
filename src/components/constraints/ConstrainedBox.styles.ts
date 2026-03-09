import styled from 'styled-components';

export const ConstrainedWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ConstrainedBoxInner = styled.div<{ $maxWidth: number }>`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
`;

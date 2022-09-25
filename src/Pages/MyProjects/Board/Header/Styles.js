import styled from 'styled-components';

import { font } from '../../../../shared/utils/styles';

export const Header = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
`;

export const BoardName = styled.div`
  ${font.size(24)}
  ${font.medium}
`;

export const HeaderRightContent = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 450px) {
    flex-direction: column;
    padding: 0.5rem;
    justify-content: flex-end;
  }
`;

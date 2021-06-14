import styled from 'styled-components';

export const SectionWrapper = styled.div`
  color: #fff;
  offset: 800px;
  background: ${({ lightBg }) => (lightBg ? '#f9f9f9' : '#151515')};

  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

export const HorizontalLine = styled.hr`
  border-color: #5724c7;
  box-shadow: 0 0 20px 5px #5724c7;
`;

export const SectionBox = styled.div`
  display: flex;
  z-index: 1;
  height: 100vh;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  justify-content: center;
`;

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

export const H1 = styled.h1`
  text-align: center;
  font-family: 'Roboto', sans-serif;
  padding-top: 35px;
`;

export const TableWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  & table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9rem;
    font-family: 'Roboto', sans-serif;
    min-width: 400px;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.35);
  }
  & table thead tr {
    background-color: #5724c7;
    color: #fff;
    text-align: left;
    font-weight: 700;
  }
  & th,
  & td {
    padding: 12px 15px;
  }
  & tbody tr {
    border-bottom: 1px solid #dddddd;
    color: #000;
    background-color: #e0e0e0;
  }
  & tbody tr:nth-of-type(even) {
    color: #fff;
    background-color: #000;
  }
  & tbody tr:last-of-type {
    border-bottom: 3px solid #5724c7;
  }
  & tbody tr.active-row {
    font-weight: 700;
    color: #5724c7;
  }
`;

export const TableButton = styled.button`
  background: transparent;
  font-size: 1.25rem;
  color: #5724c7;
  padding: 10px;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

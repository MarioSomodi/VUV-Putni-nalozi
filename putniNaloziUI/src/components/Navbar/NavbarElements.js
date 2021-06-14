import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const Nav = styled.nav`
  background: #151515;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 950px) {
    transition: 0.8s all ease;
  }
`;

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`;

export const NavLogo = styled(LinkR)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #5724c7;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 950px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #5724c7;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 950px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  transition: all 0.2s ease-in-out;
  border-bottom: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    border-bottom: 3px solid #5724c7;
  }
`;

export const NavLink = styled(LinkR)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;

  &.active {
    transition: all 0.2s ease-in-out;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: 6px solid #5724c7;
  }
`;

export const AdminButton = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 950px) {
    display: none;
  }
`;

export const ButtonLink = styled(LinkR)`
  border-radius: 50px;
  background: #5724c7;
  white-space: nowrap;
  padding: 10px 22px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #5724c7;
  }
`;

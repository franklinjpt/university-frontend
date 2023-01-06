import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 32px;
`;

export const Header = styled.header`
  width: 100%;
  text-align: center;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 18px;
  color: #666;
`;

export const Button = styled.a`
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #333;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #444;
  }
`;
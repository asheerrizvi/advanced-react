import styled from 'styled-components';

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 20px;
  top: 44px;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default CloseButton;

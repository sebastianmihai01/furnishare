import styled, { css } from "styled-components";

// Button style variations
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
}

export const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${({ variant }) => {
    switch (variant) {
      case "secondary":
        return css`
          background-color: #6c757d;
          color: white;
        `;
      case "danger":
        return css`
          background-color: #dc3545;
          color: white;
        `;
      default:
        return css`
          background-color: #007bff;
          color: white;
        `;
    }
  }}

  &:hover {
    opacity: 0.9;
  }
`;

import { ButtonStyle } from 'components/Button/Button.style'
import React from 'react'

type ButtonProps = {
  variant?: "simple" | "outlined" | "filled";
  size?: "sm" | "md" | "lg";
  style?: "primary" | "secondary" | "neutral" | "inverse" | "inverse-neutral";
  onClick?: (e: any) => void;
  as?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "outlined",
  size = "md",
  children,
  style = "primary",
  onClick,
  as,
}) => {

  let className = `${variant} ${size}`;

  const getColorsForStyle = (style: string): string[] => { // [text color, other color]
    switch (style) {
      case "secondary": return ["white", "var(--secondary-color)"];
      case "neutral": return ["var(--text2-color)", "var(--background-color)"];
      case "inverse": return ["var(--text-color)", "var(--background-color)"];
      case "inverse-neutral": return ["var(--light-text2-color)", "white"];
      default: return ["var(--background-color)", "white"];
    }
  }

  let [primaryColor, secondaryColor] = getColorsForStyle(style);

  return (
    <ButtonStyle {...{ className, onClick, primaryColor, secondaryColor, as }}>
      {children}
    </ButtonStyle>
  )
}

export default Button
// Prop types/interfaces
export interface ButtonProps {
  children: React.ReactNode; // Content inside the button
  variant?: "primary" | "secondary" | "danger"; // Button style variation
  onClick?: () => void; // Click event handler
}

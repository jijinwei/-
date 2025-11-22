
export interface CardProps {
  letter: string;
  isFlipped: boolean; // Acts as "isPopped"
  index: number;
  onClick: () => void;
}

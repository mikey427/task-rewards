import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Chore {
  UserId: number;
  Title: string;
  Description: string;
  RewardAmount: number;
}

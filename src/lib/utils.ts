import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const applyThemeClass = (theme: 'dark' | 'light' | 'system') => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme
  );
};

export const getNameInitials = (name = '') => {
  const nameWords = name.split(' ');
  return `${nameWords[0].charAt(0)}${nameWords[nameWords.length - 1].charAt(0)}`;
};
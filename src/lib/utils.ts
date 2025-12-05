import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Hàm merge các class names với tailwind-merge
 * Giúp xử lý conflicts giữa các Tailwind classes
 * @param inputs - Các class names cần merge
 * @returns String chứa các class names đã được merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


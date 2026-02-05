import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// !todo: #103 Issue에서 현재 font-weight가 적용되지 않는 문제 해결 후 병합 예정
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ typo: [() => true] }],
      'font-weight': [{ typo: [() => true] }],
      'leading': [{ typo: [() => true] }],
      'tracking': [{ typo: [() => true] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

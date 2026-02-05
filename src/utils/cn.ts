import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * 커스텀 타이포그래피 클래스('typo-')가 Tailwind의 기본 폰트 유틸리티(size, weight 등)와
 * 충돌 시 올바르게 병합되도록 설정을 확장합니다.
 * 'unibusk-typography' 그룹으로 정의된 클래스는 font-size, font-weight, leading, tracking을 덮어씁니다.
 */
const customTwMerge = extendTailwindMerge<'unibusk-typography'>({
  extend: {
    classGroups: {
      'unibusk-typography': [{ typo: [() => true] }],
    },
    conflictingClassGroups: {
      'unibusk-typography': ['font-size', 'font-weight', 'leading', 'tracking'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

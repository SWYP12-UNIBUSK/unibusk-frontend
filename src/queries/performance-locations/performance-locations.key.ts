/**
 * Performance Location 관련 Query Key 팩토리
 */
export const performanceLocationKeys = {
  all: ['performanceLocation'] as const,
  searches: () => [...performanceLocationKeys.all, 'search'] as const,
  search: (keyword: string) => [...performanceLocationKeys.searches(), keyword] as const,
} as const;

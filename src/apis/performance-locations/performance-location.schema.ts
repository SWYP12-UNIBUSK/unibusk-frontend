import { z } from 'zod';

export const PerformanceLocationDtoSchema = z.object({
  performanceLocationId: z.number(),
  name: z.string(),
  address: z.string(),
  operatorName: z.string(),
  operatorPhoneNumber: z.string(),
  availableHours: z.string(),
  operatorUrl: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrls: z.array(z.string()),
});

export const PerformanceLocationsResponseDtoSchema = z.object({
  locations: z.array(PerformanceLocationDtoSchema),
});

export const PerformanceLocationsQuerySchema = z.object({
  north: z.number(),
  south: z.number(),
  east: z.number(),
  west: z.number(),
});

export const PerformanceLocationSearchDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  operatorName: z.string(),
  operatorPhoneNumber: z.string(),
  availableHours: z.string(),
  operatorUrl: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export const PerformanceLocationSearchResponseDtoSchema = z.object({
  performanceLocations: z.array(PerformanceLocationSearchDtoSchema),
  currentPage: z.number(),
  totalPages: z.number(),
  totalElements: z.number(),
  hasNext: z.boolean(),
});

export type PerformanceLocationDto = z.infer<typeof PerformanceLocationDtoSchema>;
export type PerformanceLocationsResponseDto = z.infer<typeof PerformanceLocationsResponseDtoSchema>;
export type PerformanceLocationsQuery = z.infer<typeof PerformanceLocationsQuerySchema>;

export type PerformanceLocationSearchDto = z.infer<typeof PerformanceLocationSearchDtoSchema>;
export type PerformanceLocationSearchResponseDto = z.infer<typeof PerformanceLocationSearchResponseDtoSchema>;

// 공연 신청 방법 보기
export const PerformanceLocationApplicationGuideDtoSchema = z.object({
  applicationGuideId: z.number(),
  performanceLocationId: z.number(),
  content: z.string(),
});

export const PerformanceLocationApplicationGuidesResponseDtoSchema = z.object({
  applicationGuideResponses: z.array(PerformanceLocationApplicationGuideDtoSchema),
});

export type PerformanceLocationApplicationGuideDto = z.infer<
  typeof PerformanceLocationApplicationGuideDtoSchema
>;
export type PerformanceLocationApplicationGuidesResponseDto = z.infer<
  typeof PerformanceLocationApplicationGuidesResponseDtoSchema
>;

export const PerformanceLocationSearchListItemDtoSchema = z.object({
  performanceLocationId: z.number(),
  name: z.string(),
  address: z.string(),
  operatorName: z.string(),
  operatorPhoneNumber: z.string(),
  availableHours: z.string(),
  operatorUrl: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrls: z.array(z.string()),
});

// 장소 검색용
export const PerformanceLocationSearchListResponseDtoSchema = z.object({
  performanceLocationSearchResponses: z.array(PerformanceLocationSearchListItemDtoSchema),
});

export type PerformanceLocationSearchListItemDto = z.infer<
  typeof PerformanceLocationSearchListItemDtoSchema
>;
export type PerformanceLocationSearchListResponseDto = z.infer<
  typeof PerformanceLocationSearchListResponseDtoSchema
>;

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

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

export const PerformanceLocationsMapQuerySchema = z.object({
  north: z.number(),
  south: z.number(),
  east: z.number(),
  west: z.number(),
});

export type PerformanceLocationDto = z.infer<typeof PerformanceLocationDtoSchema>;
export type PerformanceLocationsResponseDto = z.infer<typeof PerformanceLocationsResponseDtoSchema>;
export type PerformanceLocationsQuery = z.infer<typeof PerformanceLocationsMapQuerySchema>;

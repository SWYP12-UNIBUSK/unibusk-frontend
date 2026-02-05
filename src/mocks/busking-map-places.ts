import { adaptPerformanceLocationsToBuskingPlaces } from '@/utils/busking-map/performance-location.adapter';
import { PERFORMANCE_LOCATIONS_MAP_MOCK_RESPONSE } from './performance-locations';

export const BUSKING_MAP_PLACES_MOCK = adaptPerformanceLocationsToBuskingPlaces(
  PERFORMANCE_LOCATIONS_MAP_MOCK_RESPONSE.locations,
);

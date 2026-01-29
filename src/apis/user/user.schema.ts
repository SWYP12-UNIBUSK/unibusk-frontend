import * as z from 'zod';

export const UserResponseDtoSchema = z.object({
  memberId: z.number(),
  email: z.email(),
  name: z.string(),
});

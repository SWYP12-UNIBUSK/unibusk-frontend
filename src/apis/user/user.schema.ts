import * as z from 'zod';

export const UserResponseDtoSchema = z.object({
  memberId: z.number(),
  email: z.email(),
  name: z.string(),
});

export type UserResponseDto = z.infer<typeof UserResponseDtoSchema>;

export const UpdateMemberNameRequestDtoSchema = z.object({
  name: z
    .string()
    .min(2, { message: '최소2자~최대 15자까지 입력 가능합니다.' })
    .max(15, { message: '최소2자~최대 15자까지 입력 가능합니다.' }),
});

export type UpdateMemberNameRequestDto = z.infer<typeof UpdateMemberNameRequestDtoSchema>;

export const LogoutResponseDtoSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export type LogoutResponseDto = z.infer<typeof LogoutResponseDtoSchema>;

import { z } from 'zod';
import validator from 'validator';

export const CustomerSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Minimum length 3 character'),
  contacts: z.array(
    z.object({
      value: z.string().refine(validator.isMobilePhone, 'Invalid Number!'),
    }),
  ),
});

export type TCustomerSchema = z.infer<typeof CustomerSchema>;

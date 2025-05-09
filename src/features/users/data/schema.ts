import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
  // Performance categories
  z.literal('unknown'),
  z.literal('sehr schwach'),
  z.literal('unterdurchschnittlich'),
  z.literal('durchschnittlich'),
  z.literal('gut'),
  z.literal('sehr gut'),
  z.literal('hervorragend'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
  // Custom team roles
  z.literal('3.E'),
  z.literal('U10'),
  z.literal('U11'),
])

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  kategorie: z.string(),
  uebung: z.string(),
  ergebnis: z.number(),
  percentile: z.number().nullable(),
  categoryColor: z.string().optional()
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)

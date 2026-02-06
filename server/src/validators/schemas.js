import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  description: z.string().min(1, 'Description is required'),
  date: z.string().datetime(),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  location: z.string().min(1, 'Location is required').trim(),
  category: z
    .enum(['tournament', 'meeting', 'training', 'social'])
    .default('meeting'),
  capacity: z.number().positive().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
});

export const memberApplicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().min(1, 'Last name is required').trim(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  grade: z.enum(['9', '10', '11', '12']),
  experience: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .default('beginner'),
  reason: z.string().optional(),
});

export const contactMessageSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').trim(),
  message: z.string().min(1, 'Message is required'),
});

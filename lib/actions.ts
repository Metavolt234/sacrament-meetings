'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  createMeeting as createMeetingRecord,
  deleteMeeting as deleteMeetingRecord,
  updateMeeting as updateMeetingRecord
} from './meetings-db';
import type { SacramentMeeting, SpeakerItem } from './types';

const meetingTypes = ['testimony', 'regular', 'stake', 'general'] as const;

const speakerListSchema = z.string().superRefine((value, context) => {
  const entries = value.split(/\r?\n/).map((entry) => entry.trim()).filter(Boolean);

  entries.forEach((entry, index) => {
    const parts = entry.split('|').map((part) => part.trim());
    const type = parts[2] || 'speaker';
    if (
      parts.length < 2 ||
      parts.length > 3 ||
      !parts[0] ||
      !parts[1] ||
      (type !== 'speaker' && type !== 'musical-number')
    ) {
      context.addIssue({
        code: 'custom',
        message: `Line ${index + 1}: use Name | topic | speaker or Name | topic | musical-number.`,
      });
    }
  });
}).transform((value): SpeakerItem[] => (
  value.split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name = '', topic = '', type = 'speaker'] = entry.split('|').map((part) => part.trim());
      return {
        name,
        topic,
        type: type === 'musical-number' ? 'musical-number' : 'speaker'
      };
    })
));

const MeetingFormSchema = z.object({
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a date in YYYY-MM-DD format.')
    .refine((value) => {
      const date = new Date(`${value}T00:00:00.000Z`);
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
    }, 'Enter a valid calendar date.'),
  meetingType: z.enum(meetingTypes),
  presiding: z.string().trim().min(1, 'Enter the presiding leader.'),
  conducting: z.string().trim().min(1, 'Enter the conducting leader.'),
  announcements: z.string(),
  openingHymnNumber: z.coerce.number().int().positive('Enter a positive hymn number.'),
  openingHymnTitle: z.string().trim().min(1, 'Enter the opening hymn title.'),
  openingPrayer: z.string().trim().min(1, 'Enter who will offer the opening prayer.'),
  wardBusiness: z.string(),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: z.coerce.number().int().positive('Enter a positive hymn number.'),
  sacramentHymnTitle: z.string().trim().min(1, 'Enter the sacrament hymn title.'),
  speakers: speakerListSchema,
  closingHymnNumber: z.coerce.number().int().positive('Enter a positive hymn number.'),
  closingHymnTitle: z.string().trim().min(1, 'Enter the closing hymn title.'),
  closingPrayer: z.string().trim().min(1, 'Enter who will offer the closing prayer.')
}).transform((fields): Omit<SacramentMeeting, 'id'> => ({
  date: fields.date,
  meetingType: fields.meetingType,
  presiding: fields.presiding,
  conducting: fields.conducting,
  announcements: fields.announcements.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
  openingHymn: { number: fields.openingHymnNumber, title: fields.openingHymnTitle },
  openingPrayer: fields.openingPrayer,
  wardBusiness: fields.wardBusiness.split(/\r?\n/).map((description) => description.trim()).filter(Boolean)
    .map((description) => ({ description })),
  stakeBusiness: fields.stakeBusiness,
  sacramentHymn: { number: fields.sacramentHymnNumber, title: fields.sacramentHymnTitle },
  speakers: fields.speakers,
  closingHymn: { number: fields.closingHymnNumber, title: fields.closingHymnTitle },
  closingPrayer: fields.closingPrayer
}));

export interface MeetingFormState {
  message: string;
  errors?: Record<string, string[]>;
  values?: MeetingFormValues;
}

interface MeetingFormValues {
  date: string;
  meetingType: string;
  presiding: string;
  conducting: string;
  announcements: string;
  openingHymnNumber: string;
  openingHymnTitle: string;
  openingPrayer: string;
  wardBusiness: string;
  stakeBusiness: boolean;
  sacramentHymnNumber: string;
  sacramentHymnTitle: string;
  speakers: string;
  closingHymnNumber: string;
  closingHymnTitle: string;
  closingPrayer: string;
}

function getMeetingFormValues(formData: FormData) {
  const getText = (name: string) => {
    const value = formData.get(name);
    return typeof value === 'string' ? value : '';
  };
  return {
    date: getText('date'),
    meetingType: getText('meetingType'),
    presiding: getText('presiding'),
    conducting: getText('conducting'),
    announcements: getText('announcements'),
    openingHymnNumber: getText('openingHymnNumber'),
    openingHymnTitle: getText('openingHymnTitle'),
    openingPrayer: getText('openingPrayer'),
    wardBusiness: getText('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymnNumber: getText('sacramentHymnNumber'),
    sacramentHymnTitle: getText('sacramentHymnTitle'),
    speakers: getText('speakers'),
    closingHymnNumber: getText('closingHymnNumber'),
    closingHymnTitle: getText('closingHymnTitle'),
    closingPrayer: getText('closingPrayer')
  };
}

function getValidationState(error: z.ZodError, values: MeetingFormValues): MeetingFormState {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? 'form');
    errors[field] = [...(errors[field] ?? []), issue.message];
  }
  return { message: 'Please correct the highlighted fields.', errors, values };
}

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  void prevState;
  const values = getMeetingFormValues(formData);
  const parsed = MeetingFormSchema.safeParse(values);
  if (!parsed.success) return getValidationState(parsed.error, values);

  try {
    await createMeetingRecord(parsed.data);
  } catch (error) {
    console.error('Failed to create meeting program:', error);
    throw new Error('Unable to create the meeting program. Please try again later.');
  }

  revalidatePath('/meetings');
  revalidatePath('/meetings/current');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  void prevState;
  if (!Number.isSafeInteger(id) || id < 1) {
    return { message: 'The meeting ID is invalid.' };
  }

  const values = getMeetingFormValues(formData);
  const parsed = MeetingFormSchema.safeParse(values);
  if (!parsed.success) return getValidationState(parsed.error, values);

  try {
    const updated = await updateMeetingRecord(id, parsed.data);
    if (!updated) {
      return { message: 'This meeting no longer exists. Refresh the page and try again.' };
    }
  } catch (error) {
    console.error('Failed to update meeting program:', error);
    throw new Error('Unable to update the meeting program. Please try again later.');
  }

  revalidatePath('/meetings');
  revalidatePath('/meetings/current');
  revalidatePath(`/meetings/${id}`);
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const idValue = formData.get('id');
  if (typeof idValue !== 'string' || !/^[1-9]\d*$/.test(idValue)) {
    throw new Error('The meeting ID is invalid.');
  }
  const id = Number(idValue);
  if (!Number.isSafeInteger(id)) throw new Error('The meeting ID is invalid.');

  try {
    const deleted = await deleteMeetingRecord(id);
    if (!deleted) throw new Error('This meeting no longer exists.');
  } catch (error) {
    console.error('Failed to delete meeting program:', error);
    throw new Error('Unable to delete the meeting program. Please refresh and try again.');
  }

  revalidatePath('/meetings');
  revalidatePath('/meetings/current');
  revalidatePath(`/meetings/${id}`);
  revalidatePath('/admin');
  redirect('/admin');
}

'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createMeeting, updateMeeting, type MeetingFormState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

const initialState: MeetingFormState = { message: '', errors: {} };

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} className="form-field-error" aria-live="polite" aria-atomic="true">
      {errors?.map((error) => <p key={error}>{error}</p>)}
    </div>
  );
}

export default function MeetingForm({ meeting }: { meeting?: SacramentMeeting }) {
  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const values = state.values;

  return (
    <form className="meeting-form" action={formAction} aria-labelledby="meeting-form-title">
      <h3 id="meeting-form-title">Meeting details</h3>
      <p className="form-intro">Complete each section of the Sunday meeting program.</p>

      <div className="meeting-form-grid">
        <div className="form-field">
          <label htmlFor="date">Meeting date</label>
          <input id="date" name="date" type="date" defaultValue={values?.date ?? meeting?.date} required
            aria-invalid={Boolean(state.errors?.date?.length)} aria-describedby="date-error" />
          <FieldError id="date-error" errors={state.errors?.date} />
        </div>
        <div className="form-field">
          <label htmlFor="meetingType">Meeting type</label>
          <select id="meetingType" name="meetingType" defaultValue={values?.meetingType ?? meeting?.meetingType ?? 'regular'} required
            aria-invalid={Boolean(state.errors?.meetingType?.length)} aria-describedby="meetingType-error">
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldError id="meetingType-error" errors={state.errors?.meetingType} />
        </div>
        <div className="form-field">
          <label htmlFor="presiding">Presiding</label>
          <input id="presiding" name="presiding" defaultValue={values?.presiding ?? meeting?.presiding} required
            aria-invalid={Boolean(state.errors?.presiding?.length)} aria-describedby="presiding-error" />
          <FieldError id="presiding-error" errors={state.errors?.presiding} />
        </div>
        <div className="form-field">
          <label htmlFor="conducting">Conducting</label>
          <input id="conducting" name="conducting" defaultValue={values?.conducting ?? meeting?.conducting} required
            aria-invalid={Boolean(state.errors?.conducting?.length)} aria-describedby="conducting-error" />
          <FieldError id="conducting-error" errors={state.errors?.conducting} />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="announcements">Announcements (one per line)</label>
          <textarea id="announcements" name="announcements" rows={3}
            defaultValue={values?.announcements ?? meeting?.announcements?.join('\n') ?? ''}
            aria-invalid={Boolean(state.errors?.announcements?.length)} aria-describedby="announcements-error" />
          <FieldError id="announcements-error" errors={state.errors?.announcements} />
        </div>

        <div className="form-field">
          <label htmlFor="openingHymnNumber">Opening hymn number</label>
          <input id="openingHymnNumber" name="openingHymnNumber" type="number" min="1"
            defaultValue={values?.openingHymnNumber ?? meeting?.openingHymn.number} required
            aria-invalid={Boolean(state.errors?.openingHymnNumber?.length)}
            aria-describedby="openingHymnNumber-error" />
          <FieldError id="openingHymnNumber-error" errors={state.errors?.openingHymnNumber} />
        </div>
        <div className="form-field">
          <label htmlFor="openingHymnTitle">Opening hymn title</label>
          <input id="openingHymnTitle" name="openingHymnTitle"
            defaultValue={values?.openingHymnTitle ?? meeting?.openingHymn.title} required
            aria-invalid={Boolean(state.errors?.openingHymnTitle?.length)}
            aria-describedby="openingHymnTitle-error" />
          <FieldError id="openingHymnTitle-error" errors={state.errors?.openingHymnTitle} />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="openingPrayer">Opening prayer</label>
          <input id="openingPrayer" name="openingPrayer"
            defaultValue={values?.openingPrayer ?? meeting?.openingPrayer} required
            aria-invalid={Boolean(state.errors?.openingPrayer?.length)} aria-describedby="openingPrayer-error" />
          <FieldError id="openingPrayer-error" errors={state.errors?.openingPrayer} />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="wardBusiness">Ward business (one item per line)</label>
          <textarea id="wardBusiness" name="wardBusiness" rows={3}
            defaultValue={values?.wardBusiness ?? meeting?.wardBusiness.map((item) => item.description).join('\n') ?? ''}
            aria-invalid={Boolean(state.errors?.wardBusiness?.length)} aria-describedby="wardBusiness-error" />
          <FieldError id="wardBusiness-error" errors={state.errors?.wardBusiness} />
        </div>
        <div className="form-field form-field-wide form-checkbox">
          <input id="stakeBusiness" name="stakeBusiness" type="checkbox"
            defaultChecked={values?.stakeBusiness ?? meeting?.stakeBusiness ?? false}
            aria-invalid={Boolean(state.errors?.stakeBusiness?.length)} aria-describedby="stakeBusiness-error" />
          <label htmlFor="stakeBusiness">Stake business will be presented</label>
          <FieldError id="stakeBusiness-error" errors={state.errors?.stakeBusiness} />
        </div>

        <div className="form-field">
          <label htmlFor="sacramentHymnNumber">Sacrament hymn number</label>
          <input id="sacramentHymnNumber" name="sacramentHymnNumber" type="number" min="1"
            defaultValue={values?.sacramentHymnNumber ?? meeting?.sacramentHymn.number} required
            aria-invalid={Boolean(state.errors?.sacramentHymnNumber?.length)}
            aria-describedby="sacramentHymnNumber-error" />
          <FieldError id="sacramentHymnNumber-error" errors={state.errors?.sacramentHymnNumber} />
        </div>
        <div className="form-field">
          <label htmlFor="sacramentHymnTitle">Sacrament hymn title</label>
          <input id="sacramentHymnTitle" name="sacramentHymnTitle"
            defaultValue={values?.sacramentHymnTitle ?? meeting?.sacramentHymn.title} required
            aria-invalid={Boolean(state.errors?.sacramentHymnTitle?.length)}
            aria-describedby="sacramentHymnTitle-error" />
          <FieldError id="sacramentHymnTitle-error" errors={state.errors?.sacramentHymnTitle} />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="speakers">Speakers and musical numbers</label>
          <p id="speakers-hint" className="form-hint">
            One per line: Name | topic | speaker. Use musical-number for a musical item.
          </p>
          <textarea id="speakers" name="speakers" rows={5}
            defaultValue={values?.speakers
              ?? meeting?.speakers.map((item) => `${item.name} | ${item.topic} | ${item.type}`).join('\n')
              ?? ''}
            aria-invalid={Boolean(state.errors?.speakers?.length)}
            aria-describedby="speakers-hint speakers-error" />
          <FieldError id="speakers-error" errors={state.errors?.speakers} />
        </div>
        <div className="form-field">
          <label htmlFor="closingHymnNumber">Closing hymn number</label>
          <input id="closingHymnNumber" name="closingHymnNumber" type="number" min="1"
            defaultValue={values?.closingHymnNumber ?? meeting?.closingHymn.number} required
            aria-invalid={Boolean(state.errors?.closingHymnNumber?.length)}
            aria-describedby="closingHymnNumber-error" />
          <FieldError id="closingHymnNumber-error" errors={state.errors?.closingHymnNumber} />
        </div>
        <div className="form-field">
          <label htmlFor="closingHymnTitle">Closing hymn title</label>
          <input id="closingHymnTitle" name="closingHymnTitle"
            defaultValue={values?.closingHymnTitle ?? meeting?.closingHymn.title} required
            aria-invalid={Boolean(state.errors?.closingHymnTitle?.length)}
            aria-describedby="closingHymnTitle-error" />
          <FieldError id="closingHymnTitle-error" errors={state.errors?.closingHymnTitle} />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="closingPrayer">Closing prayer</label>
          <input id="closingPrayer" name="closingPrayer"
            defaultValue={values?.closingPrayer ?? meeting?.closingPrayer} required
            aria-invalid={Boolean(state.errors?.closingPrayer?.length)} aria-describedby="closingPrayer-error" />
          <FieldError id="closingPrayer-error" errors={state.errors?.closingPrayer} />
        </div>
      </div>

      {state.message && <p className="form-status" role="status" aria-live="polite">{state.message}</p>}
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save meeting'}
        </button>
        <Link className="button button-secondary" href="/admin">Cancel</Link>
      </div>
    </form>
  );
}

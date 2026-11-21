import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <section className="meeting-editor" aria-labelledby="new-meeting-title">
      <h2 id="new-meeting-title">Create meeting program</h2>
      <MeetingForm />
    </section>
  );
}

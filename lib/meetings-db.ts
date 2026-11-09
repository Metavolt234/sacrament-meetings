import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1, date: '2026-11-01', meetingType: 'regular',
    presiding: 'Bishop John', conducting: 'Brother Peter',
    announcements: ['Ward activity next Saturday at 4:00 p.m.'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Brother James',
    wardBusiness: [{ description: 'Sustain the newly called ward leaders.' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [
      { name: 'Sister Mary', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Ward Choir', topic: 'I Know That My Redeemer Lives', type: 'musical-number' }
    ],
    closingHymn: { number: 134, title: 'I Believe in Christ' },
    closingPrayer: 'Brother David'
  },
  {
    id: 2, date: '2026-11-08', meetingType: 'testimony',
    presiding: 'Bishop John', conducting: 'Brother Peter',
    announcements: ['Youth activity on Wednesday at 5:00 p.m.'],
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Sister Jane', wardBusiness: [], stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [], closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Paul'
  },
  {
    id: 3, date: '2026-11-15', meetingType: 'regular',
    presiding: 'Bishop John', conducting: 'Brother Peter',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Mark', wardBusiness: [], stakeBusiness: true,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    speakers: [{ name: 'Brother Paul', topic: 'Service', type: 'speaker' }],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Rose'
  },
  {
    id: 4, date: '2026-11-22', meetingType: 'regular',
    presiding: 'Bishop John', conducting: 'Sister Grace',
    announcements: ['Please remember the food donation drive.'],
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Brother James', wardBusiness: [], stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [{ name: 'Sister Grace', topic: 'The power of prayer', type: 'speaker' }],
    closingHymn: { number: 100, title: 'Nearer, My God, to Thee' },
    closingPrayer: 'Brother David'
  },
  {
    id: 5, date: '2026-11-29', meetingType: 'regular',
    presiding: 'Bishop John', conducting: 'Brother Peter',
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Sister Jane', wardBusiness: [], stakeBusiness: false,
    sacramentHymn: { number: 170, title: 'God, Our Father, Hear Us Pray' },
    speakers: [{ name: 'Brother Mark', topic: 'Having a grateful heart', type: 'speaker' }],
    closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
    closingPrayer: 'Brother Paul'
  }
];

export function getMeetings(): SacramentMeeting[] {
  return [...meetings].sort((a, b) => b.date.localeCompare(a.date));
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export function getMeetingByDate(date: string): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.date === date);
}

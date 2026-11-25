WITH seed_rows (meeting_date, meeting_data) AS (
  VALUES
    ('2026-12-06'::date, '{"date":"2026-12-06","meetingType":"regular","presiding":"Bishop John","conducting":"Sister Grace","announcements":["Ward service project next Saturday."],"openingHymn":{"number":19,"title":"We Thank Thee, O God, for a Prophet"},"openingPrayer":"Brother James","wardBusiness":[],"stakeBusiness":false,"sacramentHymn":{"number":169,"title":"As Now We Take the Sacrament"},"speakers":[{"name":"Sister Jane","topic":"Finding joy in service","type":"speaker"}],"closingHymn":{"number":100,"title":"Nearer, My God, to Thee"},"closingPrayer":"Brother Paul"}'::jsonb),
    ('2026-12-13'::date, '{"date":"2026-12-13","meetingType":"testimony","presiding":"Bishop John","conducting":"Brother Peter","announcements":["Stake conference is next month."],"openingHymn":{"number":2,"title":"The Spirit of God"},"openingPrayer":"Sister Rose","wardBusiness":[],"stakeBusiness":false,"sacramentHymn":{"number":172,"title":"In Humility, Our Savior"},"speakers":[],"closingHymn":{"number":85,"title":"How Firm a Foundation"},"closingPrayer":"Brother Mark"}'::jsonb),
    ('2026-12-20'::date, '{"date":"2026-12-20","meetingType":"regular","presiding":"Bishop John","conducting":"Brother Peter","announcements":["Christmas worship service begins at 11:00 a.m."],"openingHymn":{"number":30,"title":"Come, Come, Ye Saints"},"openingPrayer":"Sister Jane","wardBusiness":[],"stakeBusiness":false,"sacramentHymn":{"number":174,"title":"While of These Emblems We Partake"},"speakers":[{"name":"Brother Mark","topic":"Remembering the Savior","type":"speaker"},{"name":"Ward Choir","topic":"Christmas musical number","type":"musical-number"}],"closingHymn":{"number":98,"title":"I Need Thee Every Hour"},"closingPrayer":"Sister Grace"}'::jsonb),
    ('2026-12-27'::date, '{"date":"2026-12-27","meetingType":"regular","presiding":"Bishop John","conducting":"Sister Grace","announcements":["Please share year-end ward updates with the bishopric."],"openingHymn":{"number":6,"title":"Redeemer of Israel"},"openingPrayer":"Brother David","wardBusiness":[],"stakeBusiness":true,"sacramentHymn":{"number":170,"title":"God, Our Father, Hear Us Pray"},"speakers":[{"name":"Brother Paul","topic":"Looking to the Savior","type":"speaker"}],"closingHymn":{"number":152,"title":"God Be with You Till We Meet Again"},"closingPrayer":"Sister Mary"}'::jsonb),
    ('2027-01-03'::date, '{"date":"2027-01-03","meetingType":"regular","presiding":"Bishop John","conducting":"Brother Peter","announcements":["New year ward goals will be discussed."],"openingHymn":{"number":3,"title":"Now Let Us Rejoice"},"openingPrayer":"Sister Rose","wardBusiness":[],"stakeBusiness":false,"sacramentHymn":{"number":169,"title":"As Now We Take the Sacrament"},"speakers":[{"name":"Sister Mary","topic":"A new beginning with Christ","type":"speaker"}],"closingHymn":{"number":134,"title":"I Believe in Christ"},"closingPrayer":"Brother James"}'::jsonb)
),
missing_rows AS (
  SELECT seed_rows.meeting_date, seed_rows.meeting_data
  FROM seed_rows
  WHERE NOT EXISTS (
    SELECT 1
    FROM sacrament_meetings
    WHERE sacrament_meetings.meeting_date = seed_rows.meeting_date
  )
),
numbered_rows AS (
  SELECT
    nextval(pg_get_serial_sequence('sacrament_meetings', 'id'))::integer AS id,
    meeting_date,
    meeting_data
  FROM missing_rows
)
INSERT INTO sacrament_meetings (id, meeting_date, meeting_data)
SELECT
  id,
  meeting_date,
  jsonb_set(meeting_data, '{id}', to_jsonb(id), true)
FROM numbered_rows;

SELECT setval(
  pg_get_serial_sequence('sacrament_meetings', 'id'),
  COALESCE(MAX(id), 1),
  COUNT(*) > 0
)
FROM sacrament_meetings;

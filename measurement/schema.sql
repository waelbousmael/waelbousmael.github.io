CREATE TABLE IF NOT EXISTS daily_counts (
  date TEXT NOT NULL,
  event TEXT NOT NULL,
  market TEXT NOT NULL,
  channel TEXT NOT NULL,
  entry TEXT NOT NULL,
  page TEXT NOT NULL,
  budget TEXT NOT NULL,
  country_group TEXT NOT NULL,
  n INTEGER NOT NULL CHECK (n > 0),
  PRIMARY KEY (date, event, market, channel, entry, page, budget, country_group)
) WITHOUT ROWID;

-- Riyadh uses UTC+03:00. Both reports include today and the preceding 29 local dates.
CREATE VIEW IF NOT EXISTS source_funnel_30d AS
SELECT country_group, market, channel, entry,
  SUM(CASE WHEN event = 'page_view' THEN n ELSE 0 END) AS page_views,
  SUM(CASE WHEN event = 'whatsapp_click' THEN n ELSE 0 END) AS whatsapp_clicks,
  SUM(CASE WHEN event = 'phone_click' THEN n ELSE 0 END) AS phone_clicks,
  SUM(CASE WHEN event = 'email_click' THEN n ELSE 0 END) AS email_clicks,
  SUM(CASE WHEN event = 'inquiry_sent' THEN n ELSE 0 END) AS inquiries
FROM daily_counts
WHERE date BETWEEN date('now', '+3 hours', '-29 days') AND date('now', '+3 hours')
GROUP BY country_group, market, channel, entry;

CREATE VIEW IF NOT EXISTS inquiry_budgets_30d AS
SELECT country_group, market, channel, entry, budget, SUM(n) AS inquiries
FROM daily_counts
WHERE event = 'inquiry_sent'
  AND date BETWEEN date('now', '+3 hours', '-29 days') AND date('now', '+3 hours')
GROUP BY country_group, market, channel, entry, budget;

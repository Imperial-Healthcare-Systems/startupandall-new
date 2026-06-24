export const REVIEWS = [
  {
    "platform": "google",
    "name": "[Reviewer name]",
    "rating": 5,
    "date": "[Month YYYY]",
    "text": "[Paste the Google review text here. This is placeholder copy showing how a five-star review will appear in the card layout once the real content is added.]"
  },
  {
    "platform": "justdial",
    "name": "[Reviewer name]",
    "rating": 5,
    "date": "[Month YYYY]",
    "text": "[Paste the Justdial review text here. Replace this placeholder with a genuine customer review; the card design, stars and avatar update automatically.]"
  },
  {
    "platform": "google",
    "name": "[Reviewer name]",
    "rating": 5,
    "date": "[Month YYYY]",
    "text": "[Paste another Google review here. You can add as many entries as you like — the grid reflows responsively for any number of reviews.]"
  },
  {
    "platform": "justdial",
    "name": "[Reviewer name]",
    "rating": 5,
    "date": "[Month YYYY]",
    "text": "[Paste another Justdial review here. Shorter and longer reviews both render cleanly thanks to the flexible card height.]"
  },
  {
    "platform": "google",
    "name": "[Reviewer name]",
    "rating": 5,
    "date": "[Month YYYY]",
    "text": "[Paste a Google review here highlighting a specific service — incorporation, GST, compliance or tax — to make the social proof concrete.]"
  },
  {
    "platform": "justdial",
    "name": "[Reviewer name]",
    "rating": 5,
    "date": "[Month YYYY]",
    "text": "[Paste a Justdial review here. Tip: lead with the outcome the client got, then the experience working with the team.]"
  }
] as const;

/**
 * Source-of-truth / fallback rating data for the review platforms.
 *
 * `rating` and `count` here are the last manually-verified live values. They are
 * used directly for Justdial (no public API — see lib/ratings.ts) and act as the
 * fallback for Google when the live Places API is not configured or unreachable.
 *
 * When the Google Places API env vars are set, the Google `rating`/`count` are
 * overridden at request time with the live values — see lib/ratings.ts.
 *
 * Values last verified against the live listings on 2026-06-24.
 */
export const RV_PLATFORMS = {
  "google": {
    "name": "Google",
    "url": "https://maps.app.goo.gl/JAHBdTmhUhoxS5Tw7",
    "rating": "4.7",
    "count": "109"
  },
  "justdial": {
    "name": "Justdial",
    "url": "https://jsdl.in/DT-49E2Y2AAEUA",
    "rating": "4.7",
    "count": "145"
  }
} as const;

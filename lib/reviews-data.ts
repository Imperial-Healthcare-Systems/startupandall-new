export const REVIEWS = [
  {
    "platform": "google",
    "name": "Prashant Surwase",
    "rating": 5,
    "date": "",
    "text": "Good service with quick response to do all tax related work on time. Sachin Gadekar sir have very polite and humble in nature. Thanks for your guidance and information that you have provided regarding ITR."
  },
  {
    "platform": "google",
    "name": "Vinit Dharankar",
    "rating": 5,
    "date": "",
    "text": "Very good service for trade mark registration. He gives you knowledge and guide properly to choose the trade mark application wisely."
  },
  {
    "platform": "justdial",
    "name": "Shriram",
    "rating": 5,
    "date": "",
    "text": "Very well explained about Trademark and patent services. Quick response and fair prices for the service."
  },
  {
    "platform": "google",
    "name": "Pankaj Kulkarni",
    "rating": 5,
    "date": "",
    "text": "This firm is having good knowledge bank. I had filed Patent with their help. They discussed with me in depth about it then they prepared draft & get verified from me & filed my application online. I appreciate their efforts about my work. I got best service to complete my dream. I am going to file 3 more patents through this firm only. Thank you very much Sachin Gadekar Sir."
  },
  {
    "platform": "google",
    "name": "Harshad Dharme",
    "rating": 5,
    "date": "",
    "text": "I had a very smooth experience with this firm for my trademark registration. They guided me properly at every step, handled the documentation professionally, and kept me updated throughout the process. Their service is fast, reliable, and truly hassle-free. Highly recommended for anyone looking to register their brand!"
  },
  {
    "platform": "justdial",
    "name": "ankush kokitkar",
    "rating": 5,
    "date": "",
    "text": "Sachin Vadekar & Associates proficiency in financial modeling and forecasting is outstanding."
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

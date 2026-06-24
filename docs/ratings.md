# Trust badge ratings (Google & Justdial)

The home-page hero shows two trust badges — **Google Business Profile** and
**Justdial** — plus a matching reviews section lower on the page. Both read from
a single resolved data source so a rating is never duplicated across the UI.

## Where the numbers come from

| Platform | Source | Auto-syncs? |
|----------|--------|-------------|
| Google   | Live via the Google Places API when configured; otherwise the verified fallback in `lib/reviews-data.ts` | ✅ Yes, when env vars are set |
| Justdial | `lib/reviews-data.ts` (manually verified) | ❌ No public API — manual |

Resolution happens server-side in [`lib/ratings.ts`](../lib/ratings.ts)
(`getPlatformRatings`), which is called by the home server component
[`app/page.tsx`](../app/page.tsx). The result is passed to the client component
[`components/HomeClient.tsx`](../components/HomeClient.tsx), which renders the
hero badges and the reviews section. The API key is only read on the server and
is never shipped to the browser.

## Making Google auto-sync

1. Create a Google Cloud project and enable **Places API (New)**.
2. Create an API key (restrict it to the Places API).
3. Find the Place ID for the listing with the
   [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id).
4. Set the two env vars (see [`.env.example`](../.env.example)):
   ```
   GOOGLE_PLACES_API_KEY=...
   GOOGLE_PLACE_ID=ChIJ...
   ```

Once set, the Google badge pulls `rating` + `userRatingCount` live and Next.js
caches it for ~24h (`REVALIDATE_SECONDS` in `lib/ratings.ts`), so it stays in
sync as new reviews arrive without re-deploying. If the fetch fails for any
reason, it silently falls back to the value in `reviews-data.ts`.

## Limitations

- **Justdial has no public ratings API**, and its pages are JavaScript-rendered
  with anti-scraping protection, so a reliable real-time fetch is not feasible.
  Its rating is therefore maintained manually in `lib/reviews-data.ts`. Update it
  whenever the live Justdial listing changes.
- **Google live fetch is opt-in** because it requires an API key with billing.
  Without the env vars, the Google badge uses the verified fallback value.
- The fallback values in `reviews-data.ts` are stamped with a "last verified"
  date — keep that comment honest when you edit them.

## Updating the fallback / Justdial values manually

Edit `RV_PLATFORMS` in [`lib/reviews-data.ts`](../lib/reviews-data.ts):

```ts
"google":   { ..., "rating": "4.7", "count": "109" },  // fallback only
"justdial": { ..., "rating": "4.7", "count": "145" },  // always used
```

`rating` is a string like `"4.7"`; `count` is the number of reviews as a string
(or `""` to hide the count).

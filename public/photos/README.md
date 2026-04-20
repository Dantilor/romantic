# /public/photos

This folder holds the photos shown on the site.

The project ships with soft-gradient SVG placeholders (`p-1.svg` … `p-6.svg`)
so it runs out of the box. Replace them with real photos like this:

1. Drop your file into `/public/photos/`, e.g. `day-01.jpg`.
2. Update the matching entry in `data/days.ts` or `data/gallery.ts` to point
   to the new path (e.g. `/photos/day-01.jpg`).

Recommended: `.jpg` or `.webp`, landscape, at least 1200px wide.

# Loftvernd — Noona setup

This is the original MVHR website with its design, sliders, reviews and three package prices preserved.

## What was changed
- Removed four outbound 'Skoða gerð' links from the MVHR equipment-brand cards. Brand photos and descriptive names remain.
- Replaced the old inquiry form with a dedicated Noona booking panel, updated the booking calls to action and retained the pricing section.
- The package CTAs scroll to the booking panel and display the selected package. Noona's service selection still happens within Noona; a package-specific deep link has NOT been assumed.

## Activate Noona
Option A — Booking URL: Open assets/noona-booking.js. Set window.LOFTVERND_NOONA_BOOKING_URL to the exact public business booking URL from Noona HQ. Customers will open your live Noona booking profile from the page.

Option B — Embedded widget: Copy the official HTML embed snippet from Noona HQ > Online Bookings / Web Integration. Insert it in index.html inside the div id=noona-embed-slot, between the NOONA EMBED markers. The website script hides the fallback button once an embed element is present. The widget plan is not necessarily free.

Set Essential 29.890 kr., Complete 64.900 kr. (up to 8 accessible vents), Complete Plus 89.900 kr. inside Noona, plus durations, eligible systems, service area, relevant booking questions (MVHR brand/model), payment and cancellation rules.

IMPORTANT: Do not publish as live checkout until a real appointment can be made and confirmed and payment requirements have been independently tested in your Noona merchant account. Noona's website describes prepayment but merchant eligibility and configuration are not verified for this account.

## Third-party image rights
The four machine-brand images load from third-party websites. Their outbound links have been removed as requested, but their use still needs permission or replacement with licensed/self-owned photos before public launch.

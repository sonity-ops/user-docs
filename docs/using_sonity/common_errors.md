---
sidebar_position: 4
---

# Common errors and what they mean

Estimated reading time: 5 minutes.

## "Campaign is paused"

This usually means one of the following:

1. Daily limits were reached.
2. A connected profile is unavailable.
3. A required step is not configured correctly.

Check limits first, then profile status, then step configuration.

## "Requests are not sending"

Typical causes:

1. Profile execution window is closed.
2. The campaign has no eligible contacts in the current step.
3. LinkedIn limits were reached for the day.

Review profile settings and campaign step progress.

## "Unable to parse personalization fields"

A template variable is missing in contact data. For example, using `{firstname}` when a contact has no first name value.

Fix by:

1. Completing missing contact fields.
2. Adding fallback messages in your steps.
3. Testing templates before launch.

## "Import failed for CSV"

Common reasons:

1. Unsupported file structure.
2. Missing required columns.
3. Invalid profile URLs.

Re-export your CSV with clean LinkedIn profile URLs and retry.

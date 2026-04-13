---
sidebar_position: 7
---

# Personalization variables and merge tags

Estimated reading time: 4 minutes.

Sonity supports template variables to personalize messages per contact.

## Common variables

1. `{firstname}`
2. `{lastname}`
3. `{company}`
4. `{position}`

Variables are replaced with contact data at send time.

## Example

Template:

`Hi {firstname}, I saw your work at {company}.`

Rendered output:

`Hi Grace, I saw your work at Acme Labs.`

## Best practices

1. Keep fallback messages for missing data cases.
2. Do not overuse variables in one message.
3. Preview templates before launching campaigns.
4. Keep tone natural and concise.

---
sidebar_position: 5
---

# MCP troubleshooting

Estimated reading time: 4 minutes.

Common errors when connecting to or calling the Sonity MCP server, and how to fix them. Errors are listed roughly in the order you're likely to hit them: first connection, then per-call.

## "Authorization header is required in MCP server config"

You connected a client but didn't paste the `Authorization` header into it.

**Fix**

Open the in-app MCP dialog (sidebar → Bot icon → **MCP connection**), click **Authorize MCP**, approve the scopes, then copy the displayed `Authorization: Bearer ...` value into your client's config under `headers.Authorization`. See [Connecting a client](./connecting).

## "Invalid MCP token" / "Invalid Sonity access token: ..."

The token is wrong, expired, or doesn't match what the server expects.

**Common causes**

1. **Token expired.** Access tokens live 1 hour. Re-authorize via the in-app dialog.
2. **Token got cut off.** The `Bearer ` prefix is required, followed by the full token. Make sure nothing trimmed the end of it or broke it across multiple lines.
3. **You copied an old token from somewhere else.** Always use the value shown in the current MCP dialog.

**Fix**

Open the MCP dialog, click **Authorize MCP** again, and copy the fresh token into your client's config.

## "Missing required scope(s): mcp:write"

Your token only allows reading, but you tried to do something that writes data (like creating a campaign, updating one, or sending a message).

**Fix**

Re-authorize via the in-app dialog. The dialog asks for `mcp:read mcp:write profile sonity_account_id` by default — make sure you didn't uncheck `mcp:write` on the consent page. If you approved a read-only token before, click **Remove MCP authorization** first, then **Authorize MCP** again to start fresh.

## "Step N ('...') references variables like \{name\} or \{company\} but has no fallback_text"

You created a campaign step that uses personalization placeholders like `\{name\}` or `\{company\}` (so the message says "Hi `\{name\}`, ...") but didn't tell the server what to put in if we don't know the lead's name.

**Fix**

Pick one of these:

- Add a `fallback_text` to the step — a safe generic version of the message that's used when we don't have the lead's info, **or**
- Pass `auto_fallback: true` when you create the step, and the server will fill in generic replacements automatically (for example `\{name\}` becomes "there", `\{company\}` becomes "your company", and so on).

See [The `\{variable\}` fallback rule](./tools#the-variable-fallback-rule) for the full list of replacements.

## "405 Method not allowed" on `GET /mcp` or `DELETE /mcp`

This is **expected behavior**, not an error. The MCP server only accepts `POST /mcp` requests. Anything else gets a `405 Method not allowed` response.

**Fix**

Nothing to fix on your end. If your AI client is sending `GET` or `DELETE`, it's not using the MCP HTTP transport correctly — switch it to `POST`.

## "sonity_account_id claim missing or invalid"

Your token doesn't say which Sonity account you want to act on, so the server doesn't know what to do.

**Fix**

Re-authorize via the in-app dialog and make sure `sonity_account_id` is in the requested scopes (it is by default).

## Still stuck

- Re-read [Authentication](./authentication) to make sure your token is valid and not expired.
- Re-read [Connecting a client](./connecting) to double-check your client config syntax.
- Open the Sonity UI's MCP dialog and click **Remove MCP authorization**, then **Authorize MCP** again for a clean slate.
- Contact support if the problem keeps happening.

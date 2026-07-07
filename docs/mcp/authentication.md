---
sidebar_position: 2
---

# Authenticating with the Sonity MCP server

Estimated reading time: 6 minutes.

Every request to the Sonity MCP server must carry a Bearer token in the `Authorization` header. The server accepts **two token types**, and this page explains when each applies, how to get one, and what the server does with it.

## Two ways to authenticate

You can sign in to the Sonity MCP server in two ways. Pick the one that matches how you're connecting.

- **Sign in with Sonity (recommended)** — the easy way. You click a button in Sonity, approve what the AI client is allowed to do, and Sonity hands the client a token. Use this for Claude Desktop, Cursor, Zed, Cline, and the in-app MCP dialog. This is the standard "log in with..." flow you've seen on other websites.
- **Paste a Sonity session token** — for scripts or advanced setups where opening a browser isn't practical. You copy a long-lived token from your Sonity session and paste it into your client.

No matter which way you sign in, the MCP server only uses your token to talk to Sonity on your behalf. Your token is never shared with anyone else.

## What happens when you click "Authorize MCP"

Behind the scenes, Sonity uses a secure sign-in standard called OAuth. Don't worry about the details — here's roughly what happens when you click the button:

1. You click **Authorize MCP** in the Sonity dialog.
2. If you're not signed in, Sonity asks you to sign in first.
3. Sonity shows you a list of permissions the AI client wants (for example: read your data, write changes). You review them and click **Allow**.
4. Sonity generates a short-lived **access token** (good for 1 hour) and a **refresh token** (good for 30 days). The access token is what your AI client will use to talk to Sonity.
5. The dialog shows you the access token to copy. Paste it into your AI client's MCP settings.
6. When the access token expires after an hour, your client uses the refresh token behind the scenes to get a new one. You usually don't need to do anything — it just keeps working for 30 days. After 30 days, you'll click **Authorize MCP** again to get a fresh pair.

### Token lifetimes (in plain English)

- **Access token** — the one your client uses to make requests. Lasts 1 hour. When it expires, your client should automatically swap it for a new one using the refresh token. You usually won't notice.
- **Refresh token** — lasts 30 days. Used behind the scenes to get new access tokens. After 30 days, just click **Authorize MCP** again in the Sonity dialog to get a new pair.

When the access token expires, your client can quietly get a new one using the refresh token. You don't need to do this yourself — your AI client handles it automatically. (Advanced users: the call is `POST /oauth/token` with `grant_type=refresh_token`.)

## Scopes

When you click **Authorize MCP**, Sonity shows you a list of permissions the AI client is asking for. These are called **scopes** — they're a way of saying "yes, you can do *this*, but not *that*." You'll see the same descriptions on the consent screen:

| Scope | What it lets the AI client do |
| --- | --- |
| `mcp:read` | Read your Sonity data (campaigns, leads, profiles, tasks). |
| `mcp:write` | Create or update Sonity data on your behalf. |
| `profile` | See your basic profile information. |
| `sonity_account_id` | Know which Sonity account it's acting on. |

The Sonity dialog asks for all four by default. The `sonity_account_id` scope is required — without it, the server can't tell which account you're using, and every request will fail.

## How to get a token from the Sonity UI

1. Sign in to Sonity at `https://app.sonity.net`.
2. Open the sidebar and click the **MCP connection** entry (the Bot icon near your account menu).
3. Click **Authorize MCP**.
   - If you aren't signed in, you'll be asked to sign in first. After signing in you'll come right back here.
4. On the **MCP Authorization** consent page, review the permissions and click **Allow**.
5. You'll be taken back to Sonity. The dialog now shows two things:
   - **MCP endpoint URL**: `https://app.sonity.net/mcp`
   - **Authorization header**: `Authorization: Bearer <your-access-token>`
6. Copy both into your AI client's MCP settings. See [Connecting a client](./connecting) for step-by-step help with each client.

:::caution
The access token expires in 1 hour. If your client stops working later, come back to this dialog and click **Authorize MCP** again to get a fresh one. The dialog will show you the new value to copy.
:::

## How to revoke access

If you ever want to disconnect an AI client:

- **Quick local clear** (in the MCP dialog, click **Remove MCP authorization**) — Sonity forgets the token in your browser. Useful if you just want to clean up. *Note:* the token itself is still valid on the server until it expires, so this is mostly cosmetic.
- **Fully revoke it on the server** — if you've lost a device or want to be safe, ask your admin to revoke the refresh token. After that, the AI client can't get new access tokens. Any access token that's already out there still works until it expires (max 1 hour).

## Security notes

- **Never share the token.** Don't paste it into a chat, commit it to a repo, or screenshot it. Treat it like a password.
- **The token only works for your Sonity account.** A token for account A cannot access account B.
- **Your token is never sent to anything outside Sonity.** The MCP server uses it only to talk to Sonity on your behalf. You don't need to worry about the technical details — just know it's safe by design.

## Where to next

- [Connecting a client](./connecting) — paste your token into Claude, Cursor, Zed, Cline, or a script.
- [MCP tools](./tools) — what you can call once authenticated.
- [Troubleshooting](./troubleshooting) — invalid token, missing scopes, expired tokens.
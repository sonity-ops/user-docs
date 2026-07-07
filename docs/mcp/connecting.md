---
sidebar_position: 3
---

# Connecting an MCP client to Sonity

Estimated reading time: 5 minutes.

Every MCP client needs the same two values, which you get from the in-app MCP dialog (see [Authentication](./authentication)):

- **MCP endpoint URL**: `https://app.sonity.net/mcp`
- **Authorization header**: `Authorization: Bearer <your-access-token>`

This page gives copy-pasteable config for the most common clients, plus a raw cURL example for scripting.

## Claude Desktop

### Automatic method

**Step 1: Open Claude**

Open Claude Desktop or  website then in the Prompt box click the + sign:

![Add MCP stage 1](/images/mcp/mcp-01.png)


**Step 2: Add a custom connector**
- Click the + sign 
- A menu will pop up with options. Click "Connectors"
- Click "+ Add Connector"
- Click "Add Custom Connector"

![Add MCP stage 2](/images/mcp/mcp-02.png)

**Step 3: Authorize MCP Stage 1**

In another tab login to your Sonity account and click the AI icon (robot icon):

![](/images/mcp/mcp-02a.png)

**Step 4: Authorize MCP Stage 2**

When a modal opens click "Authorize MCP":

![](/images/mcp/mcp-02b.png)

**Step 5: Copy MCP URL**

When you click "Authorize MCP" you will redirect to give the AI scopes then once you are done you should see an option for copying header and MCP URL
Copy URL and switch back to the Claude Web or Desktop tab.

![](/images/mcp/mcp-02c.png)

**Step 6: Paste MCP URL**

In the Dialog that opens form Step 2, set the name to Sonity and paste the MCP URL into the `url` field:
Click "Add"

![](/images/mcp/mcp-03.png)

If you click the "+" button and click "Connectors", you should see the Sonity connector listed:

![](/images/mcp/mcp-04.png)



Alternatively if you open settings then click "Connectors", you should see the Sonity connector listed:
![](/images/mcp/mcp-05.png)

**Step 7:  Enjoy!**

Once you have completed the above steps you should be able to use Sonity tools with Claude Desktop.

![](/images/mcp/mcp-06.png)

:::tip
For more information about the tools available, see the tools page [here](./tools). Note that when we add new tools we will update this page.
:::

### Manual method
Edit `claude_desktop_config.json` (on macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "sonity": {
      "type": "http",
      "url": "https://app.sonity.net/mcp",
      "headers": {
        "Authorization": "Bearer PASTE_YOUR_TOKEN_HERE"
      }
    }
  }
}
```

Restart Claude Desktop. The Sonity tools will appear under the tools menu.

## Cursor

Edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "sonity": {
      "url": "https://app.sonity.net/mcp",
      "headers": {
        "Authorization": "Bearer PASTE_YOUR_TOKEN_HERE"
      }
    }
  }
}
```

Restart Cursor. In the chat panel, switch the model selector to an agent mode that supports MCP.

## Zed

Edit `~/.config/zed/settings.json` and add the Sonity server under `extension.context_servers`:

```json
{
  "extension": {
    "context_servers": {
      "sonity": {
        "command": {
          "transport": {
            "kind": "http",
            "url": "https://app.sonity.net/mcp",
            "headers": {
              "Authorization": "Bearer PASTE_YOUR_TOKEN_HERE"
            }
          }
        }
      }
    }
  }
}
```

Restart Zed. The Sonity tools will be available in the Assistant panel.

## Cline

Edit `cline_mcp_settings.json` (use the Cline extension's "MCP Servers" → "Edit JSON" command):

```json
{
  "mcpServers": {
    "sonity": {
      "url": "https://app.sonity.net/mcp",
      "headers": {
        "Authorization": "Bearer PASTE_YOUR_TOKEN_HERE"
      },
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

Reload the Cline panel. The Sonity server should show as connected.

## Raw cURL / scripting

The MCP HTTP transport speaks JSON-RPC 2.0 over `POST /mcp`. A minimal session is two requests: `initialize`, then one or more `tools/call`.

### 1. Initialize the session

```bash
curl -X POST https://app.sonity.net/mcp \
  -H "Authorization: Bearer PASTE_YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-06-18",
      "capabilities": {},
      "clientInfo": { "name": "curl", "version": "1.0" }
    }
  }'
```

### 2. Call a tool — list your profiles

```bash
curl -X POST https://app.sonity.net/mcp \
  -H "Authorization: Bearer PASTE_YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "profiles",
      "arguments": {}
    }
  }'
```

The response is a JSON-RPC result whose `result.content[0].text` is a JSON string with the profiles. Grab the `id` of the profile you want to act as — that's your `sonity_profile_id` for every other tool.

:::tip
For anything beyond a quick test, use the official [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk) instead of raw cURL. It handles session lifecycle, retries, and SSE streaming for you.
:::

## Verify it works

Whichever client you chose, the simplest smoke test is to ask the AI:

> "List my Sonity profiles."

The AI should call the `profiles` tool and return a list with at least one profile. If you see an error, jump to [Troubleshooting](./troubleshooting).

<!--## Advanced / self-hosted

If you're running the Sonity MCP server yourself (for on-prem or development), the transport and endpoints differ.

### Transports

The server supports two transports, selected by the `MCP_TRANSPORT` env var:

| `MCP_TRANSPORT` | Behavior | Use when |
| --- | --- | --- |
| `stdio` (default) | Reads/writes JSON-RPC over stdin/stdout. No network port. | Local single-user setups, Claude Desktop with a `command` launcher |
| `http` | Streamable HTTP at `POST /mcp`. Listens on `PORT` (default `8000`). | Remote/multi-user, browser-based clients, production |

### Local development

```bash
# HTTP transport on http://localhost:8000/mcp
npm run dev:http

# stdio transport
npm run dev
```

Point your client at `http://localhost:8000/mcp` for `dev:http`, or use a stdio launcher config for `dev`.

### Production environment variables

These are the env vars the server reads (from `.env.production` and the k8s deployment):

| Variable | Required | Purpose |
| --- | --- | --- |
| `SONITY_GRAPHQL_URL` | yes | Sonity GraphQL endpoint (e.g. `https://app.sonity.net/graphql`). |
| `ACCESS_TOKEN_SECRET` | yes | Shared HMAC secret used to verify/re-sign HS256 tokens. Must match the Sonity backend. |
| `MCP_TRANSPORT` | no | `stdio` (default) or `http`. |
| `PORT` | HTTP only | Port to listen on (default `8000`). |
| `MCP_ALLOWED_HOSTS` | no | Comma-separated list of allowed Host header values (e.g. `app.sonity.net`). |
| `MCP_RESOURCE_SERVER_URL` | no | Public URL of the MCP server, advertised in OAuth metadata (e.g. `https://app.sonity.net/mcp`). |
| `OAUTH_ISSUER_URL` | no | OAuth Authorization Server issuer (e.g. `https://app.sonity.net`). Used to fetch JWKS. |
| `OAUTH_AUDIENCE` | no | Expected `aud` claim for incoming RS256 tokens (default `sonity-mcp`). |
| `SONITY_JWT_ISSUER` | no | Expected `iss` claim for HS256 tokens (default `sonity-backend`). |
| `SONITY_JWT_AUDIENCE` | no | Expected `aud` claim for HS256 tokens (default `https://app.sonity.net`). |

`direct_search_and_collect` also hits the driver directly, at `https://driver.sonity.net` in production or `http://127.0.0.1:3000` in development (selected automatically from `NODE_ENV`).

:::info
The full setup guide (cloning, building, running) is in the `sonity-mcp/README.md` in the source repo. This section only covers the env vars you need to know about as an operator.
:::-->

## Where to next

- [MCP tools](./tools) — the full tool reference.
- [Troubleshooting](./troubleshooting) — common connection errors.
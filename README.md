# <div align="center">Site Blocker Extension</div>

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&duration=2500&pause=700&color=D32F2F&center=true&vCenter=true&width=700&lines=Browser+Blocker+Extension;Redirects+Blocked+Sites+to+%22Server+Unavailable%22+Page;Built+with+Manifest+V3+%2B+Service+Worker)](https://git.io/typing-svg)

![wave](https://capsule-render.vercel.app/api?type=waving&height=120&color=0:ff6b6b,100:ee5253&section=header)

</div>

A lightweight browser extension that blocks selected websites and redirects them to a local "Server Unavailable" page for a clean, realistic interruption flow.

## Preview

- When a user opens a blocked domain (or subdomain), the extension intercepts tab updates.
- The tab is redirected to `pages/down.html`, which displays a server outage style message.

## Features

- Targeted domain blocking using a simple rules list.
- Automatic redirect on page load.
- Subdomain-aware matching (`foo.github.com` matches `github.com`).
- Infinite-loop prevention for extension URLs.
- Local fallback page with outage-style messaging.

## Tech Stack

- JavaScript (ES Modules)
- HTML5 + CSS3
- Chrome Extensions API (`tabs`)
- Chrome Extension Manifest V3 (service worker background script)

## Architecture

```text
manifest.json
  -> loads background.js as MV3 service worker
background.js
  -> listens to chrome.tabs.onUpdated
  -> parses tab URL + hostname
  -> matches hostname against rules.js blockedSites
  -> redirects blocked traffic to pages/down.html
rules.js
  -> central blocklist configuration
pages/down.html
  -> local outage-style page shown after redirect
```

## Implementation Process

1. Define blocked domains in `rules.js`.
2. Register a background service worker in `manifest.json`.
3. Listen to tab loading events in `background.js`.
4. Normalize hostname and match domain/subdomain.
5. Redirect blocked URLs to local page with encoded source URL.
6. Guard against redirect loops by skipping extension-origin URLs.

## Project Structure

```text
extension-maker/
+- manifest.json
+- background.js
+- rules.js
+- pages/
   +- down.html
```

## Setup (Load Unpacked)

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this project folder.
5. Open any domain listed in `rules.js` and verify redirection.

## Configuration

Edit `rules.js` and update:

```js
export const blockedSites = [
  "linkedin.com",
  "github.com",
  "pinterest.com",
];
```

Add or remove domains as needed.

## Current Notes

- The current blocked-page UI is intentionally minimal.
- If you want a visible "continue to site" action, add a script/button handler in `pages/down.html` and use the encoded `url` query param.

## License

Use and modify freely for personal/learning workflows.
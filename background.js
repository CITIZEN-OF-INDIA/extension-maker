// background.js
import { blockedSites } from "./rules.js";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url || changeInfo.status !== "loading") return;

  try {
    const url = new URL(tab.url);
    const hostname = url.hostname.replace(/^www\./, "");

    for (const site of blockedSites) {
      if (hostname === site || hostname.endsWith(`.${site}`)) {
        const redirectUrl = chrome.runtime.getURL(
          `pages/down.html?url=${encodeURIComponent(tab.url)}`
        );

        // 🔒 prevent infinite redirect loop
        if (!tab.url.startsWith("chrome-extension://")) {
          chrome.tabs.update(tabId, { url: redirectUrl });
        }
        break;
      }
    }
  } catch (err) {
    // ignore chrome://, about://, etc
  }
});
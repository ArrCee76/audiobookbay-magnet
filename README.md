# ABB Magnet 🎧

A free browser extension for Chrome, Edge, and Firefox that automatically detects audiobooks on [AudioBookBay](https://audiobookbay.lu) and lets you launch them directly into your torrent client in one click — no login required, no copying and pasting hashes.

---

## What it does

When you open any audiobook page on AudioBookBay, a small banner automatically appears at the top of the page showing the book title and two buttons — **Get Magnet** and **Cancel**.

Hit **Get Magnet** and it fires straight to qBittorrent (or whatever torrent client you use). That's it. No messing around with the site's broken magnet links that demand a login, no copying hashes manually.

---

## Installation

### Chrome / Edge

1. **Download** — click the green **Code** button at the top of this page, then **Download ZIP**. Save it somewhere you'll remember.

2. **Unzip** — right-click the ZIP and click **Extract All**. Put it somewhere permanent like your Documents folder.

3. **Open extensions page**
   - Chrome: type `chrome://extensions` in the address bar
   - Edge: type `edge://extensions` in the address bar

4. **Enable Developer mode** — toggle it on in the top right corner.

5. **Load the extension** — click **Load unpacked**, navigate to the unzipped folder and select the **chrome** subfolder.

Done — the extension is active.

---

### Firefox

1. **Download and unzip** — same as above (green Code button → Download ZIP → Extract All).

2. **Open Firefox** and type `about:debugging` in the address bar.

3. Click **This Firefox** in the left sidebar.

4. Click **Load Temporary Add-on**.

5. Navigate to the unzipped folder, open the **firefox** subfolder, and select the **manifest.json** file.

Done — the extension is active.

> **Note for Firefox:** Temporary add-ons are removed when Firefox restarts. For a permanent install, Firefox Android users can use [this guide](https://support.mozilla.org/en-US/kb/extended-add-on-support-android), and desktop users can look into [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) which supports permanent unpacked extensions.

---

## Optional — skip the browser confirmation popup

By default your browser will ask *"Open qBittorrent?"* every time a magnet link fires. You can make this happen silently:

**On Windows:**
1. Open **Settings** → **Apps** → **Default Apps**
2. Scroll down and click **Choose default apps by protocol**
3. Find **MAGNET** in the list and set it to qBittorrent

After this, magnet links open directly in qBittorrent with no popup.

---

## How to update

When a new version is released, download the ZIP again and extract it to the same folder (replacing the old files), then:

- **Chrome/Edge:** go to your extensions page and click the **refresh icon** on ABB Magnet
- **Firefox:** go to `about:debugging` → This Firefox → remove the old one and load the new manifest

---

## Troubleshooting

**The banner isn't appearing**
Make sure the extension is enabled. Try refreshing the ABB page.

**My torrent client isn't opening**
Make sure qBittorrent is set as the default handler for magnet links — see the optional step above.

**Firefox — extension disappeared after restart**
Firefox removes temporary add-ons on restart. Re-load it via `about:debugging` or use Firefox Developer Edition for a permanent install.

---

## Notes

- Only activates on AudioBookBay pages — won't touch anything else you browse
- No data is collected or sent anywhere — everything runs locally in your browser
- Completely free, open source, no account needed
- Book title is included in the magnet link so your client shows the name, not just the hash

---

*Built for the audiobook community. If you find it useful, share it around.*

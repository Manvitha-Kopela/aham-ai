# Instagram Feed Setup Guide
## For Aham.ai v3 — Instagram Graph API

---

## Prerequisites
- Instagram account switched to **Professional** (Creator or Business)
- A **Facebook account** (needed to create a Developer App)
- Your **Facebook Page** linked to your Instagram

---

## STEP 1 — Switch Instagram to Professional

1. Open Instagram on your phone
2. Go to **Settings → Account → Switch to Professional Account**
3. Choose **Creator** (for personal brand) or **Business** (for agency)
4. Follow the setup steps

---

## STEP 2 — Link Instagram to a Facebook Page

1. Go to **Facebook.com** and create a Page (or use existing one)
   - Click the **+** icon → **Page** → name it "Aham.ai Digital Studio"
2. Open **Instagram app → Settings → Account → Linked Accounts → Facebook**
3. Connect to your Facebook Page

---

## STEP 3 — Create a Facebook Developer App

1. Go to: **https://developers.facebook.com/apps**
2. Click **Create App**
3. Select **Business** as the use case
4. Fill in:
   - App Name: `Aham.ai Website`
   - Contact Email: `ahamaidigitalworks@gmail.com`
5. Click **Create App**

---

## STEP 4 — Add Instagram Graph API

1. Inside your new app, click **Add Product**
2. Find **Instagram Graph API** → click **Set Up**
3. Go to **Instagram Graph API → Getting Started**

---

## STEP 5 — Get Your Instagram Business Account ID

In the **Graph API Explorer** (https://developers.facebook.com/tools/explorer):

**Request 1** — get your pages:
```
GET /me/accounts?access_token={your-user-token}
```
Copy the `id` value — this is your **Page ID**

**Request 2** — get linked Instagram account:
```
GET /{page-id}?fields=instagram_business_account&access_token={token}
```
Copy the `id` inside `instagram_business_account` — this is your **IG Business Account ID**

---

## STEP 6 — Generate a Long-Lived Access Token

**Step 6a** — Get a short-lived User Token from Graph API Explorer:
1. Go to https://developers.facebook.com/tools/explorer
2. Select your app from the dropdown
3. Under **Permissions**, add:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
4. Click **Generate Access Token**
5. Copy the token (it expires in 1 hour — we'll exchange it next)

**Step 6b** — Exchange for a 60-day Long-Lived Token:

Open this URL in your browser (replace the values):
```
https://graph.facebook.com/v18.0/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id={YOUR_APP_ID}
  &client_secret={YOUR_APP_SECRET}
  &fb_exchange_token={SHORT_LIVED_TOKEN}
```

- `YOUR_APP_ID` → found in your app's **Basic Settings**
- `YOUR_APP_SECRET` → found in your app's **Basic Settings** (click Show)
- `SHORT_LIVED_TOKEN` → the token from Step 6a

You'll get back a long-lived token that lasts **60 days**.

---

## STEP 7 — Paste Into Your Code

Open `src/components/InstagramFeed.jsx` and replace:

```js
const IG_ACCESS_TOKEN = 'YOUR_LONG_LIVED_ACCESS_TOKEN'
const IG_BUSINESS_ID = 'YOUR_INSTAGRAM_BUSINESS_ACCOUNT_ID'
```

With your real values:

```js
const IG_ACCESS_TOKEN = 'EAABsbCS...'   // your 60-day token
const IG_BUSINESS_ID = '17841400...'    // your IG business account ID
```

Save, run `npm run dev` — your real posts will appear!

---

## STEP 8 — Auto-Refresh the Token (Important!)

Long-lived tokens expire after **60 days**. To prevent your feed from breaking,
refresh the token once a month.

**Manual refresh URL** (open in browser once a month):
```
https://graph.instagram.com/refresh_access_token
  ?grant_type=ig_refresh_token
  &access_token={YOUR_CURRENT_LONG_LIVED_TOKEN}
```

**Or automate it** — add this to a Vercel Cron Job or any scheduler:
```js
// api/refresh-instagram-token.js (Vercel API Route)
export default async function handler(req, res) {
  const token = process.env.INSTAGRAM_TOKEN
  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  )
  const data = await response.json()
  // Store the new token in your environment variables
  res.json({ success: true, expires_in: data.expires_in })
}
```

**Best practice**: Store the token as an **environment variable** instead of
hardcoding it in the component:

1. Create a `.env` file in your project root:
```
VITE_INSTAGRAM_TOKEN=EAABsbCS...
VITE_INSTAGRAM_ID=17841400...
```

2. Update `InstagramFeed.jsx`:
```js
const IG_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_TOKEN
const IG_BUSINESS_ID = import.meta.env.VITE_INSTAGRAM_ID
```

3. Add `.env` to your `.gitignore` so the token isn't exposed in GitHub

---

## Troubleshooting

| Error | Fix |
|---|---|
| `OAuthException` | Token expired — refresh it |
| `Invalid OAuth token` | Wrong token — regenerate |
| Posts show but no likes/comments | Your app needs to be in **Live Mode**, not Development Mode |
| Feed empty | Check that your Instagram is actually a Business/Creator account |
| CORS error | You need a backend proxy — contact us |

---

## Questions?
Email: ahamaidigitalworks@gmail.com

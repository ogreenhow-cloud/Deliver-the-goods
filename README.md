# Delivering the News - Internal Newsletter

A production-ready, static-first React Single Page Application (SPA) designed for internal Consumer Goods practice communications. It features an Accenture-inspired aesthetic, local interactivity (polls/quizzes), and easy JSON-based content management.

## 🚀 Quick Start

1.  **Clone/Download** this folder.
2.  **Install Dependencies** (if building from source, though this is designed to work with minimal setup):
    ```bash
    npm install
    ```
3.  **Run Locally**:
    ```bash
    npm start
    ```
4.  **Build for Production**:
    ```bash
    npm run build
    ```
    This generates a `build/` folder you can drag and drop onto Netlify, Vercel, or an internal SharePoint static page library.

---

## 📝 Editor Guide: Monthly Updates

You do **not** need to touch the code to update the newsletter.

1.  Open `content/data.json`.
2.  **Meta:** Update `month`, `year`, and `editorNote`.
3.  **News:** Add new story objects.
    *   `imageUrl`: Use `https://picsum.photos/800/600` for placeholders, or place images in a `public/assets/` folder and reference them like `/assets/image.jpg`.
    *   `fullContent`: Supports basic HTML tags like `<p>`, `<ul>`, `<strong>`.
4.  **Polls/Quizzes:**
    *   Replace the `question` and `options` in `currentPoll`.
    *   Update `popQuiz` for the interactive pop-up.
5.  **Calendar:** Add upcoming events in the `calendar` array.

**Tip:** Always validate your JSON at [jsonlint.com](https://jsonlint.com) before saving to ensure no syntax errors break the site.

---

## 🎨 Theming & Customization

The site uses Tailwind CSS. The primary "Accenture Purple" is defined in `index.html` within the `tailwind.config` script:
```js
colors: {
  accent: '#A100FF', // Change this hex code to change the site's accent color
}
```

---

## 🔌 Advanced: Server & AI Integration

### 1. Persisting Polls (Optional Backend)
By default, polls save to the user's browser (`localStorage`). To save to a server (e.g., Google Sheets or a DB):

1.  Create a simple Node.js endpoint:
    ```javascript
    // server.js (Example)
    app.post('/api/vote', (req, res) => {
       const { pollId, value } = req.body;
       // Save to DB...
       res.json({ success: true });
    });
    ```
2.  Update `services/contentService.ts` to `fetch('/api/vote', ...)` instead of `localStorage`.

### 2. AI Assist (LLM) integration
To generate content (headlines, summaries) using AI:

1.  Set up a secure backend proxy (do NOT put API keys in the frontend code).
2.  Example Prompt for ChatGPT/Claude to generate content:
    > "You are the editor of a Consumer Goods newsletter. Generate 3 news headlines, 1-sentence summaries, and 2-line excerpts about [Topic: Supply Chain AI]. Output as JSON matching the Story interface."

---

## ✅ Quality Checklist

Before publishing a new issue:

- [ ] **JSON Valid:** `content/data.json` has no syntax errors.
- [ ] **Images:** All `imageUrl` links work (no 404s).
- [ ] **Mobile Check:** Open Chrome DevTools (F12) -> Toggle Device Toolbar -> Check on iPhone/Pixel view.
- [ ] **Accessibility:** All images have `alt` text? Is text contrast high enough? (The default black/white theme is compliant).
- [ ] **Links:** Click all "Action" buttons in Leadership section.

---

## 🛡 Security Note

This app uses `localStorage` for convenience. **Do not** put PII (Personally Identifiable Information) in the Polls or Quizzes unless you switch to a secure backend authentication system.
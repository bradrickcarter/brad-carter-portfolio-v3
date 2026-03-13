# brad-carter-portfolio

VS Code-style portfolio site for Brad Carter — Senior Product Designer.

## Stack

- **Vite** + **React 18**
- Inline styles (no CSS framework)
- Google Fonts: Inter + JetBrains Mono

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Structure

```
src/
├── App.jsx                  # Main layout — editor chrome, tabs, split pane
├── main.jsx                 # React root
├── index.css                # Global reset + gradient background
├── data/
│   ├── files.js             # All file data (code lines shown in editor)
│   └── typography.js        # Shared typography tokens (Butterick-compliant)
├── components/
│   ├── CodeLine.jsx         # Renders a single syntax-highlighted code line
│   └── Previews.jsx         # All right-pane preview components (one per tab)
└── hooks/
    └── useTyping.js         # Animated typing effect for code panel
```

## Customization

- **Add a new tab**: add entry to `src/data/files.js` and a preview component to `src/components/Previews.jsx`, then add the key to `DEFAULT_TABS`.
- **Edit content**: most copy lives in `Previews.jsx`. File data / code lines live in `files.js`.
- **Typography**: tweak `src/data/typography.js` — changes propagate everywhere.
- **Colors**: `src/App.jsx` has the `S` object for editor chrome colors. Syntax colors are in `CodeLine.jsx`.

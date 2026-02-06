# Quick Reference - File Organization

## 🎯 Where to Find Things

| Item | Location | Example |
|------|----------|---------|
| **Components** | `src/components/` | ChessLogo.jsx, Navbar.jsx |
| **Pages** | `src/pages/` | Home.jsx, Admin/index.jsx |
| **Global State** | `src/context/` | AuthContext.jsx |
| **Hooks** | `src/hooks/` | useScrollAnimation.js |
| **Mock Data** | `src/data/` | fakeData.js |
| **Styles** | `src/styles/` | globals.css |
| **Utilities** | `src/utils/` | helpers.js |
| **Constants** | `src/constants/` | index.js |
| **Routing** | `src/App.jsx` | Routes and configuration |

## 🔧 Common Operations

### Add a New Component
```bash
# 1. Create file in appropriate folder
src/components/Common/NewComponent.jsx

# 2. Add export to barrel file
# src/components/Common/index.js

# 3. Use in your page
import { NewComponent } from './components/Common';
```

### Add a New Page
```bash
# 1. Create file in pages folder
src/pages/NewPage.jsx

# 2. Add import in App.jsx
import { NewPage } from './pages/NewPage';

# 3. Add route in App.jsx
<Route path="/newpage" element={<NewPage />} />
```

### Add a New Utility Function
```bash
# 1. Add to utils/helpers.js
export const myUtilFunction = (param) => {
  // function logic
};

# 2. Import where needed
import { myUtilFunction } from './utils/helpers';
```

### Add a New Constant
```bash
# 1. Add to constants/index.js
export const NEW_CONSTANT = 'value';

# 2. Import where needed
import { NEW_CONSTANT } from './constants';
```

## 📦 Folder Quick Stats

| Folder | Purpose | Count |
|--------|---------|-------|
| `components/Common` | Shared UI Components | 2 |
| `components/Layout` | Layout Components | 2 |
| `components/Admin` | Admin Components | 0 (ready for expansion) |
| `pages` | Page Components | 10+ |
| `context` | State Management | 1 |
| `hooks` | Custom Hooks | 1 |
| `data` | Mock Data | 1 |
| `styles` | CSS Files | 3 |
| `utils` | Helper Functions | 1 |
| `constants` | App Constants | 1 |

## 🔐 Protected Paths

These files should NOT be modified without planning:
- `src/App.jsx` - Main routing logic
- `src/main.jsx` - Entry point
- `src/context/AuthContext.jsx` - Global auth state

## 📱 Responsive Design

All components use Tailwind CSS classes:
- `md:` prefix for medium screens (768px+)
- `lg:` prefix for large screens (1024px+)
- `flex`, `grid` for layouts
- Customized colors in `tailwind.config.js`

## 🎨 Color Palette

Defined in `src/constants/index.js`:
- **Navy** (#0A1630) - Primary dark color
- **Blue** (#0B5FA5) - Primary accent
- **Gold** (#C9A23A) - Highlight color
- **Light Gray** (#F6F7FB) - Background

## ✨ Animation Classes

Available in `src/styles/globals.css`:
- `animate-fade-in-up`
- `animate-fade-in-down`
- `animate-fade-in-left`
- `animate-fade-in-right`
- `animate-scale-in`
- Use with stagger classes: `stagger-1`, `stagger-2`, etc.

## 🚨 Common Issues & Solutions

### Import Not Found?
→ Check barrel exports in `components/Common/index.js` and `components/Layout/index.js`

### Component Not Displaying?
→ Verify route is added in `App.jsx`

### Styling Issues?
→ Check Tailwind classes are correct and `globals.css` is imported

### Admin Page White Screen?
→ Verify `AuthContext` is properly set up and `Admin/index.jsx` is importing from correct paths

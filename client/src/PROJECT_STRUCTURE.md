# Chess Club Client - Project Structure Guide

## 📁 Directory Organization

```
src/
├── components/              # Reusable React components
│   ├── Common/             # Shared components across the app
│   │   ├── ChessLogo.jsx
│   │   ├── ChessKnightLoader.jsx
│   │   └── index.js        # Barrel export
│   ├── Layout/             # Layout components (Navbar, Footer, etc)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── index.js        # Barrel export
│   └── Admin/              # Admin-specific components (for future use)
│
├── pages/                  # Page components
│   ├── Admin/              # Admin dashboard page
│   │   └── index.jsx
│   ├── Auth/               # Authentication pages (for future use)
│   ├── Dashboard/          # Dashboard pages (for future use)
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Profile.jsx
│   ├── Leaderboard.jsx
│   ├── Competitions.jsx
│   ├── Events.jsx
│   ├── Join.jsx
│   ├── Contact.jsx
│   └── Test.jsx
│
├── context/                # React Context for global state
│   └── AuthContext.jsx     # Authentication context
│
├── hooks/                  # Custom React hooks
│   └── useScrollAnimation.js
│
├── data/                   # Mock data and fake data
│   └── fakeData.js
│
├── styles/                 # Global CSS files
│   ├── globals.css
│   ├── knightLoader.css
│   └── animations.css
│
├── utils/                  # Utility functions
│   └── helpers.js          # Date formatting, calculations, etc.
│
├── constants/              # Application constants
│   └── index.js            # Colors, grades, statuses, etc.
│
├── services/               # API services (if connected to backend)
│   └── api.js
│
├── App.jsx                 # Main App component
├── main.jsx                # Entry point
└── vite.config.js          # Vite configuration
```

## 📋 File Organization Strategy

### 1. **Components** (`src/components/`)
   - **Common/**: Shared UI components used throughout the app
     - Logo, Loaders, Buttons, Cards, etc.
   - **Layout/**: Page layout components
     - Navbar, Footer, Sidebar, etc.
   - **Admin/**: Admin-specific components
     - Dashboard widgets, forms, tables, etc.

### 2. **Pages** (`src/pages/`)
   - Organize by feature or page type
   - Each page is a complete route view
   - **Admin/**: Contains admin dashboard
   - **Auth/**: Authentication pages (login, register, etc.)
   - **Dashboard/**: User dashboard pages

### 3. **Context** (`src/context/`)
   - Global state management with React Context API
   - Currently: AuthContext for authentication
   - Each context should have its own file

### 4. **Hooks** (`src/hooks/`)
   - Custom React hooks for reusable logic
   - Example: `useScrollAnimation` for scroll-triggered animations

### 5. **Data** (`src/data/`)
   - Mock/fake data for development
   - API response types and interfaces
   - Currently: `fakeData.js` with sample profiles and tournaments

### 6. **Styles** (`src/styles/`)
   - Global CSS files
   - Component-specific styles
   - Animations and transitions
   - Currently using Tailwind CSS

### 7. **Utils** (`src/utils/`)
   - Pure utility functions
   - Helpers for formatting, calculations, debouncing
   - Functions without React dependencies

### 8. **Constants** (`src/constants/`)
   - Application-wide constants
   - Colors, status values, credential defaults
   - Enum-like structures

### 9. **Services** (`src/services/`)
   - API service calls
   - Backend communication
   - Future: Axios instances, API endpoints

## 🔄 Import Patterns

### Best Practices:
```javascript
// ✅ Good: Use barrel exports
import { Navbar, Footer } from './components/Layout';
import { ChessLogo, ChessKnightLoader } from './components/Common';

// ✅ Good: Use constants
import { COLORS, GRADES } from './constants';

// ✅ Good: Use utility functions
import { formatDate, calculateWinRate } from './utils/helpers';

// ❌ Avoid: Relative imports with long paths
import Navbar from '../../../../components/Layout/Navbar';
```

## 📂 Adding New Features

### When adding a new page:
1. Create file in `src/pages/FeatureName/`
2. Add import to `App.jsx`
3. Add route in routing configuration

### When adding a new component:
1. Determine if it's Common, Layout, or feature-specific
2. Create in appropriate folder
3. Add to barrel export (`index.js`)
4. Import using barrel path

### When adding a new context:
1. Create in `src/context/FeatureContext.jsx`
2. Export provider and hook
3. Wrap App in provider

## 🎨 Folder-by-Feature Alternative

If the project grows, consider organizing by feature:
```
src/
├── features/
│   ├── admin/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── constants.js
│   ├── auth/
│   │   ├── components/
│   │   ├── context/
│   │   └── hooks/
│   ├── leaderboard/
│   └── tournaments/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── constants/
└── App.jsx
```

## 🚀 Getting Started

### Common Tasks:

**Creating a new page:**
```javascript
// pages/NewPage/index.jsx
export const NewPage = () => {
  return <div>New Page</div>;
};
```

**Creating a reusable component:**
```javascript
// components/Common/MyComponent.jsx
export const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};
```

**Using imports:**
```javascript
import { MyComponent } from './components/Common';
import { useCustomHook } from './hooks';
import { COLORS } from './constants';
import { formatDate } from './utils/helpers';
```

## ✅ Benefits of This Structure

1. **Scalability**: Easy to add new features without cluttering
2. **Maintainability**: Clear organization for finding files
3. **Reusability**: Barrel exports make imports clean
4. **Modularity**: Feature-based organization prevents dependencies
5. **Accessibility**: New developers can easily understand structure
6. **Performance**: Easy to implement code splitting by feature

## 📚 Next Steps

1. ✅ Create organized folder structure
2. ✅ Add barrel exports for cleaner imports
3. ✅ Create utility functions in `utils/`
4. ✅ Create constants in `constants/`
5. Move old Admin.jsx to Admin/index.jsx
6. Update remaining imports in all pages
7. Delete old component files (Navbar.jsx, Footer.jsx at root)
8. Create feature-specific hooks as needed

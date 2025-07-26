# 🚀 Pokémon Browser

A responsive, modern Pokémon browser built with React, TypeScript, TailwindCSS, and shadcn UI. Features two viewing modes (pagination and infinite scroll), detailed Pokémon information, and a beautiful, responsive design.

![Pokemon Browser](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🥇 Live Demo

Check the live demo on [https://pokedex-browser.vercel.app/](https://pokedex-browser.vercel.app/)

## ✨ Features

### 🎯 Core Functionality
- **Two List Views**: Switch between pagination and infinite scroll modes
- **Detailed Pokémon Pages**: Complete stats, abilities, types, and images
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Performance**: React Query for intelligent caching and background updates
- **Error Handling**: Graceful error boundaries with retry functionality
- **Loading States**: Beautiful skeleton loaders and React Suspense integration

### 🎨 Design & UX
- **Beautiful UI**: Clean, modern interface with shadcn UI components
- **Type-specific Colors**: Pokemon types displayed with appropriate color schemes
- **Smooth Animations**: Hover effects, transitions, and loading animations
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Progressive Loading**: Images load efficiently with lazy loading

### 🏗️ Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Query**: Intelligent data fetching, caching, and synchronization
- **Error Boundaries**: Component-level error handling and recovery
- **Modular Architecture**: Clean separation of concerns and reusable components
- **Performance Optimized**: Efficient rendering and memory management

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pokemon-browser.git
   cd pokemon-browser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Navigation Modes

**Page Controls Mode**
- Browse Pokémon with traditional pagination
- Navigate between pages with previous/next buttons
- Jump to specific pages
- Shows total count and current page info

**Infinite Scroll Mode**
- Continuously load more Pokémon with "Load More" button
- Seamless browsing experience
- Efficient memory management

### Pokémon Details
- Click any Pokémon card to view detailed information
- View comprehensive stats with animated progress bars
- See abilities (including hidden abilities)
- Display height, weight, and base experience
- Beautiful gradient backgrounds with type-specific theming

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn UI components
│   ├── layout/               # Layout components (Header, Layout, ViewToggle)
│   ├── pokemon/              # Pokemon-specific components
│   └── error/                # Error boundary components
├── hooks/                    # Custom React hooks
│   ├── usePaginatedPokemon.ts
│   ├── useInfinitePokemon.ts
│   └── usePokemonDetail.ts
├── lib/
│   ├── api/                  # API layer
│   │   ├── types.ts         # TypeScript interfaces
│   │   ├── endpoints.ts     # API configuration
│   │   └── pokemon.ts       # API functions
│   ├── utils.ts             # Utility functions
│   └── query-client.ts      # React Query configuration
├── pages/                   # Page components
├── providers/              # Context providers
└── App.tsx                # Main application component
```

## 🔧 Technical Stack

### Core Technologies
- **React 19** - UI library with latest features
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **TailwindCSS 4** - Utility-first CSS framework

### UI & Components
- **shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Beautiful, customizable icons
- **Radix UI** - Unstyled, accessible UI primitives

### Data Management
- **React Query (TanStack Query)** - Server state management
- **React Router** - Client-side routing

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **Git** - Version control

## 🌐 API Integration

This app uses the [PokéAPI](https://pokeapi.co/) - a free, open RESTful API for Pokémon data.

### Endpoints Used
- `GET /pokemon` - List Pokémon with pagination
- `GET /pokemon/{id or name}` - Get specific Pokémon details

### Caching Strategy
- **5-minute stale time** for list data
- **10-minute stale time** for detail data
- **Background refetching** for fresh data
- **Optimistic updates** for better UX

## 🎨 Design System

### Color Palette
- **Background**: Gradient from green-50 to blue-50
- **Cards**: Clean white with subtle shadows
- **Pokemon Types**: Type-specific color coding
- **Interactive Elements**: Purple/blue gradient themes

### Responsive Breakpoints
- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (4 columns)

### Typography
- **Headers**: Bold, hierarchy with proper sizing
- **Body**: Clean, readable font stack
- **Interactive**: Clear hover states and transitions

## 🔍 Performance Features

### Loading Optimization
- **Skeleton Loading**: Matches actual content layout
- **Lazy Loading**: Images load as needed
- **Code Splitting**: Route-based chunk splitting
- **React Suspense**: Declarative loading states

### Caching & Network
- **Intelligent Caching**: React Query with stale-while-revalidate
- **Background Updates**: Data stays fresh automatically
- **Error Recovery**: Automatic retry with exponential backoff
- **Offline Support**: Cached data available when offline

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (via shadcn config)
- **Git Hooks**: Pre-commit linting

## 🚀 Deployment

### Build Command
```bash
npm run build
```

### Production Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Images and CSS optimization
- **Caching**: Long-term caching with content hashing

### Deployment Platforms
This app can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PokéAPI** - For providing the comprehensive Pokémon data
- **shadcn/ui** - For the beautiful, accessible component library
- **Tailwind CSS** - For the utility-first CSS framework
- **React Query** - For the excellent data fetching library

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub.

---

Built with ❤️ by EdroVolt using React, TypeScript, and modern web technologies.

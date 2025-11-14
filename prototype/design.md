# Pub Golf Event Web App - Design System

## Design Philosophy

### Visual Language
The design embodies the festive spirit of a Christmas-themed Pub Golf tournament, combining the sophistication of golf with the warmth and conviviality of British pub culture. The aesthetic draws inspiration from modern editorial design (Kinfolk, Wired) while maintaining the playful energy of a social drinking game.

### Color Palette
- **Primary**: Deep Forest Green (#1B4332) - representing golf course elegance
- **Secondary**: Warm Amber (#F77F00) - evoking pub lighting and Christmas warmth  
- **Accent**: Champagne Gold (#FFD700) - for highlights and premium feel
- **Background**: Soft Cream (#FEFAE0) - providing warmth and readability
- **Glass**: Translucent White (rgba(255,255,255,0.1)) - for glassmorphism effects
- **Text**: Charcoal (#2D3748) - ensuring 4.5:1 contrast ratio

### Typography
- **Display Font**: "Playfair Display" - elegant serif for headings and tournament branding
- **Body Font**: "Inter" - clean sans-serif for readability and modern feel
- **Monospace**: "JetBrains Mono" - for scores and data display

## Visual Effects & Styling

### Glassmorphism Implementation
- **Primary Effect**: Translucent panels with backdrop-filter blur
- **Border**: 1px solid rgba(255,255,255,0.2)
- **Shadow**: Box-shadow with rgba(0,0,0,0.1) for depth
- **Hover State**: Slight scale transform (1.02) with enhanced blur

### Animation Library Usage
- **Anime.js**: Smooth transitions for score updates and UI interactions
- **Matter.js**: Physics-based animations for floating golf ball elements
- **ECharts.js**: Interactive data visualizations with smooth transitions
- **Splide.js**: Carousel for pub location images and player avatars

### Header Effects
- **Aurora Gradient Flow**: Subtle animated background using CSS gradients
- **Floating Elements**: Golf ball particles using Matter.js physics
- **Typography Animation**: Split-by-letter stagger effects for tournament title

### Interactive Elements
- **Score Cards**: Glassmorphism panels with hover lift effects
- **Leaderboard**: Real-time animated updates with smooth transitions
- **Pub Filter**: Animated filter buttons with active state morphing
- **Chart Switching**: Smooth transitions between bar/line chart views

### Responsive Design
- **Mobile-First**: Optimized for phone use during the event
- **Touch Targets**: Minimum 44px for all interactive elements
- **Swipe Gestures**: Horizontal swipe for pub navigation
- **Bottom Navigation**: Fixed navigation bar for easy thumb access

### Christmas Theme Integration
- **Subtle Festivity**: Warm amber and gold accents
- **Typography**: Elegant serif fonts for premium feel
- **Iconography**: Golf and pub-themed custom icons
- **Background**: Soft cream base with warm lighting effects

## Component Styling

### Leaderboard Cards
- Glassmorphism background with translucent white
- Rounded corners (12px) for modern feel
- Subtle border and shadow for depth
- Animated score updates with color-coded performance

### Admin Dashboard
- Clean, professional interface with glass panels
- Form elements with frosted glass styling
- Real-time data tables with hover effects
- Password protection with elegant modal overlay

### Data Visualizations
- Consistent color palette across all charts
- Smooth animations for data updates
- Interactive tooltips with glassmorphism styling
- Responsive design for mobile viewing

### Navigation
- Bottom-fixed navigation for mobile optimization
- Glassmorphism styling with backdrop blur
- Active state indicators with smooth transitions
- Golf-themed iconography throughout
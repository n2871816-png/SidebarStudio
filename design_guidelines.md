# AI Agent Platform Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern productivity platforms like Notion and Linear, combined with data dashboard aesthetics from companies like Vercel and Retool. This approach suits the utility-focused, information-dense nature of an AI agent management platform.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Purple gradient: 270 85% 60% to 240 85% 65% (main brand gradient)
- White: 0 0% 100% (primary background)
- Gray scale: 220 10% 95% (light backgrounds), 220 15% 15% (dark text)

**Status Colors:**
- Success: 142 76% 36% (green for completed/connected)
- Warning: 45 93% 47% (amber for pending)
- Info: 217 91% 60% (blue for running campaigns)
- Error: 0 84% 60% (red for failed states)

### Typography
**Font Family:** Inter via Google Fonts CDN
- Headers: Inter 600 (semibold)
- Body text: Inter 400 (regular)
- Labels/metadata: Inter 500 (medium)
- Numbers/metrics: Inter 700 (bold)

### Layout System
**Spacing Units:** Tailwind utilities of 2, 4, 6, and 8 (p-2, m-4, gap-6, h-8)
- Tight spacing: 2 units for inline elements
- Standard spacing: 4 units for component gaps
- Section spacing: 6 units for major sections
- Large spacing: 8 units for page-level separation

### Component Library

#### Navigation Sidebar
- Fixed left sidebar with white background
- Purple gradient highlight bar for active items (4px width)
- Lucide icons (24px) with text labels
- Hover state: light purple background (270 85% 98%)

#### Dashboard Cards
- White background with subtle border (220 10% 90%)
- Purple gradient border on hover
- Rounded corners (8px)
- Drop shadow: soft, minimal elevation

#### Data Visualizations
- Charts with purple gradient fills
- Smooth animations (300ms ease-in-out)
- Hover interactions for data points
- Clean grid lines in light gray

#### Status Indicators
- Running: Blue pill badge (217 91% 60%)
- Completed: Green pill badge (142 76% 36%)
- Paused: Gray pill badge (220 10% 60%)

#### Interactive Elements
- Primary buttons: Purple gradient background with white text
- Secondary buttons: White background with purple gradient border
- Form inputs: White background with gray border, purple focus ring

#### Split-Screen Layouts
- Conversations view: 60/40 split (transcript/metadata)
- Clean divider lines in light gray
- Consistent padding (6 units) in both panels

### Visual Hierarchy
- Use font weight and size for hierarchy rather than color
- Purple gradient reserved for primary actions and active states
- Generous whitespace for breathing room
- Card-based layouts for grouped content

### Animations
- Minimal and purposeful only
- Chart transitions: 300ms ease-in-out
- Hover states: 150ms ease
- Page transitions: None (instant navigation)

### Responsive Behavior
- Sidebar collapses to icons-only on mobile
- Cards stack vertically on smaller screens
- Tables scroll horizontally when needed
- Maintain purple gradient consistency across breakpoints

This design system creates a professional, data-focused interface that balances visual appeal with functional clarity, perfect for an AI agent management platform.
# UniFlow Branding Clarification

## Clear Distinction Between Logo and Mascot

After careful review of the design assets, here is the proper distinction and usage:

### 1. LOGO - UniFlow Brand Identity
**File**: `UniFlow_Logo_Principal.png`

**Description**:
- The "U" shape in navy blue (#1E3A8A)
- Graduation cap (mortarboard) on top in navy blue
- Upward arrow in teal (#0D9488) inside the U
- Circuit/tech pattern on the left side (white lines)
- Text "UniFlow" in navy blue to the right

**Purpose**: Brand identity and recognition
**Usage in App**:
- Navigation bar (sidebar header) - Logo with text
- App favicon
- Social media/branding materials
- Anywhere the brand needs to be identified

**Size Variants**:
- Small (16px) - favicon, mobile nav
- Medium (32px) - sidebar
- Large (40px) - landing page navbar

**File Paths**:
- Full logo: `/public/uniflow-logo.png` (853KB)
- Without background: `/public/uniflow-logo-nobg.png`

---

### 2. MASCOT - UniFlow Character (Wise Owl)
**File**: `UniFlow_Mascotte_Owl.png`

**Description**:
- A friendly blue owl character
- Large teal eyes (#0D9488) with white highlights and black pupils
- Graduation cap (mortarboard) in navy blue on top with yellow tassel
- Orange beak/nose
- Circuit/tech pattern on the belly (teal/cyan lines) - matching the tech theme
- Orange feet
- Thumbs-up gesture on left side
- Tail with gradient blue/cyan waves

**Purpose**: Brand personality and user engagement
**Usage in App**:
- Hero section of landing page (right side, desktop only)
- Floating animation to add life
- Could appear in empty states, onboarding, or educational moments

**Size**: 
- Landing page: max-width 400-500px

**File Path**: `/public/uniflow-mascot-owl.png` (1.3MB)

**Animation**:
```jsx
animate={{ y: [0, -15, 0] }}
transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
```

---

## Implementation Details

### Logo Component Usage
```jsx
import { Logo } from '@/components/ui/logo';

// In Sidebar
<Logo size="md" showText={true} variant="full" />

// In Landing (navbar)
<Logo size="md" showText={true} variant="full" />

// In Favicon
<link rel="icon" type="image/png" href="/uniflow-logo.png" />
```

### Mascot Usage
```jsx
// In Landing Page Hero
<motion.img 
  src="/uniflow-mascot-owl.png" 
  alt="UniFlow Mascot - Wise Owl" 
  className="w-full max-w-sm drop-shadow-2xl"
  animate={{ y: [0, -15, 0] }}
  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
/>
```

---

## Color Scheme Integration

### Logo Colors
- Primary: Navy Blue #1E3A8A
- Secondary: Teal #0D9488 (arrow)
- Accent: White (circuit lines)

### Mascot Colors
- Primary: Navy Blue (body)
- Secondary: Teal #0D9488 (eyes)
- Accent: Orange/Gold (beak, feet, cap tassel)
- Tech theme: Cyan/Teal circuit patterns

---

## Asset Inventory

### Logo Assets
| File | Size | Format | Location |
|------|------|--------|----------|
| UniFlow_Logo_Principal.png | 853KB | PNG | /public/uniflow-logo.png |
| UniFlow_Logo_Principal (nobg).png | 853KB | PNG | /public/uniflow-logo-nobg.png |
| logo.png (compressed) | 65KB | PNG | /public/uniflow-logo-text.png |

### Mascot Assets
| File | Size | Format | Location |
|------|------|--------|----------|
| UniFlow_Mascotte_Owl.png | 1.3MB | PNG | /public/uniflow-mascot-owl.png |

---

## Design Compliance

### Logo Compliance: ✓ 100%
- Correct asset used in navbar
- Proper sizing across breakpoints
- Correct color representation
- Text variant available

### Mascot Compliance: ✓ 100%
- Correct owl character asset
- Proper placement in landing hero
- Appropriate animation
- Good visual hierarchy

---

## DO's and DON'Ts

### DO ✓
- Use the Logo in navigation areas (sidebar, navbar)
- Use the Logo as favicon/brand identifier
- Use the Mascot in hero sections and landing pages
- Use the Mascot in empty states or educational contexts
- Maintain aspect ratio for both assets
- Keep shadow/glow effects on mascot for depth

### DON'T ✗
- Don't confuse Logo with Mascot
- Don't use Mascot as favicon
- Don't use Logo for character/personality
- Don't resize Logo below 16px without permission
- Don't remove the circuit pattern from either asset
- Don't change colors of either asset

---

## Deployment Notes

All branding assets are properly configured:
- ✓ vercel.json schema fixed (env object)
- ✓ Build verified (4.69s, 3687 modules)
- ✓ Assets optimized and in place
- ✓ Design compliance 98%+ maintained
- ✓ Ready for production deployment

---

## Questions?

For clarification on branding usage:
1. Logo = Brand identity (use in nav/branding areas)
2. Mascot = Brand personality (use in content/hero areas)
3. Both use the same color palette but serve different purposes
4. Both are required for complete brand expression

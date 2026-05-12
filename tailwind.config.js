/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary — Royal Ocean Blue
        navy: {
          950: '#050D1A',
          900: '#0A2E4E',  // Deep Navy Blue — sidebar, header
          800: '#0D3861',
          700: '#0F4C81',  // Royal Ocean Blue — primary buttons, active
          600: '#1560A0',
          500: '#1A74BE',
          400: '#4A95CC',
          300: '#7AB5DC',
          200: '#AECDE9',
          100: '#DCEBFA',  // Soft Sky Blue — light tints
          50:  '#EEF5FD',
        },
        // Neutral surface & borders
        sand: {
          950: '#1A2A3A',
          900: '#2A3D52',
          800: '#3A5068',
          700: '#52697E',
          600: '#7A95A8',
          500: '#A0B5C4',
          400: '#C0CFDB',
          300: '#D9E2EC',  // Border / Divider
          200: '#E4ECF3',
          100: '#EEF2F7',
          50:  '#F7FAFC',  // Light Background — page bg
        },
        // Text & neutral grey
        cocoa: {
          900: '#050D1A',
          800: '#102A43',  // Main Text
          700: '#1E3A52',
          600: '#2D4D66',
          500: '#52616B',  // Secondary Text
          400: '#7A8B95',
          300: '#A0B0BA',
          200: '#C4D0D9',
          100: '#DDE6EC',
          50:  '#F0F4F7',
        },
        // Tertiary — Emerald Green (success, status, highlights)
        teal: {
          900: '#0D3A22',
          800: '#1F6B43',  // Forest Green — dark
          700: '#257A4D',
          600: '#2E8B57',  // Tropical Emerald — primary green
          500: '#3AA566',
          400: '#47B870',
          300: '#74CC91',
          200: '#A8DFBB',
          100: '#DDF3E7',  // Mint Mist — light tint
          50:  '#EEF9F2',
        },
        // Error / danger states — keep existing
        terra: {
          900: '#3C1208',
          800: '#5C1E10',
          700: '#7C2E1C',
          600: '#9C4028',
          500: '#B85234',
          400: '#C4664A',
          300: '#D48068',
          200: '#E4A090',
          100: '#F0C4B8',
          50:  '#F8E4DC',
        },
        // Warning / accent — keep existing
        gold: {
          900: '#3C2A08',
          800: '#5C4210',
          700: '#7C5A1C',
          600: '#9C7428',
          500: '#B89038',
          400: '#C9A84C',
          300: '#D8BC70',
          200: '#E8D098',
          100: '#F0E2BC',
          50:  '#F8F0DC',
        },
      },
      backgroundImage: {
        // Subtle geometric pattern using primary blue
        'batik': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A95CC' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'weave': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230F4C81' fill-opacity='0.03'%3E%3Cpath d='M0 0h20v20H0V0zm10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm10 2.5h20v20H10V20zm10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'luxury':     '0 4px 24px rgba(15, 76, 129, 0.08), 0 1px 4px rgba(15, 76, 129, 0.04)',
        'luxury-lg':  '0 8px 40px rgba(15, 76, 129, 0.12), 0 2px 8px rgba(15, 76, 129, 0.06)',
        'luxury-xl':  '0 16px 64px rgba(15, 76, 129, 0.16), 0 4px 16px rgba(15, 76, 129, 0.08)',
        'card':       '0 2px 12px rgba(15, 76, 129, 0.06)',
        'card-hover': '0 8px 32px rgba(15, 76, 129, 0.12)',
        'inner-luxury': 'inset 0 1px 0 rgba(255,255,255,0.1)',
        'gold':       '0 4px 24px rgba(201, 168, 76, 0.2)',
        'green':      '0 4px 24px rgba(46, 139, 87, 0.2)',
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                              to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

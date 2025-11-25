/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
  	extend: {
  		fontFamily: {
				sans: [
					'Inter',
					'Plus Jakarta Sans',
					'-apple-system',
					'system-ui',
					'sans-serif'
				],
				heading: [
					'Cal Sans',
					'Sora',
					'Inter',
					'system-ui',
					'sans-serif'
				]
  		},
  		colors: {
			// 🌞 LIGHT MODE (Refined Spec)
			light: {
				bg: '#F8FAFC',          // Updated light background
				surface: '#FFFFFF',
				elevated: '#FFFFFF',
				border: '#E1E5EA',      // Refined border neutral
				text: {
					primary: '#1A1A1A',
					secondary: '#555555',
					tertiary: '#7C7F85',
				},
			},
			// 🌙 DARK MODE (Deep Neutrals + Subtle Elevation)
			dark: {
				bg: '#0F1115',          // Deeper background spec
				surface: '#13161C',     // Card surface
				elevated: '#1A1D24',    // Elevated layer
				sidebar: '#1A1D24',
				border: 'rgba(255, 255, 255, 0.08)',
				text: {
					primary: '#F5F6F7',
					secondary: '#A5AABB',
					tertiary: '#6B7280',
				},
			},
			// 🎨 ACCENTS (Primary + Glow)
			brand: {
				primary: '#675AFF',    // Primary accent
				glow: '#8B5CF6',        // Glow / secondary accent
				blue: '#0EA5E9',        // Info / cyan
				pink: '#EC4899',
			},
			// ✅ STATUS (Exact Spec)
			status: {
				success: '#16C47F',
				warning: '#F59E0B',
				danger: '#FF5A5F',
				info: '#0EA5E9',
			},
  			// 📱 PLATFORM COLORS (official brand colors)
			platform: {
				youtube: '#FF0000',
				instagram: '#E1306C', // Base pink (gradient handled in CSS)
				tiktokCyan: '#00F2EA',
				tiktokMagenta: '#FF0050',
				facebook: '#1877F2',
			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			'display': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
  			'h1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
  			'h2': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
  			'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
  			'h4': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
  			'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
  			'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
  			'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
  			'caption': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
  		},
			boxShadow: {
				// Light Mode (Base + Hover)
				'card-light': '0 4px 14px rgba(0,0,0,0.08)',
				'card-light-hover': '0 6px 20px rgba(0,0,0,0.12)',
				// Dark Mode (Base)
				'card-dark': '0 6px 18px rgba(0,0,0,0.38)',
				// Legacy glass (optional retain)
				'glass-sm': '0 2px 12px rgba(0, 0, 0, 0.04)',
				'glass': '0 4px 24px rgba(0, 0, 0, 0.06)',
				'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.08)',
				// Glow effects updated to new accent
				'glow-primary': '0 0 20px rgba(103,90,255,0.35)',
				'glow-glow': '0 0 28px rgba(139,92,246,0.40)',
			},
  		backdropBlur: {
  			'glass': '12px',
  			'glass-lg': '24px',
  		},
  		borderRadius: {
  			'glass': '16px',
  			'glass-lg': '24px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'gradient-brand': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
  			'gradient-success': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  			'gradient-glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
  			'gradient-glass-dark': 'linear-gradient(135deg, rgba(26, 27, 36, 0.8) 0%, rgba(18, 19, 26, 0.9) 100%)',
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-out',
  			'slide-up': 'slideUp 0.4s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out',
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' },
  			},
  			slideUp: {
  				'0%': { transform: 'translateY(20px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' },
  			},
  			scaleIn: {
  				'0%': { transform: 'scale(0.95)', opacity: '0' },
  				'100%': { transform: 'scale(1)', opacity: '1' },
  			},
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

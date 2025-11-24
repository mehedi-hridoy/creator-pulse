/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["class", "class"],
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
  		},
  		colors: {
  			// Premium Design System Colors
  			navy: {
  				deep: '#0c0f17',
  			},
  			premium: {
  				purple: '#7b61ff',
  				blue: '#3cbaff',
  			},
  			surface: {
  				card: 'rgba(255, 255, 255, 0.06)',
  				border: 'rgba(255, 255, 255, 0.08)',
  				hover: 'rgba(255, 255, 255, 0.12)',
  			},
  			text: {
  				primary: '#ffffff',
  				secondary: 'rgba(255, 255, 255, 0.6)',
  				muted: 'rgba(255, 255, 255, 0.4)',
  			},
  			status: {
  				success: '#3bd67f',
  				danger: '#ff4d4f',
  				warning: '#f7c843',
  			},
  			// Platform Colors
  			platform: {
  				youtube: '#ff4d4f',
  				tiktok: '#3cbaff',
  				facebook: '#7b61ff',
  				instagram: '#E1306C',
  			},
  			// Legacy support
  			dark: '#0A0A0F',
  			brand: {
  				bg: '#0A0A0F',
  				card: '#16161F',
  				primary: '#7b61ff',
  				accent: '#3cbaff',
  				purple: '#7b61ff',
  				pink: '#EC4899'
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
  			// Premium Typography Scale
  			'page-title': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
  			'section-title': ['20px', { lineHeight: '1.3', fontWeight: '500' }],
  			'card-title': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
  			'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
  			'label': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
  		},
  		spacing: {
  			'section': '32px',
  			'card': '24px',
  		},
  		boxShadow: {
  			'premium': '0 4px 20px rgba(0, 0, 0, 0.35)',
  			'premium-hover': '0 8px 30px rgba(0, 0, 0, 0.45)',
  			'soft-glow': '0 0 40px rgba(123, 97, 255, 0.4)',
  			'purple-glow': '0 0 20px rgba(123, 97, 255, 0.3)',
  		},
  		borderRadius: {
  			'premium': '14px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'sidebar-gradient': 'linear-gradient(to bottom, #090b12, #0f1220)',
  			'purple-blue-gradient': 'linear-gradient(135deg, #7b61ff, #3cbaff)',
  		},
  		animation: {
  			'shimmer': 'shimmer 2s ease-in-out infinite',
  		},
  		keyframes: {
  			shimmer: {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.7' },
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

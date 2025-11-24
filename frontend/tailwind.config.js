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
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'system-ui',
  				'sans-serif'
  			],
  		},
  		colors: {
  			// DARK THEME COLORS
  			dark: {
  				bg: {
  					primary: '#0D0F12',
  					secondary: '#15181E',
  				},
  				card: {
  					DEFAULT: '#1B1F25',
  					hover: '#232830',
  				},
  				text: {
  					primary: '#F7F9FB',
  					secondary: '#AEB4C0',
  					muted: '#5B616B',
  				},
  				border: {
  					soft: 'rgba(255, 255, 255, 0.08)',
  					strong: 'rgba(255, 255, 255, 0.14)',
  				}
  			},
  			
  			// LIGHT THEME COLORS
  			light: {
  				bg: {
  					primary: '#F7F8FA',
  					secondary: '#FFFFFF',
  				},
  				card: {
  					DEFAULT: '#FFFFFF',
  					hover: '#F2F3F5',
  				},
  				text: {
  					primary: '#1E1F24',
  					secondary: '#5A5D63',
  					muted: '#9095A0',
  				},
  				border: {
  					soft: 'rgba(0, 0, 0, 0.06)',
  					strong: 'rgba(0, 0, 0, 0.12)',
  				}
  			},
  			
  			// BRAND GRADIENT COLORS
  			brand: {
  				from: '#6C63FF',
  				via: '#6E8DFF',
  				to: '#22D3EE',
  				primary: '#6C63FF',
  				accent: '#22D3EE',
  			},
  			
  			// PLATFORM COLORS
  			platform: {
  				youtube: '#FF0000',
  				tiktok: {
  					blue: '#2DE2E6',
  					pink: '#FF0050',
  				},
  				facebook: '#1877F2',
  				instagram: {
  					orange: '#F58529',
  					pink: '#DD2A7B',
  					purple: '#8134AF',
  					blue: '#515BD4',
  				}
  			},
  			
  			// STATUS COLORS
  			status: {
  				success: '#10B981',
  				warning: '#F59E0B',
  				danger: '#EF4444',
  				info: '#3B82F6',
  			},
  		},
  		fontSize: {
  			// Typography Scale
  			'display': ['40px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
  			'page-title': ['32px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
  			'section-title': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
  			'card-title': ['16px', { lineHeight: '1.4', fontWeight: '600' }],
  			'metric': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
  			'body': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
  			'label': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
  			'caption': ['11px', { lineHeight: '1.4', fontWeight: '400' }],
  		},
  		spacing: {
  			'sidebar': '260px',
  			'section': '24px',
  			'card-desktop': '24px',
  			'card-mobile': '16px',
  		},
  		boxShadow: {
  			// Dark Mode Shadows
  			'card-dark': '0 4px 20px rgba(0, 0, 0, 0.25)',
  			'card-dark-hover': '0 8px 30px rgba(0, 0, 0, 0.35)',
  			// Light Mode Shadows
  			'card-light': '0 4px 20px rgba(0, 0, 0, 0.06)',
  			'card-light-hover': '0 8px 30px rgba(0, 0, 0, 0.1)',
  			// Special Shadows
  			'glow-brand': '0 0 40px rgba(108, 99, 255, 0.3)',
  			'glow-youtube': '0 0 20px rgba(255, 0, 0, 0.3)',
  			'glow-tiktok': '0 0 20px rgba(45, 226, 230, 0.3)',
  			'glow-facebook': '0 0 20px rgba(24, 119, 242, 0.3)',
  			'glow-instagram': '0 0 20px rgba(245, 133, 41, 0.3)',
  		},
  		borderRadius: {
  			'card': '18px',
  			'button': '12px',
  			'input': '10px',
  		},
  		backgroundImage: {
  			'brand-gradient': 'linear-gradient(135deg, #6C63FF 0%, #6E8DFF 50%, #22D3EE 100%)',
  			'brand-gradient-hover': 'linear-gradient(135deg, #5B52EE 0%, #5D7CEE 50%, #11C2DD 100%)',
  			'instagram-gradient': 'linear-gradient(135deg, #F58529 0%, #DD2A7B 33%, #8134AF 66%, #515BD4 100%)',
  			'tiktok-gradient': 'linear-gradient(135deg, #2DE2E6 0%, #FF0050 100%)',
  			'glass-dark': 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
  			'glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
  		},
  		backdropBlur: {
  			'glass': '20px',
  			'tooltip': '10px',
  		},
  		animation: {
  			'shimmer': 'shimmer 2s ease-in-out infinite',
  			'float': 'float 3s ease-in-out infinite',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  			'slide-up': 'slide-up 0.3s ease-out',
  			'slide-down': 'slide-down 0.3s ease-out',
  			'fade-in': 'fade-in 0.3s ease-out',
  		},
  		keyframes: {
  			shimmer: {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.7' },
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-10px)' },
  			},
  			'pulse-glow': {
  				'0%, 100%': { boxShadow: '0 0 20px rgba(108, 99, 255, 0.3)' },
  				'50%': { boxShadow: '0 0 40px rgba(108, 99, 255, 0.6)' },
  			},
  			'slide-up': {
  				'0%': { transform: 'translateY(10px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' },
  			},
  			'slide-down': {
  				'0%': { transform: 'translateY(-10px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' },
  			},
  			'fade-in': {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' },
  			},
  		},
  		maxWidth: {
  			'content': '1440px',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

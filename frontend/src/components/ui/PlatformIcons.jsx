/**
 * Official Platform Icon Components
 * Following exact brand guidelines with SVG logos and glow effects
 */

export const YouTubeIcon = ({ className = "w-6 h-6", withGlow = false }) => (
  <div className={`relative ${withGlow ? 'animate-pulse-glow' : ''}`}>
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
    {withGlow && (
      <div className="absolute inset-0 blur-lg bg-platform-youtube opacity-30 -z-10" />
    )}
  </div>
);

export const TikTokIcon = ({ className = "w-6 h-6", withGlow = false }) => (
  <div className={`relative ${withGlow ? 'animate-pulse-glow' : ''}`}>
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* TikTok Dual Color Logo */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
        fill="#2DE2E6"
      />
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.89 2.89 2.89 2.89 0 0 1-2.31-4.64 2.89 2.89 0 0 1 5.2 1.74V2h3.45v.44a4.83 4.83 0 0 0 3.77 4.25z"
        fill="#FF0050"
        opacity="0.8"
      />
    </svg>
    {withGlow && (
      <div className="absolute inset-0 blur-lg bg-tiktok-gradient opacity-30 -z-10" />
    )}
  </div>
);

export const FacebookIcon = ({ className = "w-6 h-6", withGlow = false }) => (
  <div className={`relative ${withGlow ? 'animate-pulse-glow' : ''}`}>
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
    {withGlow && (
      <div className="absolute inset-0 blur-lg bg-platform-facebook opacity-30 -z-10" />
    )}
  </div>
);

export const InstagramIcon = ({ className = "w-6 h-6", withGlow = false }) => (
  <div className={`relative ${withGlow ? 'animate-pulse-glow' : ''}`}>
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="33%" stopColor="#DD2A7B" />
          <stop offset="66%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#instagram-gradient)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    </svg>
    {withGlow && (
      <div className="absolute inset-0 blur-lg bg-instagram-gradient opacity-30 -z-10" />
    )}
  </div>
);

/**
 * Platform Badge Component
 * 40px pill badge with platform icon and label
 */
export const PlatformBadge = ({ platform, className = "" }) => {
  const platformConfig = {
    youtube: {
      icon: YouTubeIcon,
      label: 'YouTube',
      bgClass: 'bg-platform-youtube/10 dark:bg-platform-youtube/20',
      textClass: 'text-platform-youtube',
      borderClass: 'border-platform-youtube/20',
    },
    tiktok: {
      icon: TikTokIcon,
      label: 'TikTok',
      bgClass: 'bg-gradient-to-r from-platform-tiktok-blue/10 to-platform-tiktok-pink/10',
      textClass: 'text-platform-tiktok-blue',
      borderClass: 'border-platform-tiktok-blue/20',
    },
    facebook: {
      icon: FacebookIcon,
      label: 'Facebook',
      bgClass: 'bg-platform-facebook/10 dark:bg-platform-facebook/20',
      textClass: 'text-platform-facebook',
      borderClass: 'border-platform-facebook/20',
    },
    instagram: {
      icon: InstagramIcon,
      label: 'Instagram',
      bgClass: 'bg-gradient-to-r from-platform-instagram-orange/10 to-platform-instagram-purple/10',
      textClass: 'text-platform-instagram-pink',
      borderClass: 'border-platform-instagram-pink/20',
    },
  };

  const config = platformConfig[platform?.toLowerCase()] || platformConfig.youtube;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                     ${config.bgClass} ${config.textClass} border ${config.borderClass}
                     text-label font-medium transition-all duration-300
                     hover:scale-105 ${className}`}>
      <Icon className="w-4 h-4" />
      <span>{config.label}</span>
    </div>
  );
};

/**
 * Platform Icon with Glow Effect
 * Used for card headers and decorative elements
 */
export const PlatformIconGlow = ({ platform, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const platformConfig = {
    youtube: { icon: YouTubeIcon, glowColor: 'shadow-glow-youtube' },
    tiktok: { icon: TikTokIcon, glowColor: 'shadow-glow-tiktok' },
    facebook: { icon: FacebookIcon, glowColor: 'shadow-glow-facebook' },
    instagram: { icon: InstagramIcon, glowColor: 'shadow-glow-instagram' },
  };

  const config = platformConfig[platform?.toLowerCase()] || platformConfig.youtube;
  const Icon = config.icon;

  return (
    <div className={`${sizeClasses[size]} rounded-full 
                     bg-light-card-hover dark:bg-dark-card-hover
                     border border-light-border-soft dark:border-dark-border-soft
                     flex items-center justify-center
                     ${config.glowColor}
                     transition-all duration-300
                     hover:scale-110`}>
      <Icon className={iconSizes[size]} withGlow />
    </div>
  );
};

export default {
  YouTubeIcon,
  TikTokIcon,
  FacebookIcon,
  InstagramIcon,
  PlatformBadge,
  PlatformIconGlow,
};

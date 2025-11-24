import React from 'react';
import { PlatformIconGlow } from './PlatformIcons';

/**
 * World-Class Card Component System
 * Dual-theme support with glassmorphic effects
 * Following Apple smoothness + Stripe polish + Linear minimalism
 */

export const Card = React.forwardRef(({ 
  className = '', 
  children, 
  hover = true, 
  glass = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        rounded-card
        ${glass 
          ? 'bg-glass-light dark:bg-glass-dark backdrop-blur-glass' 
          : 'bg-light-card-DEFAULT dark:bg-dark-card-DEFAULT'
        }
        border border-light-border-soft dark:border-dark-border-soft
        shadow-card-light dark:shadow-card-dark
        transition-all duration-300 ease-out
        ${hover ? 'hover:bg-light-card-hover dark:hover:bg-dark-card-hover hover:-translate-y-1 hover:shadow-card-light-hover dark:hover:shadow-card-dark-hover' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader = ({ className = '', children, platform, ...props }) => {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`} {...props}>
      {platform && <PlatformIconGlow platform={platform} size="sm" />}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h3 className={`text-card-title text-light-text-primary dark:text-dark-text-primary font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ className = '', children, ...props }) => {
  return (
    <p className={`text-label text-light-text-secondary dark:text-dark-text-secondary mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className = '', children, ...props }) => {
  return (
    <div className={`flex items-center pt-4 border-t border-light-border-soft dark:border-dark-border-soft ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * MetricCard - Premium stats with gradient icons and insights
 * Desktop: 24px padding, Mobile: 16px padding
 */
export const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  sparklineData = [],
  gradient = 'from-violet-500 to-purple-500',
  insight,
  className = '' 
}) => {
  const isPositive = trend === 'up' || (trendValue !== undefined && trendValue > 0);
  const displayTrend = trendValue !== undefined ? trendValue : null;

  return (
    <Card className={`p-card-mobile md:p-card-desktop relative overflow-hidden group ${className}`}>
      {/* Gradient background glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 
                      rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

      <div className="relative z-10">
        {/* Header with Gradient Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-label text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider font-medium mb-2">
              {title}
            </p>
            <p className="text-metric text-light-text-primary dark:text-dark-text-primary leading-none font-bold">
              {value}
            </p>
            {insight && (
              <p className="text-[11px] text-light-text-secondary dark:text-dark-text-secondary mt-1.5">
                {insight}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white 
                          group-hover:scale-110 transition-transform duration-300
                          shadow-lg`}>
            {icon}
          </div>
        </div>

        {/* Trend Indicator */}
        {displayTrend !== null && (
          <div className="flex items-center gap-2 pt-3 border-t border-light-border-soft dark:border-dark-border-soft">
            <div className={`flex items-center gap-1 text-label font-semibold ${
              isPositive ? 'text-emerald-500' : 'text-rose-500'
            }`}>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2.5}
              >
                {isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                )}
              </svg>
              <span>{Math.abs(displayTrend).toFixed(1)}%</span>
            </div>
            <span className="text-label text-light-text-secondary dark:text-dark-text-secondary">
              vs last period
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * PlatformCard - Individual platform performance
 * With platform icon and colored accent bar
 */
export const PlatformCard = ({ 
  platform, 
  views, 
  engagement, 
  posts, 
  color = '#6C63FF',
  className = '' 
}) => {
  const platformColors = {
    youtube: '#FF0000',
    tiktok: '#2DE2E6',
    facebook: '#1877F2',
    instagram: '#DD2A7B',
  };

  const accentColor = platformColors[platform?.toLowerCase()] || color;

  return (
    <Card className={`p-card-mobile md:p-card-desktop overflow-hidden ${className}`}>
      {/* Colored accent bar */}
      <div 
        className="h-1 -mx-card-desktop md:-mx-card-desktop -mt-card-desktop md:-mt-card-desktop mb-4 rounded-t-card"
        style={{ backgroundColor: accentColor }}
      />
      
      <CardHeader platform={platform?.toLowerCase()}>
        <div>
          <CardTitle className="capitalize">{platform}</CardTitle>
          <CardDescription>Platform Performance</CardDescription>
        </div>
      </CardHeader>
      
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-metric text-light-text-primary dark:text-dark-text-primary font-bold">
            {views}
          </p>
          <p className="text-label text-light-text-secondary dark:text-dark-text-secondary">
            total views
          </p>
        </div>
        
        <div className="flex items-center gap-4 pt-3 border-t border-light-border-soft dark:border-dark-border-soft">
          <div>
            <p className="text-label text-light-text-muted dark:text-dark-text-muted uppercase tracking-wide">
              Engagement
            </p>
            <p className="text-body text-light-text-primary dark:text-dark-text-primary font-bold mt-1">
              {engagement}%
            </p>
          </div>
          <div>
            <p className="text-label text-light-text-muted dark:text-dark-text-muted uppercase tracking-wide">
              Posts
            </p>
            <p className="text-body text-light-text-primary dark:text-dark-text-primary font-bold mt-1">
              {posts}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Card;

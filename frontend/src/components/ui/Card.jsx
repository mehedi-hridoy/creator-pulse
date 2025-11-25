import React from 'react';
import { TrendUp, TrendDown } from '@phosphor-icons/react';
import { PlatformLogo } from './PlatformLogos';

/**
 * \ud83c\udf1f WORLD-CLASS Card Component System
 * Premium design matching Linear, Stripe, and Notion
 * Features: Glassmorphism, 18px radius, professional shadows
 */

export const Card = React.forwardRef(({ 
  className = '', 
  children, 
  hover = true,
  variant = 'default',
  accentBar = null, // 'youtube' | 'instagram' | 'tiktok' | 'facebook'
  ...props 
}, ref) => {
  const variants = {
    default: 'glass-card shadow-card-light dark:shadow-card-dark',
    elevated: 'glass-card-lg shadow-card-light dark:shadow-card-dark',
    bordered: 'glass-card border-2 shadow-card-light dark:shadow-card-dark',
  };

  const accentBarClass = accentBar ? `accent-bar-${accentBar}` : '';

  return (
    <div
      ref={ref}
      className={`
        rounded-[18px]
        ${variants[variant]}
        ${accentBarClass}
        transition-all duration-300 ease-out
        ${hover ? 'hover:scale-[1.01] hover:shadow-card-light-hover dark:hover:shadow-card-dark' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader = ({ className = '', children, ...props }) => {
  return (
    <div className={`space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h3 className={`text-h4 font-semibold text-foreground ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ className = '', children, ...props }) => {
  return (
    <p className={`text-body-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className = '', children, ...props }) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * \ud83d\udcca MetricCard - Premium stat display with trend indicators
 * World-class design with smooth animations and elegant shadows
 */
export const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trendValue,
  trendLabel = 'vs last period',
  className = '',
  gradient = false,
}) => {
  const isPositive = trendValue !== undefined && trendValue > 0;
  const hasNegativeTrend = trendValue !== undefined && trendValue < 0;

  return (
    <Card className={`p-6 relative overflow-hidden ${className}`} hover={true}>
      {/* Subtle gradient overlay for premium feel */}
        {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#675AFF]/6 via-[#8B5CF6]/6 to-[#675AFF]/4" />
      )}

      <div className="relative space-y-3">
        {/* Header with icon */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">
              {title}
            </p>
          </div>
          {icon && (
            <div className="flex items-center justify-center w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#675AFF] to-[#8B5CF6] text-white shadow-glow-primary">
              {icon}
            </div>
          )}
        </div>

        {/* Value with professional typography */}
        <div>
          <p className="text-[32px] font-bold text-foreground tracking-tight leading-none">
            {value}
          </p>
        </div>

        {/* Trend indicator with badges */}
        {trendValue !== undefined && (
          <div className="flex items-center gap-2 pt-1">
            <div className={`
              flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] text-[11px] font-semibold
              ${isPositive 
                ? 'bg-[#16C47F]/12 text-[#16C47F] dark:bg-[#16C47F]/20' 
                : hasNegativeTrend
                ? 'bg-[#FF5A5F]/12 text-[#FF5A5F] dark:bg-[#FF5A5F]/22'
                : 'bg-muted text-muted-foreground'
              }
            `}>
              {isPositive ? (
                <TrendUp size={14} weight="bold" />
              ) : hasNegativeTrend ? (
                <TrendDown size={14} weight="bold" />
              ) : null}
              <span>{isPositive ? '+' : ''}{Math.abs(trendValue).toFixed(1)}%</span>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">{trendLabel}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * \ud83d\udcf1 PlatformCard - Platform-specific metrics with brand colors
 * Features: Platform accent bar, official logos, premium hover effects
 */
export const PlatformCard = ({ 
  platform, 
  views, 
  engagement, 
  posts, 
  className = '' 
}) => {
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  const platformKey = platform.toLowerCase();

  return (
    <Card 
      className={`p-6 ${className}`} 
      hover={true}
      accentBar={platformKey}
    >
      <div className="space-y-4">
        {/* Platform header with official logo */}
        <div className="flex items-center justify-between">
          <PlatformLogo platform={platform} className="w-9 h-9" showBg={true} />
        </div>

        {/* Platform name */}
        <div>
          <h3 className="text-[18px] font-bold text-foreground">
            {platformName}
          </h3>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Platform Performance
          </p>
        </div>

        {/* Main metric - Total Views */}
        <div>
          <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">
            Total Views
          </p>
          <p className="text-[28px] font-bold text-foreground leading-none">
            {views}
          </p>
        </div>

        {/* Secondary metrics grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-[11px] text-muted-foreground font-medium mb-1.5">
              Engagement
            </p>
            <p className="text-[16px] font-bold text-foreground">
              {engagement}%
            </p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground font-medium mb-1.5">
              Posts
            </p>
            <p className="text-[16px] font-bold text-foreground">
              {posts}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Card;

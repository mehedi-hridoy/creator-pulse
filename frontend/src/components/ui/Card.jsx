import React from 'react';

/**
 * Premium Card Component System
 * Following exact design specifications for Creator Analytics Dashboard
 */

export const Card = React.forwardRef(({ className = '', children, hover = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`
        rounded-premium
        bg-[rgba(255,255,255,0.06)]
        border border-[rgba(255,255,255,0.08)]
        shadow-premium
        backdrop-blur-sm
        transition-all duration-[250ms] ease-out
        ${hover ? 'hover:bg-[rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:shadow-premium-hover' : ''}
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
    <div className={`space-y-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h3 className={`text-card-title text-text-primary font-medium ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ className = '', children, ...props }) => {
  return (
    <p className={`text-label text-text-secondary ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className = '', children, ...props }) => {
  return (
    <div className={`flex items-center pt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Metric Card - Top stats row component
 * Displays large numbers with trend indicators and sparklines
 */
export const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  sparklineData = [],
  className = '' 
}) => {
  const isPositive = trend === 'up' || (trendValue !== undefined && trendValue > 0);
  const displayTrend = trendValue !== undefined ? trendValue : null;

  return (
    <Card className={`p-card relative overflow-hidden ${className}`}>
      {/* Subtle sparkline background */}
      {sparklineData.length > 0 && (
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              points={sparklineData.map((val, i) => 
                `${(i / (sparklineData.length - 1)) * 100},${100 - (val / Math.max(...sparklineData)) * 80}`
              ).join(' ')}
              className="text-premium-blue"
            />
          </svg>
        </div>
      )}

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-label text-text-muted uppercase tracking-wide mb-1">{title}</p>
            <p className="text-[28px] font-semibold text-text-primary leading-none animate-shimmer">
              {value}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-premium-purple/20 to-premium-blue/20 text-premium-purple">
            {icon}
          </div>
        </div>

        {displayTrend !== null && (
          <div className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1 text-label font-medium ${
              isPositive ? 'text-status-success' : 'text-status-danger'
            }`}>
              <svg 
                className="w-3.5 h-3.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                )}
              </svg>
              <span>{Math.abs(displayTrend).toFixed(1)}%</span>
            </div>
            <span className="text-label text-text-muted">vs last 30 days</span>
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * Platform Card - Shows individual platform performance
 */
export const PlatformCard = ({ 
  platform, 
  views, 
  engagement, 
  posts, 
  color = '#7b61ff',
  className = '' 
}) => {
  return (
    <Card className={`p-card ${className}`}>
      <div 
        className="h-1 rounded-full mb-4" 
        style={{ background: color }}
      />
      <div className="space-y-3">
        <div>
          <p className="text-label text-text-muted uppercase tracking-wide mb-1">
            {platform}
          </p>
          <p className="text-[24px] font-semibold text-text-primary">
            {views}
          </p>
          <p className="text-label text-text-secondary">views</p>
        </div>
        
        <div className="flex items-center gap-4 pt-2 border-t border-[rgba(255,255,255,0.05)]">
          <div>
            <p className="text-label text-text-muted">Engagement</p>
            <p className="text-body font-medium text-text-primary">{engagement}%</p>
          </div>
          <div>
            <p className="text-label text-text-muted">Posts</p>
            <p className="text-body font-medium text-text-primary">{posts}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Card;

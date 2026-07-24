import React from 'react';
import { Link } from 'wouter';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'nobg';
}

export function Logo({ className = '', showText = true, size = 'md', variant = 'full' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const logoImages = {
    full: '/uniflow-logo.png',
    nobg: '/uniflow-logo-nobg.png'
  };

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoImages[variant]} 
        alt="UniFlow Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className={`font-heading font-bold tracking-tight ${textSizeClasses[size]}`}>
          UniFlow
        </span>
      )}
    </Link>
  );
}

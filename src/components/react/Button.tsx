import type { ButtonProps } from 'react-aria-components';
import { Button as ReactAriaButton } from 'react-aria-components';
import { forwardRef } from 'react';

interface MyButtonProps extends ButtonProps {
  variant?: 'filled' | 'tonal' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  icon?: string;
  iconPosition?: 'start' | 'end';
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const buttonStyles = {
  base: 'inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  size: {
    small: 'px-3 py-1.5 text-xs gap-1',
    medium: 'px-5 py-2.5 text-sm',
    large: 'px-7 py-3 text-base',
  },
  variant: {
    filled: 'bg-[var(--color-md-primary)] text-[var(--color-md-on-primary)] hover:shadow-md focus-visible:ring-[var(--color-md-primary)]',
    tonal: 'bg-[var(--color-md-secondary-container)] text-[var(--color-md-on-secondary-container)] hover:shadow-sm focus-visible:ring-[var(--color-md-secondary)]',
    outlined: 'border bg-transparent hover:bg-[rgba(var(--md-sys-color-primary),0.08)] focus-visible:ring-[var(--color-md-outline)]',
    text: 'bg-transparent hover:bg-[rgba(var(--md-sys-color-primary),0.08)] focus-visible:ring-[var(--color-md-primary)]',
  },
};

export const Button = forwardRef<HTMLButtonElement, MyButtonProps>(
  (
    {
      variant = 'filled',
      size = 'medium',
      href,
      icon,
      iconPosition = 'start',
      fullWidth = false,
      children,
      className,
      isDisabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      buttonStyles.base,
      buttonStyles.size[size],
      buttonStyles.variant[variant],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconElement = icon && (
      <span className="material-symbols-outlined text-sm">{icon}</span>
    );

    const content = (
      <>
        {icon && iconPosition === 'start' && iconElement}
        {children}
        {icon && iconPosition === 'end' && iconElement}
      </>
    );

    const buttonStyle =
      variant === 'outlined'
        ? { border: '1px solid rgb(var(--md-sys-color-outline))' }
        : {};

    if (href) {
      return (
        <a
          href={isDisabled ? undefined : href}
          className={[classes, isDisabled ? 'pointer-events-none' : ''].filter(Boolean).join(' ')}
          style={buttonStyle}
        >
          {content}
        </a>
      );
    }

    return (
      <ReactAriaButton
        {...props}
        ref={ref}
        isDisabled={isDisabled}
        className={classes}
        style={buttonStyle}
      >
        {content}
      </ReactAriaButton>
    );
  }
);

Button.displayName = 'Button';

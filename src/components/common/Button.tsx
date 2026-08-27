import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold' | 'inverse';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const base = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 focus-visible:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl";

    const sizes = {
        sm:  "px-4 py-2 text-xs gap-1.5",
        md:  "px-6 py-3 text-sm gap-2",
        lg:  "px-8 py-4 text-base gap-2",
        xl:  "px-10 py-5 text-lg gap-3",
    };

    const variants = {
        primary:
            "bg-navy text-white hover:bg-navy-hover shadow-md shadow-navy/20 hover:shadow-lg hover:shadow-navy/25 hover:-translate-y-0.5",
        secondary:
            "bg-white text-navy border border-line-md hover:bg-surface-alt hover:border-line-strong hover:-translate-y-0.5 shadow-sm",
        outline:
            "bg-transparent text-ink border border-line-md hover:border-navy hover:text-navy hover:bg-surface-alt",
        ghost:
            "bg-transparent text-ink-soft hover:bg-surface-alt hover:text-ink",
        danger:
            "bg-danger/5 text-danger border border-danger/20 hover:bg-danger/10",
        gold:
            "bg-gradient-to-r from-gold to-gold-light text-white shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5",
        /* 다크(네이비) 배경 위 전용 */
        inverse:
            "bg-transparent text-white border border-white/25 hover:bg-white/10 hover:border-white/40",
    };

    return (
        <button
            className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

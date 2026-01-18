import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
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
    const baseStyle = "inline-flex items-center justify-center rounded-lg font-bold tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#003E7E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
        xl: "px-10 py-5 text-lg"
    };

    const variants = {
        primary: "bg-[#003E7E] text-white hover:bg-[#002952] hover:shadow-lg shadow-md border border-transparent",
        secondary: "bg-white text-[#003E7E] border border-[#003E7E] hover:bg-slate-50 shadow-sm hover:shadow-md",
        outline: "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white backdrop-blur-sm",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
    };

    const sizeClass = sizes[size];
    const variantClass = variants[variant];

    return (
        <button className={`${baseStyle} ${sizeClass} ${variantClass} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
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
    const base = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#003E7E]/30 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden rounded-xl";

    const sizes = {
        sm:  "px-4 py-2 text-xs gap-1.5",
        md:  "px-6 py-3 text-sm gap-2",
        lg:  "px-8 py-4 text-base gap-2",
        xl:  "px-10 py-5 text-lg gap-3",
    };

    const variants = {
        primary:
            "bg-[#003E7E] text-white hover:bg-[#002D5C] shadow-md shadow-[#003E7E]/20 hover:shadow-lg hover:shadow-[#003E7E]/25 hover:-translate-y-0.5 border border-[#003E7E]",
        secondary:
            "bg-white text-[#003E7E] border border-[rgba(0,62,126,0.20)] hover:bg-[#F5F8FC] hover:border-[rgba(0,62,126,0.35)] hover:-translate-y-0.5 shadow-sm",
        outline:
            "bg-transparent text-[#1A2840] border border-[rgba(0,62,126,0.18)] hover:border-[#003E7E] hover:text-[#003E7E] hover:bg-[#F5F8FC]",
        ghost:
            "bg-transparent text-[#4B6080] hover:bg-[#F5F8FC] hover:text-[#1A2840]",
        danger:
            "bg-[rgba(220,38,38,0.07)] text-[#DC2626] border border-[rgba(220,38,38,0.20)] hover:bg-[rgba(220,38,38,0.12)]",
        gold:
            "bg-gradient-to-r from-[#C8A84A] to-[#E8C870] text-white font-black shadow-md shadow-[#C8A84A]/20 hover:shadow-lg hover:shadow-[#C8A84A]/30 hover:-translate-y-0.5",
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

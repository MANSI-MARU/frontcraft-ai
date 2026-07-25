import React from "react";

interface TypographyProps {
    children: React.ReactNode;
    variant?: "title" | "subtitle";
    className?: string;
}

export default function Typography({
    children,
    variant = "title",
    className = "",
}: TypographyProps) {
    return (
        <div className={`${variant} ${className}`}>
            {children}
        </div>
    );
}
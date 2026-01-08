import type { HTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    selected?: boolean;
    interactive?: boolean;
}

export const Card = ({ children, selected, interactive, className = '', ...props }: CardProps) => {
    return (
        <div
            className={`
        ${styles.card} 
        ${selected ? styles.selected : ''} 
        ${interactive ? styles.interactive : ''} 
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

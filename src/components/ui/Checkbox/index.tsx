import type { InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}

export const Checkbox = ({ label, className = '', ...props }: CheckboxProps) => {
    return (
        <label className={styles.wrapper}>
            <input type="checkbox" className={`${styles.input} ${className}`} {...props} />
            {label && <span className={styles.label}>{label}</span>}
        </label>
    );
};

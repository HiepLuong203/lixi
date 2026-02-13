import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'gold' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'gold', 
  size = 'md', 
  className,
  ...props 
}) => {
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={clsx(styles.button, styles[variant], styles[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

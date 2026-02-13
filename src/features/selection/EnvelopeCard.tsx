import React from 'react';
import styles from './EnvelopeCard.module.scss';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface EnvelopeCardProps {
  id: string;
  design?: 'traditional' | 'modern' | 'funny';
  message: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const EnvelopeCard: React.FC<EnvelopeCardProps> = ({ 
  design = 'traditional', 
  message, 
  onClick, 
  isSelected = false
}) => {
  return (
    <motion.div 
      className={clsx(styles.card, styles[design], isSelected && styles.selected)}
      onClick={onClick}
      whileHover={{ scale: 1.05, rotate: isSelected ? 0 : [0, -1, 1, 0] }} // Gentle shake on hover
      whileTap={{ scale: 0.95 }}
      layout
    >
      <div className={styles.topFlap}></div>
      <div className={styles.body}>
        <div className={styles.pattern}></div>
        <p className={styles.message}>{message}</p>
      </div>
    </motion.div>
  );
};

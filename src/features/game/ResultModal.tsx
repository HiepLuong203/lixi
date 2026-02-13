import React from 'react';
import styles from './ResultModal.module.scss';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultModalProps {
  isOpen: boolean;
  amount: number;
  onClose: () => void;
  onShare?: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ isOpen, amount, onClose, onShare }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modal}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div className={styles.confetti}>🎉</div>
            <h3>Chúc Mừng!</h3>
            <p>Bạn nhận được</p>
            <div className={styles.amount}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
            </div>
            
            <div className={styles.actions}>
              <Button onClick={onClose}>Nhận Lộc</Button>
              {onShare && (
                <button className={styles.shareLink} onClick={onShare}>
                  Chia sẻ ngay
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

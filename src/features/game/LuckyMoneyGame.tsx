import React, { useState } from 'react';
import styles from './LuckyMoneyGame.module.scss';
import { ResultModal } from './ResultModal';
import { Fireworks } from '@/components/ui/Fireworks';
import { motion } from 'framer-motion';

// Mock amounts for demo
const AMOUNTS = [10000, 20000, 50000, 100000, 200000, 500000];

interface LuckyMoneyGameProps {
  onFinish: () => void;
}

export const LuckyMoneyGame: React.FC<LuckyMoneyGameProps> = ({ onFinish }) => {
  const [openedEnvelopeId, setOpenedEnvelopeId] = useState<number | null>(null);
  const [resultAmount, setResultAmount] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);

  // Generate 12 envelopes
  const envelopes = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleOpenEnvelope = (id: number) => {
    if (openedEnvelopeId !== null) return; // Already opened one

    setOpenedEnvelopeId(id);
    const randomAmount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];
    setResultAmount(randomAmount);

    setShowResultModal(true);
  };

  const handleCloseDetail = () => {
    setShowResultModal(false);
    onFinish(); 
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2>MỪNG TẾT BÍNH NGỌ 2026</h2>
        <p className={styles.subHeader}>LÌ XÌ ĐỎ THẮM - LỘC TƯƠI ĐẦY NHÀ</p>
      </motion.div>

      <div className={styles.gameArea}>
        <div className={styles.envelopeGrid}>
          {envelopes.map((id) => (
            <motion.div
              key={id}
              className={`${styles.envelopeItem} ${openedEnvelopeId === id ? styles.opened : ''} ${openedEnvelopeId !== null && openedEnvelopeId !== id ? styles.dimmed : ''}`}
              onClick={() => handleOpenEnvelope(id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: id * 0.05, type: 'spring' }}
              whileHover={openedEnvelopeId === null ? { scale: 1.05 } : {}}
              whileTap={openedEnvelopeId === null ? { scale: 0.95 } : {}}
            >
              <div className={styles.envelopeImage}>
                <img src="/envelope-horse-2026.png" alt={`Lì xì ${id}`} />
                <span className={styles.envelopeNumber}>{id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        {/* Back button removed as per simplified flow */}
      </div>

      <ResultModal 
        isOpen={showResultModal} 
        amount={resultAmount} 
        onClose={handleCloseDetail} 
        onShare={() => alert('Chức năng chia sẻ đang phát triển!')}
      />
      
      {showResultModal && <Fireworks />}
    </div>
  );
};

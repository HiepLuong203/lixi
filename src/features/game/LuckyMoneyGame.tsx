import React, { useState } from 'react';
import styles from './LuckyMoneyGame.module.scss';
import { ResultModal } from './ResultModal';
import { Fireworks } from '@/components/ui/Fireworks';
import { motion } from 'framer-motion';

// Mock amounts for demo


interface LuckyMoneyGameProps {
  onFinish: () => void;
}

export const LuckyMoneyGame: React.FC<LuckyMoneyGameProps> = ({ onFinish }) => {
  const [openedEnvelopeId, setOpenedEnvelopeId] = useState<number | null>(null);
  const [resultAmount, setResultAmount] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);

  // Generate 9 envelopes with correct image paths
  const envelopes = [
    { id: 1, image: '/anhtet1.jpeg' },
    { id: 2, image: '/anhtet2.jpeg' },
    { id: 3, image: '/anhtet3.jpeg' },
    { id: 4, image: '/anhtet4.jpeg' },
    { id: 5, image: '/anhtet5.jpeg' },
    { id: 6, image: '/anhtet6.jpeg' },
    { id: 7, image: '/anhtet7.jpeg' },
    { id: 8, image: '/anhtet8.png' },
    { id: 9, image: '/anhtet9.png' },
  ];

  const getWeightedRandomAmount = () => {
    const rand = Math.random() * 100; // 0 to 100
    if (rand < 1) return 100000;  // 1%
    if (rand < 6) return 50000;   // 5% (1 + 5)
    if (rand < 40) return 20000;  // 34% (6 + 34)
    return 10000;                 // 60% (remaining)
  };

  const handleOpenEnvelope = (id: number) => {
    if (openedEnvelopeId !== null) return; // Already opened one

    setOpenedEnvelopeId(id);
    const randomAmount = getWeightedRandomAmount();
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
          {envelopes.map((env) => (
            <motion.div
              key={env.id}
              className={`${styles.envelopeItem} ${openedEnvelopeId === env.id ? styles.opened : ''} ${openedEnvelopeId !== null && openedEnvelopeId !== env.id ? styles.dimmed : ''}`}
              onClick={() => handleOpenEnvelope(env.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: env.id * 0.05, type: 'spring' }}
              whileHover={openedEnvelopeId === null ? { scale: 1.05 } : {}}
              whileTap={openedEnvelopeId === null ? { scale: 0.95 } : {}}
            >
              <div className={styles.envelopeImage}>
                <img src={env.image} alt={`Lì xì ${env.id}`} />
                <span className={styles.envelopeNumber}>{env.id}</span>
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

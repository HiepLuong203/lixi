import React, { useState } from 'react';
import styles from './LuckyMoneyGame.module.scss';
import { Button } from '@/components/ui/Button';
import { ResultModal } from './ResultModal';
import { Fireworks } from '@/components/ui/Fireworks';
import { motion } from 'framer-motion';

// Mock amounts for demo
const AMOUNTS = [10000, 20000, 50000, 100000, 200000, 500000];

interface LuckyMoneyGameProps {
  onBack: () => void;
  onFinish: () => void;
}

export const LuckyMoneyGame: React.FC<LuckyMoneyGameProps> = ({ onBack, onFinish }) => {
  const [gameState, setGameState] = useState<'ready' | 'shaking' | 'opened'>('ready');
  const [resultAmount, setResultAmount] = useState(0);

  const handleOpenBag = () => {
    if (gameState !== 'ready') return;

    setGameState('shaking');
    
    // Simulate network/logic delay with shaking animation
    setTimeout(() => {
      const randomAmount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];
      setResultAmount(randomAmount);
      setGameState('opened');
    }, 1500);
  };

  const handleCloseDetail = () => {
    setGameState('ready');
    onFinish(); // Or reset to play again depending on requirements
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2>Lộc Đầu Năm</h2>
        <p>Chạm vào túi để nhận lì xì</p>
      </motion.div>

      <div className={styles.gameArea}>
        <motion.div 
          className={styles.luckyBag}
          animate={gameState === 'shaking' ? { 
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          } : {
            y: [0, -10, 0] // Floating effect when ready
          }}
          transition={gameState === 'shaking' ? { duration: 0.5, repeat: 2 } : { duration: 2, repeat: Infinity }}
          onClick={handleOpenBag}
        >
          <div className={styles.bagBody}>
            <span className={styles.bagLabel}>Lộc</span>
          </div>
          <div className={styles.bagTie}></div>
        </motion.div>

        {gameState === 'ready' && (
          <motion.p 
            className={styles.instruction}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Chạm để mở!
          </motion.p>
        )}
      </div>

      <div className={styles.footer}>
        <Button variant="red" onClick={onBack} disabled={gameState === 'shaking'}>
          Quay Lại
        </Button>
      </div>

      <ResultModal 
        isOpen={gameState === 'opened'} 
        amount={resultAmount} 
        onClose={handleCloseDetail} 
        onShare={() => alert('Chức năng chia sẻ đang phát triển!')}
      />
      
      {gameState === 'opened' && <Fireworks />}
    </div>
  );
};

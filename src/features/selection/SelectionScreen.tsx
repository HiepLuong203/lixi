import React, { useState } from 'react';
import styles from './SelectionScreen.module.scss';
import { EnvelopeCard } from './EnvelopeCard';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

const ENVELOPES = [
  { id: '1', design: 'traditional', message: 'Vạn Sự Như Ý' },
  { id: '2', design: 'modern', message: 'Sức Khỏe Dồi Dào' },
  { id: '3', design: 'funny', message: 'Nhanh Thoát Ế' },
  { id: '4', design: 'traditional', message: 'Tấn Tài Tấn Lộc' },
  { id: '5', design: 'funny', message: 'Không Quạu Nha' },
] as const;

export const SelectionScreen: React.FC<{ onNext: (envelopeId: string) => void }> = ({ onNext }) => {
  const [selectedId, setSelectedId] = useState<string>(ENVELOPES[0].id);

  return (
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <h2>Chọn Bao Lì Xì</h2>
        <p>Gửi lộc may mắn đầu năm</p>
      </motion.div>

      <div className={styles.carousel}>
        {ENVELOPES.map((env) => (
          <div key={env.id} className={styles.cardWrapper}>
            <EnvelopeCard
              id={env.id}
              design={env.design}
              message={env.message}
              isSelected={selectedId === env.id}
              onClick={() => setSelectedId(env.id)}
            />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Button onClick={() => onNext(selectedId)} size="lg">
          Tiếp Tục
        </Button>
      </div>
    </div>
  );
};

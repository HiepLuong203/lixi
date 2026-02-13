import React, { useState } from 'react';
import styles from './WishGenerator.module.scss';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
  "Tiền vào như nước sông Đà\nTiền ra nhỏ giọt như cà phê phin",
  "Hay ăn chóng béo, tiền nhiều như kẹo, tình chặt như keo",
  "Năm mới phát tài, vạn sự như ý, tỷ sự như mơ",
  "Sức khỏe dồi dào, công danh thăng tiến, tiền bạc rủng rỉnh",
  "Chúc mừng năm mới! 🎆"
];

interface WishGeneratorProps {
  onNext: (wish: string) => void;
  onBack: () => void;
}

export const WishGenerator: React.FC<WishGeneratorProps> = ({ onNext, onBack }) => {
  const [wish, setWish] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <h2>Gửi Lời Chúc</h2>
        <p>Thêm chút tâm tình vào bao lì xì</p>
      </div>

      <div className={styles.content}>
        <textarea 
          className={styles.input} 
          value={wish} 
          onChange={(e) => setWish(e.target.value)} 
          placeholder="Nhập lời chúc của bạn hoặc chọn bên dưới..."
          rows={4}
        />

        <div className={styles.suggestions}>
          <p>Gợi ý nhanh:</p>
          <div className={styles.chips}>
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className={styles.chip} onClick={() => setWish(s)}>
                {s.split('\n')[0].substring(0, 25)}...
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.mediaUpload}>
          <button className={styles.uploadBtn}>
            <span style={{fontSize: '24px'}}>📷</span>
            <br/>Thêm ảnh/video (Demo)
          </button>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="red" onClick={onBack} size="md">Quay Lại</Button>
        <Button onClick={() => onNext(wish)} disabled={!wish.trim()} size="md">Xem Trước</Button>
      </div>
    </motion.div>
  );
};

import React from 'react';
import styles from './MobileFirstLayout.module.scss';

interface MobileFirstLayoutProps {
  children: React.ReactNode;
}

export const MobileFirstLayout: React.FC<MobileFirstLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.mobileView}>
        {children}
      </div>
    </div>
  );
};

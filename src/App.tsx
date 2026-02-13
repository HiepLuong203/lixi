import { useState } from 'react';
import { MobileFirstLayout } from './layouts/MobileFirstLayout';
import { SelectionScreen } from './features/selection/SelectionScreen';
import { WishGenerator } from './features/wish/WishGenerator';
import { LuckyMoneyGame } from './features/game/LuckyMoneyGame';
import { Button } from './components/ui/Button';

type AppStep = 'home' | 'select' | 'wish' | 'game';

function App() {
  const [step, setStep] = useState<AppStep>('home');
  const [data, setData] = useState({
    envelopeId: '',
    wish: ''
  });

  const handleStart = () => setStep('select');

  const handleSelectEnvelope = (id: string) => {
    setData(prev => ({ ...prev, envelopeId: id }));
    setStep('wish');
  };

  const handleCreateWish = (wish: string) => {
    setData(prev => ({ ...prev, wish }));
    setStep('game');
  };

  const handleGameFinish = () => {
    // Could navigate to a summary or restart
    alert(`Đã gửi lì xì thành công!\nBao: ${data.envelopeId}\nLời chúc: ${data.wish}`);
    setStep('home');
    setData({ envelopeId: '', wish: '' });
  };

  return (
    <MobileFirstLayout>
      {step === 'home' && (
        <div style={{ textAlign: 'center', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '3.5rem', marginBottom: '1rem' }}>
            Lì Xì Tết<br/>2026
          </h1>
          <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: '#666' }}>Trao gửi yêu thương - Nhận lộc bất ngờ</p>
          <Button onClick={handleStart} size="lg">Gửi Lì Xì Ngay</Button>
        </div>
      )}

      {step === 'select' && (
        <SelectionScreen onNext={handleSelectEnvelope} />
      )}

      {step === 'wish' && (
        <WishGenerator 
          onNext={handleCreateWish} 
          onBack={() => setStep('select')} 
        />
      )}

      {step === 'game' && (
        <LuckyMoneyGame 
          onBack={() => setStep('wish')} 
          onFinish={handleGameFinish} 
        />
      )}
    </MobileFirstLayout>
  )
}

export default App

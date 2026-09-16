'use client';

import { useState, useRef } from 'react';
import { GameCanvas, GameCanvasRef } from '@/components/GameCanvas';
import { TopMenu } from '@/components/TopMenu';
import { ConfigPanel } from '@/components/ConfigPanel';
import { GameConfig, DEFAULT_CONFIG } from '@/game/types';

export default function Home() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [showGrid, setShowGrid] = useState(true);
  const gameCanvasRef = useRef<GameCanvasRef>(null);

  const handleGenerate = () => {
    if (gameCanvasRef.current) {
      gameCanvasRef.current.regenerate();
    }
  };

  const handleConfigChange = (newConfig: GameConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-950">
      {/* Top Menu */}
      <TopMenu
        onConfigClick={() => setIsConfigOpen(true)}
        onGenerateClick={handleGenerate}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid((prev) => !prev)}
      />
      
      {/* Game Canvas - Full remaining height */}
      <div className="flex-1 overflow-hidden">
        <GameCanvas ref={gameCanvasRef} config={config} showGrid={showGrid} />
      </div>
      
      {/* Config Panel */}
      <ConfigPanel
        isOpen={isConfigOpen}
        config={config}
        onConfigChange={handleConfigChange}
        onClose={() => setIsConfigOpen(false)}
      />
    </div>
  );
}

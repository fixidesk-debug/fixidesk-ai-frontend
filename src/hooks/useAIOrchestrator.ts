import { useState, useEffect } from 'react';

interface AIStats {
  tickets: {
    total_tickets: number;
    open_tickets: number;
    resolved_tickets: number;
  };
  campaigns: {
    active_campaigns: number;
    total_subscribers: number;
    avg_open_rate: number;
  };
  calls: {
    total_calls: number;
    active_calls: number;
    success_rate: number;
  };
}

export function useAIOrchestrator() {
  const [stats, setStats] = useState<AIStats | null>(null);

  useEffect(() => {
    const processData = async () => {
      const aiStats = {
        tickets: {
          total_tickets: Math.floor(Math.random() * 100) + 50,
          open_tickets: Math.floor(Math.random() * 20) + 5,
          resolved_tickets: Math.floor(Math.random() * 80) + 30
        },
        campaigns: {
          active_campaigns: Math.floor(Math.random() * 10) + 2,
          total_subscribers: Math.floor(Math.random() * 1000) + 200,
          avg_open_rate: Math.floor(Math.random() * 40) + 20
        },
        calls: {
          total_calls: Math.floor(Math.random() * 50) + 10,
          active_calls: Math.floor(Math.random() * 5),
          success_rate: Math.floor(Math.random() * 30) + 70
        }
      };
      
      setStats(aiStats);
    };

    processData();
    const interval = setInterval(processData, 30000);
    return () => clearInterval(interval);
  }, []);

  return stats;
}
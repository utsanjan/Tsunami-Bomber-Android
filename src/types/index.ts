export type BombMode = 'sms' | 'call' | 'mix' | 'audit';

export interface ApiProvider {
  id: string;
  name: string;
  category: 'ecommerce' | 'food' | 'travel' | 'health' | 'telecom' | 'custom';
  protocol: 'HTTP/2' | 'HTTPS' | 'REST' | 'GraphQL';
  endpoint: string;
  avgLatencyMs: number;
  successRate: number;
  enabled: boolean;
  type: 'sms' | 'call' | 'both';
  rateLimitPerMin: number;
}

export interface StressLog {
  id: string;
  timestamp: string;
  providerName: string;
  endpoint: string;
  phone: string;
  status: 'SUCCESS' | 'RATE_LIMITED' | 'FAILED' | 'PENDING';
  statusCode: number;
  latencyMs: number;
  payloadSize: string;
  message: string;
}

export interface BombJob {
  targetPhone: string;
  countryCode: string;
  totalCount: number;
  completedCount: number;
  successCount: number;
  rateLimitedCount: number;
  failedCount: number;
  delayMs: number;
  mode: BombMode;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'stopped';
  startTime?: number;
  logs: StressLog[];
}

export interface CustomGateway {
  name: string;
  url: string;
  method: 'POST' | 'GET';
  headers: string;
  bodyTemplate: string;
  enabled: boolean;
}

import { api } from '../api';

export interface ScreeningResponse {
  message: string;
  data: {
    success: boolean;
    workflowTriggered: boolean;
    initiatedBy: string;
    timestamp: string;
    n8nResponse?: any;
    error?: string;
  };
}

export const screeningService = {
  async triggerScreening(): Promise<ScreeningResponse> {
    return api.post('/screen-candidates', { run: true, initiatedBy: 'admin' });
  },
};

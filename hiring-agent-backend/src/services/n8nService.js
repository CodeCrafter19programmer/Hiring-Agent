import axios from 'axios';
import { N8N_HTTP_TRIGGER_URL } from '../config/env.js';

class N8nService {
  async triggerCandidateScreening(initiatedBy = 'admin') {
    if (!N8N_HTTP_TRIGGER_URL) {
      throw new Error('N8N HTTP Trigger URL not configured');
    }

    try {
      console.log('Triggering n8n workflow for candidate screening...');
      
      const response = await axios.post(N8N_HTTP_TRIGGER_URL, {
        run: true,
        initiatedBy,
        timestamp: new Date().toISOString(),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      console.log('N8N workflow triggered successfully');
      
      return {
        success: true,
        workflowTriggered: true,
        initiatedBy,
        timestamp: new Date().toISOString(),
        n8nResponse: response.data,
      };
    } catch (error) {
      console.error('Error triggering n8n workflow:', error.message);
      
      // Return a structured error response instead of throwing
      return {
        success: false,
        error: error.message,
        workflowTriggered: false,
        initiatedBy,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getWorkflowStatus() {
    // This would require n8n API access to check workflow execution status
    // For now, we'll return a mock status
    return {
      status: 'ready',
      lastExecution: null,
      isRunning: false,
    };
  }
}

export default new N8nService();

// Analytics-related API calls
 
import api from './axios'
 
export const getDashboard = () => api.get('/analytics/dashboard')

import axios from "axios";

const apiUrl = "http://127.0.0.1:5000";

export async function assessmentQuestionaire(data: any): Promise<any> {
  const response = await axios.post(`${apiUrl}/api/v1/chat`, data);
  return response;
}

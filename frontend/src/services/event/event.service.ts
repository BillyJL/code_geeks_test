import axios from 'axios';
import appConfig from '@/configs/app.config';

const { API_URL } = appConfig;

export const fetchEvents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchEventById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createEvent = async (event: any) => {
    const response = await axios.post(API_URL, event);
    return response.data;
};

export const updateEvent = async (id: string, event: any) => {
    const response = await axios.put(`${API_URL}/${id}`, event);
    return response.data;
};

export const deleteEvent = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const fetchSimilarEvents = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}/similar`);
    return response.data;
};
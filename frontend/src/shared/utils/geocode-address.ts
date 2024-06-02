import axios from 'axios';
import appConfig from '@/configs/app.config';

const geocodeAddress = async (address: string): Promise<{ lat: number, lng: number } | null> => {
  const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address,
      key: appConfig.GOOGLE_MAP_API_KEY,
    },
  });
  
  const { results } = response.data;
  if (results.length > 0) {
    const { lat, lng } = results[0].geometry.location;
    return { lat, lng };
  }

  return null;
};

export default geocodeAddress;
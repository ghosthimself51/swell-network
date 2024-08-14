import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export interface CryptoPriceResponse {
  fantom: {
    usd: number;
  };
  wigoswap: {
    usd: number;
  };
}

export const fetchCryptoPrices = async (ids: string[]): Promise<CryptoPriceResponse> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ids: ids.join(','),
        vs_currencies: 'usd',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching crypto prices');
  }
};

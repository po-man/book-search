import axios from 'axios';
import type { Search } from 'src/types';

export const transformEsliteSearchResponse = (data): Search[] =>
  data.hits.hit.map(({ fields }) => ({
    name: fields?.name,
    url: fields?.url,
    productId: fields?.eslite_sn,
  }));

export const esliteSearch = async (query: string): Promise<Search[]> => {
  const options = {
    method: 'GET',
    url: 'https://athena.eslite.com/api/v2/search',
    params: {
      q: `"${query}"`,
      final_price: '0,',
      sort: 'weight',
      size: '20',
      start: '0',
    },
  };

  const { status, data } = await axios.request(options);
  console.log(`[eslite] search, query: ${query}, status: ${status}`);
  if (status !== 200 || !(data?.hits?.hit?.length > 0)) {
    return null;
  }

  return transformEsliteSearchResponse(data);
};

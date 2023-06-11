import axios from 'axios';
import type { Book, Price } from 'src/types';

export const transformEsliteGetProductResponse = (data): Book => ({
  isbn: data?.ean,
  name: data?.name,
  author: data?.author,
  publisher: data?.supplier,
  prices: [
    ...((data?.final_price
      ? [
          {
            currency: 'TWD',
            amount: data.final_price,
            isDiscounted: false,
          },
        ]
      : []) as Price[]),
    ...((data?.retail_price
      ? [
          {
            currency: 'TWD',
            amount: data.retail_price,
            isDiscounted: true,
          },
        ]
      : []) as Price[]),
  ],
  description: data?.short_description,
  images: data?.photos?.map((photo) => photo?.large_path),
});

export const esliteGetProduct = async (productId: string): Promise<Book> => {
  const options = {
    method: 'GET',
    url: `https://athena.eslite.com/api/v1/products/${productId}`,
  };

  const { status, data } = await axios.request(options);
  console.log(
    `[eslite] get products, productId: ${productId}, status: ${status}`
  );
  if (status !== 200) {
    return null;
  }
  return transformEsliteGetProductResponse(data);
};

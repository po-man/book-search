import axios from 'axios';

export const transformEsliteGetProductResponse = (data) => ({
  isbn: data?.ean,
  name: data?.name,
  price: data?.retail_price,
  description: data?.short_description,
  images: data?.photos?.map((photo) => photo?.large_path),
});

export const esliteGetProduct = async (productId) => {
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

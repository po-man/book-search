import { esliteSearch } from './eslite-search';
import { esliteGetProduct } from './eslite-get-product';

export const esliteGetFirstProductPipeline = async (keyword) => {
  const search = await esliteSearch(keyword);
  if (search === null || search.length === 0) {
    return null;
  }

  const product = await esliteGetProduct(search[0].productId);
  if (product === null) {
    return null;
  }

  return product;
};

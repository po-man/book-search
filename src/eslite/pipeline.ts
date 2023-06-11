import { esliteSearch } from './eslite-search';
import { esliteGetProduct } from './eslite-get-product';
import { Book } from 'src/types';

export const esliteGetFirstProductPipeline = async (
  keyword: string
): Promise<Book> => {
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

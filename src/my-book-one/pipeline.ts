import { myBookOneSearch } from './my-book-one-search';
import { myBookOneGetProduct } from './my-book-one-get-product';
import { Book } from 'src/types';

export const myBookOneGetFirstProductPipeline = async (
  keyword: string
): Promise<Book> => {
  const search = await myBookOneSearch(keyword);
  if (search === null || search.length === 0) {
    return null;
  }

  const product = await myBookOneGetProduct(search[0].productId);
  if (product === null) {
    return null;
  }

  return product;
};

import { myBookOneSearch } from './my-book-one-search';
import { myBookOneGetProduct } from './my-book-one-get-product';
import { Book, GetFirstPageProductsPipelineOptions } from 'src/types';

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
  product.url = search[0]?.url;

  return product;
};

export const myBookOneGetFirstPageProductsPipeline = async (
  keyword: string,
  options: GetFirstPageProductsPipelineOptions = {},
): Promise<Book[]> => {
  const { getProductOneByOne = true, topK = 5 } = options;
  const search = await myBookOneSearch(keyword);
  if (search === null || search.length === 0) {
    return null;
  }
  const topKSearch = search.slice(0, topK);

  let products: Book[] = [];

  if (getProductOneByOne) {
    for await (const searchHit of topKSearch) {
      const product = await myBookOneGetProduct(searchHit.productId);
      if (product !== null) {
        products.push(product);
      }
    }
  } else {
    products = await Promise.all(
      topKSearch.map((searchHit) => myBookOneGetProduct(searchHit.productId))
    );
  }

  return products;
};

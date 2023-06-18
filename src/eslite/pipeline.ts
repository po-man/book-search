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
  product.url = search[0]?.url;

  return product;
};

export const esliteGetFirstPageProductsPipeline = async (
  keyword: string,
  getProductOneByOne: boolean = true
): Promise<Book[]> => {
  const search = await esliteSearch(keyword);
  if (search === null || search.length === 0) {
    return null;
  }

  let products: Book[] = [];

  if (getProductOneByOne) {
    for await (const searchHit of search) {
      const product = await esliteGetProduct(searchHit.productId);
      if (product !== null) {
        products.push(product);
      }
    }
  } else {
    products = await Promise.all(
      search.map((searchHit) => esliteGetProduct(searchHit.productId))
    );
  }

  return products;
};

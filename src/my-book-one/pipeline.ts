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
  product.url = search[0]?.url;

  return product;
};

export const myBookOneGetFirstPageProductsPipeline = async (
  keyword: string,
  getProductOneByOne: boolean = true
): Promise<Book[]> => {
  const search = await myBookOneSearch(keyword);
  if (search === null || search.length === 0) {
    return null;
  }

  let products: Book[] = [];

  if (getProductOneByOne) {
    for await (const searchHit of search) {
      const product = await myBookOneGetProduct(searchHit.productId);
      if (product !== null) {
        products.push(product);
      }
    }
  } else {
    products = await Promise.all(
      search.map((searchHit) => myBookOneGetProduct(searchHit.productId))
    );
  }

  return products;
};

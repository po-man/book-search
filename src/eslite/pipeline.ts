import { esliteSearch } from './eslite-search';
import { esliteGetProduct } from './eslite-get-product';
import { Book, GetFirstPageProductsPipelineOptions } from 'src/types';

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
  options: GetFirstPageProductsPipelineOptions = {}
): Promise<Book[]> => {
  const { getProductOneByOne = true, topK = 5 } = options;
  const search = await esliteSearch(keyword);
  if (search === null || search.length === 0) {
    return null;
  }
  const topKSearch = search.slice(0, topK);

  let products: Book[] = [];

  if (getProductOneByOne) {
    for await (const searchHit of topKSearch) {
      const product = await esliteGetProduct(searchHit.productId);
      if (product !== null) {
        products.push(product);
      }
      product.url = search[0]?.url;
    }
  } else {
    products = await Promise.all(
      topKSearch.map((searchHit) => esliteGetProduct(searchHit.productId))
    );
  }

  return products;
};

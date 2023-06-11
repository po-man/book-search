import axios from 'axios';
import * as cheerio from 'cheerio';

export const parseDescription = (html) =>
  html('p')
    .map(function () {
      return html(this).text().trim();
    })
    .toArray()
    .join('\n');

export const transformMyBookOneGetProductResponse = (data) => {
  const htmlIntro = cheerio.load(data?.introduction || '');
  return {
    isbn: data?.isbn,
    name: data?.name,
    author: data?.author,
    publisher: data?.publisher,
    price: data?.price,
    description: parseDescription(htmlIntro),
    images: [data?.thumb, ...(data?.imgList || [])],
  };
};

export const myBookOneGetProduct = async (productId) => {
  const options = {
    method: 'GET',
    url: 'https://api.mybookone.com.hk/api/supnr/dynamic/search',
    params: { saleId: `${productId}`, code: 'product_detail', appId: 'supnr' },
  };

  const { status, data } = await axios.request(options);
  console.log(
    `[my-book-one] get products, productId: ${productId}, status: ${status}`
  );
  if (status !== 200) {
    return null;
  }
  return transformMyBookOneGetProductResponse(data);
};

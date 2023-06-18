import axios from 'axios';
import * as cheerio from 'cheerio';
import type { Book, Price } from 'src/types';

export const parseDescriptionTrials = [
  (html) =>
    html('p')
      .map(function () {
        return html(this).text().trim();
      })
      .toArray()
      .join('\n'),
  (html) =>
    html('div.text_description_1')
      .map(function () {
        return html(this).text().trim();
      })
      .toArray()
      .join('\n'),
];

export const parseDescription = (html) => {
  let trial = parseDescriptionTrials[0](html);
  if (trial === '') {
    trial = parseDescriptionTrials[1](html);
  }
  return trial;
};

export const transformMyBookOneGetProductResponse = (data): Book => {
  const htmlIntro = cheerio.load(data?.introduction || '');
  return {
    isbn: data?.isbn,
    name: data?.name,
    author: data?.author,
    publisher: data?.publisher,
    prices: [
      ...((data?.price
        ? [
            {
              currency: 'HKD',
              amount: data.price / 100,
              isDiscounted: false,
            },
          ]
        : []) as Price[]),
    ],
    description: parseDescription(htmlIntro),
    images: [data?.thumb, ...(data?.imgList || [])],
  };
};

export const myBookOneGetProduct = async (productId: string): Promise<Book> => {
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

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { myBookOneGetProduct } from './my-book-one-get-product';
import * as myBookOneGetProductOkResponse from '../../test-resource/mock-response/my-book-one-get-product/1242695654498746370/200.json';

describe('myBookOneGetProduct', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return a product', async () => {
    mock
      .onGet('https://api.mybookone.com.hk/api/supnr/dynamic/search')
      .reply(200, myBookOneGetProductOkResponse);
    const product = await myBookOneGetProduct('1242695654498746370');
    expect(product.name).toEqual('123——Food超人寶寶學前字母學習遊戲');
  });
});

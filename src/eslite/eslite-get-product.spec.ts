import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { esliteGetProduct } from './eslite-get-product';
import * as esliteGetProductOkResponse from '../../test-resource/mock-response/eslite-get-product/2680829555004/200.json';

describe('esliteGetProduct', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return a product', async () => {
    mock
      .onGet('https://athena.eslite.com/api/v1/products/2680829555004')
      .reply(200, esliteGetProductOkResponse);
    const product = await esliteGetProduct('2680829555004');
    expect(product.name).toEqual('123: Food超人寶寶學前數字學習遊戲');
  });
});

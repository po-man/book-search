import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { esliteGetFirstProductPipeline } from './pipeline';
import * as esliteSearchOkResponse from '../../test-resource/mock-response/eslite-search/4714426401728/200.json';
import * as esliteGetProductOkResponse from '../../test-resource/mock-response/eslite-get-product/2680829555004/200.json';

describe('esliteGetFirstProductPipeline', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return the first product', async () => {
    mock
      .onGet('https://athena.eslite.com/api/v2/search')
      .reply(200, esliteSearchOkResponse);
    mock
      .onGet('https://athena.eslite.com/api/v1/products/2680829555004')
      .reply(200, esliteGetProductOkResponse);
    const product = await esliteGetFirstProductPipeline('4714426401728');
    expect(product.name).toEqual('123: Food超人寶寶學前數字學習遊戲');
  });
});

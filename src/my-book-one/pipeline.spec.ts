import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  myBookOneGetFirstProductPipeline,
  myBookOneGetFirstPageProductsPipeline,
} from './pipeline';
import * as myBookOneSearchOkResponse from '../../test-resource/mock-response/my-book-one-search/4714426401728/200.json';
import * as myBookOneGetProductOkResponse from '../../test-resource/mock-response/my-book-one-get-product/1242695654498746370/200.json';

describe('myBookOneGetFirstProductPipeline', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return the first product', async () => {
    mock
      .onPost(
        'https://api.mybookone.com.hk/api/supnr/search/v1/indexProductSearch'
      )
      .reply(200, myBookOneSearchOkResponse);
    mock
      .onGet('https://api.mybookone.com.hk/api/supnr/dynamic/search')
      .reply(200, myBookOneGetProductOkResponse);
    const product = await myBookOneGetFirstProductPipeline('4714426401728');
    expect(product.name).toEqual('123——Food超人寶寶學前字母學習遊戲');
  });

  it('should return an array of products', async () => {
    mock
      .onPost(
        'https://api.mybookone.com.hk/api/supnr/search/v1/indexProductSearch'
      )
      .reply(200, myBookOneSearchOkResponse);
    mock
      .onGet('https://api.mybookone.com.hk/api/supnr/dynamic/search')
      .reply(200, myBookOneGetProductOkResponse);
    const products = await myBookOneGetFirstPageProductsPipeline(
      '4714426401728'
    );
    expect(products[0].name).toEqual('123——Food超人寶寶學前字母學習遊戲');
  });
});

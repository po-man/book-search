import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { myBookOneSearch } from './my-book-one-search';
import * as myBookOneSearchOkResponse from '../../test-resource/mock-response/my-book-one-search/4714426401728/200.json';

describe('myBookOneSearch', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return a hit', async () => {
    mock
      .onPost(
        'https://api.mybookone.com.hk/api/supnr/search/v1/indexProductSearch'
      )
      .reply(200, myBookOneSearchOkResponse);
    const hits = await myBookOneSearch('4714426401728');
    expect(hits[0].name).toEqual('123——Food超人寶寶學前字母學習遊戲');
    expect(hits[0].productId).toEqual('1242695654498746370');
  });
});

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { esliteSearch } from './eslite-search';
import * as esliteSearchOkResponse from '../../test-resource/mock-response/eslite-search/4714426401728/200.json';

describe('esliteSearch', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return a hit', async () => {
    mock
      .onGet('https://athena.eslite.com/api/v2/search')
      .reply(200, esliteSearchOkResponse);
    const hits = await esliteSearch('4714426401728');
    expect(hits[0].name).toEqual('123: Food超人寶寶學前數字學習遊戲');
    expect(hits[0].productId).toEqual('2680829555004');
  });
});

import axios from 'axios';

export const transformMyBookOneSearchResponse = (data) =>
  data.rows.map((row) => ({
    name: row?.highlightName,
    url: `https://www.mybookone.com.hk/page/detail_w/${row?.id}/.html`,
    productId: row?.id,
  }));

export const myBookOneSearch = async (query) => {
  const options = {
    method: 'POST',
    url: 'https://api.mybookone.com.hk/api/supnr/search/v1/indexProductSearch',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      pageSize: 12,
      pageNo: 1,
      searchFieldList: [],
      mchShopNum: '',
      value: `${query}`,
      isSortAsc: false,
      sortField: '_score',
      sortFieldValue: '',
      firstSearchField: '',
      searchScene: 'index',
      appId: 'supnr',
    },
  };
  const { status, data } = await axios.request(options);
  console.log(`[my-book-one] search, query: ${query}, status: ${status}`);
  if (status !== 200 || !(data?.rows?.length > 0)) {
    return null;
  }

  return transformMyBookOneSearchResponse(data);
};

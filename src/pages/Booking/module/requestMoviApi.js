import API from '../../../components/api/api';

const request = async (method, url, data = null, payLoad) => {
  try {
    const res = await API[method]({ url: url });
    const baseData = res.data;
    const resultData = baseData[payLoad];
    if (method === 'GET') {
      return data(resultData);
    }
    if (res.data.error) throw res.data.error;
  } catch (e) {}
};

export const requestMovieApi = {
  prefixNotice: '/Reserve',

  async getMoiveList(setData) {
    const url = this.prefixNotice + `/movie`;
    await request('GET', url, setData, 'movies');
  },

  async getRegionList(setData) {
    const url = this.prefixNotice + `/region`;
    await request('GET', url, setData, 'regions');
  },
};

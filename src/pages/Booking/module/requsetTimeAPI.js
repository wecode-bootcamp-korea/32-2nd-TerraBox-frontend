import API from '../../../components/api/api';

export const requestTimeData = async (...payLoad) => {
  try {
    const res = await API.GET({
      url: '/Reserve/movietheater',
      data: {
        movie_id: payLoad[0].selectedMovie,
        theater_id: payLoad[0].selectedTheater,
      },
    });
    if (
      payLoad[0].selectedMovie &&
      payLoad[0].selectedRegion &&
      payLoad[0].selectedTheater
    ) {
      return payLoad[0].setTimeData(res.data.timetable);
    }
  } catch (e) {
    console.error(e);
  }
};

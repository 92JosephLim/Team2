import axios from 'axios';

const FetchData = async () => {
  const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
  const queryParams = {
    serviceKey: 'Gp0K6TjqqzvLQmwsUON5mQqNrXkR1Hs/S2CUpwV6lR2ONJ0b1eUmQdlQ22MfB3NgNhiU8nj80Qkvn3haEWGBgA==', /*Service Key*/
    pageNo: '1',
    numOfRows: '1000',
    dataType: 'XML',
    base_date: '20210628',
    base_time: '0600',
    nx: '55',
    ny: '127'
  };

  try {
    const response = await axios.get(url, { params: queryParams });
    console.log(response.data); // 여기서 데이터를 사용하거나 처리합니다.
  } catch (error) {
    console.error('Error:', error);
  }
};

FetchData();
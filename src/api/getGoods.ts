import { IGoods } from '../models/IGoods';
import smartphonesList from '../data/smartphonesList.json';

interface IGoodsResponse {
  status: number;
  data: IGoods;
}

const getGoods = (): Promise<IGoodsResponse> => (
  new Promise<IGoodsResponse>((resolve) => {
    resolve({
      status: 200,
      data: smartphonesList,
    });
  })
);

export default getGoods;

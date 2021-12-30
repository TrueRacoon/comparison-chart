import { IGoods } from '../models/IGoods';
import smartphonesList from '../data/smartphonesList.json';

interface IGoodsResponse {
  status: number;
  data: IGoods;
}

export default (): Promise<IGoodsResponse> => (
  new Promise<IGoodsResponse>((resolve) => {
    resolve({
      status: 200,
      data: smartphonesList,
    });
  })
);

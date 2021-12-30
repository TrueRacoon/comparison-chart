import { ISpecNames } from '../models/ISpecNames';
import smartphoneSpecs from '../data/smartphoneSpecs.json';

interface ISpecsNamesResponse {
  status: number;
  data: ISpecNames;
}

export default (): Promise<ISpecsNamesResponse> => (
  new Promise<ISpecsNamesResponse>((resolve) => {
    resolve({
      status: 200,
      data: smartphoneSpecs,
    });
  })
);

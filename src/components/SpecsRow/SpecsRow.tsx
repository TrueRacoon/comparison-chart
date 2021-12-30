import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/store';
import './SpecsRow.css';
import SvgIcon from '../SvgIcon/SvgIcon';
import Icon from '../../constants/Icon';

interface ISpecsRowProps {
  specName: string;
  spec: string;
}

export default observer(({ specName, spec }: ISpecsRowProps): JSX.Element | null => {
  const specsValues = store.goodsToShow.map((good) => good.specifications[spec]);

  if (store.showOnlyDifferences && specsValues.every((value) => value === specsValues[0])) {
    return null;
  }

  return (
    <div className="SpecsRow">
      <div className="SpecsRow__name">
        {specName}
      </div>
      {
        store.goodsToShow.map((good) => (
          <div key={good.id} className="SpecsRow__spec">
            {good.specifications[spec] === true && <SvgIcon icon={Icon.True} />}
            {good.specifications[spec] === false && <SvgIcon icon={Icon.False} />}
            {typeof good.specifications[spec] === 'string' && good.specifications[spec]}
          </div>
        ))
      }
    </div>
  );
});

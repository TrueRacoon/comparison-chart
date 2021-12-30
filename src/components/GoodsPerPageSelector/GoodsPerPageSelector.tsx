import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/store';
import './GoodsPerPageSelector.css';

const maximumGoodsPerPage = 6;

export default observer((): JSX.Element => {
  const selectorButtonLabels = [];

  for (let i = 2; i <= Math.min(store.goods.length, maximumGoodsPerPage); i++) {
    selectorButtonLabels.push(i);
  }

  const handleSelectorLabelClick = (label: number) => {
    if (store.displayedGoodsIds.length !== label) {
      store.handleGoodsPerPage(label)
    }
  }

  return (
    <div className="GoodsPerPageSelector">
      Отобразить товары:
      {
        selectorButtonLabels.map((label) => (
            <span
              key={label}
              className={`GoodsPerPageSelector__label${store.displayedGoodsIds.length === label ? ' GoodsPerPageSelector__label_active' : ''}`}
              onClick={() => handleSelectorLabelClick(label)}
            >
              {label}
            </span>
          )
        )
      }
    </div>
  );
});

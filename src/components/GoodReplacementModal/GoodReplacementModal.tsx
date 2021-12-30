import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/store';
import FilterInput from '../FilterInput/FilterInput';
import './GoodReplacementModal.css';

export default observer((): JSX.Element => {
  const handleReplaceButtonClick = (id: string) => {
    store.replaceGood(id);
    store.setShowModal(false);
  };

  const handleModalClose = () => {
    store.setShowModal(false);
    store.setFilterText('');
  };

  return (
    <div
      className="GoodReplacementModal"
      style={{ display: store.showModal ? 'flex' : 'none' }}
      onClick={() => handleModalClose()}
    >
      <div
        className="GoodReplacementModal__content"
        onClick={(e) => e.stopPropagation()}
      >
        {store.goods.length - store.displayedGoodsIds.length > 3 && <FilterInput />}
        {
          store.filteredReplacementGoods.length === 0 && (
            <div className="GoodReplacementModal__label">
              Нет товаров по фильтру
            </div>
          )
        }
        <div className="GoodReplacementModal__goods">
          {
            store.filteredReplacementGoods.map((good) => (
              <div
                key={good.id}
                className="GoodReplacementModal__good"
              >
                <button
                  className="GoodReplacementModal__swap-button"
                  type="button"
                  onClick={() => handleReplaceButtonClick(good.id)}
                />
                <img
                  className="GoodReplacementModal__image"
                  src={require(`../../images/${good.name}.jpg`)}
                  alt=""
                />
                <div>
                  {good.name}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
});

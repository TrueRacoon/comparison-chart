import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/store';
import { IGood } from '../../models/IGood';
import './GoodCard.css';

interface IGoodCardProps {
  good: IGood;
}

export default observer(({ good }: IGoodCardProps): JSX.Element | null => {
  const handleReplaceButtonClick = (id: string) => {
    store.setShowModal(true);
    store.setGoodIdForReplacement(id);
  };

  return (
    <div
      key={good.id}
      className="GoodCard"
    >
      <div className="GoodCard__image-and-expand-button">
        <img
          className="GoodCard__image"
          src={require(`../../images/${good.name}.jpg`)}
          alt=""
        />
        {
          store.goods.length > store.goodsToShow.length
            ? (
              <button
                className="GoodCard__expand-button"
                type="button"
                onClick={() => handleReplaceButtonClick(good.id)}
              />
            )
            : null
        }
      </div>
      <div>
        {good.name}
      </div>
    </div>
  );
});

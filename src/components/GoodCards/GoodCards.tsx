import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/store';
import GoodReplacementModal from '../GoodReplacementModal/GoodReplacementModal';
import GoodCard from '../GoodCard/GoodCard';
import './GoodCards.css';

export default observer((): JSX.Element | null => (
  <div className="GoodCards">
    {
      store.goodsToShow.map((good) => (
        <GoodCard key={good.id} good={good} />
      ))
    }
    <GoodReplacementModal />
  </div>
));

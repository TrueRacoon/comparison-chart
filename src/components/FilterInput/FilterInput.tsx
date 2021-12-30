import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/store';
import './FilterInput.css';

export default observer((): JSX.Element => (
  <input
    className="FilterInput"
    placeholder="Поиск"
    type="text"
    value={store.filterText}
    onChange={(e) => store.setFilterText(e.target.value)}
  />
));

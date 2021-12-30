import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import store from './stores/store';
import './App.css';
import GoodsPerPageSelector from './components/GoodsPerPageSelector/GoodsPerPageSelector';
import SpecsTable from './components/SpecsTable/SpecsTable';
import ShowDifferencesCheckbox from './components/ShowDifferencesCheckbox/ShowDifferencesCheckbox';
import GoodCards from './components/GoodCards/GoodCards';
import Header from './components/Header/Header';

const App: React.FC = observer((): JSX.Element => {
  useEffect(() => {
    store.initStore();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="App__category-and-goods-per-page-selector">
        <div className="App__category">
          {store.categoryName}
        </div>
        <GoodsPerPageSelector />
      </div>
      <div className="App__comparison-table">
        <div className="App__show-difference-checkbox-and-good-cards">
          <div className="App__show-difference-checkbox-container">
            <ShowDifferencesCheckbox />
          </div>
          <GoodCards />
        </div>
        <SpecsTable />
      </div>
    </div>
  );
});

export default App;

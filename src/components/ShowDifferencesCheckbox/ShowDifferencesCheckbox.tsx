import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/store';
import './ShowDifferencesCheckbox.css';

export default observer((): JSX.Element => {
  return (
    <label className="ShowDifferencesCheckbox">
      Показать различия
      <input
        type="checkbox"
        checked={store.showOnlyDifferences}
        onChange={(e) => store.setShowOnlyDifference(e.target.checked)}
      />
      <span className="ShowDifferencesCheckbox__checkmark"/>
    </label>
  );
});

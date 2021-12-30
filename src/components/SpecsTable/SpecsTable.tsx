import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/store';
import SpecsRow from '../SpecsRow/SpecsRow';
import './SpecsTable.css';

export default observer((): JSX.Element => (
  <div className="SpecsTable">
    {
      store.specsNames.map((spec) => (
        <SpecsRow
          key={spec.name}
          spec={spec.name}
          specName={spec.localName}
        />
      ))
    }
  </div>
));

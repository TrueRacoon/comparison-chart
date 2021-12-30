import React from 'react';
import Icon from '../../constants/Icon';

interface ISvgIconProps {
  icon: Icon;
}

export default (({ icon }: ISvgIconProps): JSX.Element | null => {
  return (
    <img
      src={require(`../../icons/${icon}.svg`)}
      alt={icon}
    />
  );
});

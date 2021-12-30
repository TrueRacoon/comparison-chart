import React from 'react';
import Icon from '../../constants/Icon';

interface ISvgIconProps {
  icon: Icon;
}

const SvgIcon = (({ icon }: ISvgIconProps): JSX.Element | null => {
  return (
    <img
      src={require(`../../icons/${icon}.svg`)}
      alt={icon}
    />
  );
});

export default SvgIcon;

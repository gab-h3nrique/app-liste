import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

// import { ReactComponent as SquarePollSvg } from '.src/assets/svgs/items.svg';

const CheckSolidSvg = (props: any) => {

  return (
    <>
      <Svg height={50} width={50} viewBox="0 0 512 512" fill={'black'} { ...props }>
        <Path d={"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"}/>
      </Svg>
    </>

  );
};

export default CheckSolidSvg;

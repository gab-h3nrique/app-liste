import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

// import { ReactComponent as SquarePollSvg } from '.src/assets/svgs/items.svg';

const CheckOutSvg = (props: any) => {

  return (
    <>
      <Svg height={50} width={50} viewBox="0 0 512 512" fill={'black'} { ...props }>
        <Path d={"M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"}/>
      </Svg>
    </>

  );
};

export default CheckOutSvg;

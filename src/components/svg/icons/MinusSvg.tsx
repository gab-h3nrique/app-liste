import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

// import { ReactComponent as SquarePollSvg } from '.src/assets/svgs/items.svg';

const MinusSvg = (props: any) => {

  return (
    <>
      <Svg height={50} width={50} viewBox="0 0 35 6" fill={'black'} { ...props }>
        <Path d={"M35 3C35 4.65938 33.7969 6 32.3077 6H2.69231C1.20312 6 0 4.65938 0 3C0 1.34062 1.20312 0 2.69231 0H32.3077C33.7969 0 35 1.34062 35 3Z"}/>
      </Svg>
    </>

  );
};

export default MinusSvg;

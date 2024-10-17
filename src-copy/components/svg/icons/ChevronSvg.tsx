import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

// import { ReactComponent as SquarePollSvg } from '.src/assets/svgs/items.svg';

const ChevronSvg = (props: any) => {

  return (
    <>
      <Svg height={50} width={50} viewBox="0 0 320 512" fill={'black'} { ...props }>
        <Path d={"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"}/>
      </Svg>
    </>

  );
};

export default ChevronSvg;

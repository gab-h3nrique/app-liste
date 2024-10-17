import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

// import { ReactComponent as SquarePollSvg } from '.src/assets/svgs/items.svg';

const SvgComponent = (props: any) => {

  const { d, ...rest } = props


  return (
    <>
      <Svg width="50" height="50" viewBox="0 0 448 512" fill="black"  { ...rest }>
        <Path d={d}/>
      </Svg>
    </>

  );
};

export default SvgComponent;


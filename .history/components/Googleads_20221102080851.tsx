import React, { FC } from 'react';
import { Adsense } from '@ctrl/react-adsense';

const Googlelead: FC = (props: any) => {
  // responsive and native ads
  return (
    <div>
      <Adsense
        client='ca-pub-7640562161899788'
        slot='7259870550'
        style={{ display: 'block' }}
        layout='in-article'
        format='fluid'
      />
      ;
    </div>
  );
};
export default Googlelead;

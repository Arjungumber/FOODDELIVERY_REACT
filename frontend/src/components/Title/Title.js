// this title component is for cart pages.
// as we wanted to have same title for our every cart we r making it as a component.

import React from 'react';

export default function Title({title,fontSize,margin}) {
  return <h1 style={{fontSize,margin,color:'#616161'}}>
    {title}
  </h1>;
}

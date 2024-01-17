import React from 'react';

DateTime.defaultProps = {
    options:{
        weekday:'short',
        year:'numeric',
        month:'long',
        day:'numeric',
        hour:'numeric',
        second:'numeric'
    },
};

export default function DateTime({ date,
 option:{weekday,year,month,day,hour,minute,second},
}){
     var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
   // by this we can show locale date time acc to users


  const getDate = () =>{
    new Intl.DateTimeFormat(currentLocale,{
        year,
        month,
        weekday,
        day,
        hour,
        minute,
        second,
    }).format(Date.parse(date));
  }

     return <>
        {getDate()}
     </>;
}
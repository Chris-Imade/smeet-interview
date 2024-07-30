import React, { useState } from 'react';

interface YantraInputProps {
    image: string;
    id?: number;
}

const YantraInput: React.FC<YantraInputProps> = ({ image }) => {
    const [text, setText] = useState<string>('');
    console.log('Value: ', text);

  return (
    <div className='flex flex-col items-center'>
        <img width={125} src={image} alt="Yantra display" />
        <input className='px-3 w-[80%] mt-2 outline-none' type="number" onChange={(e) => setText(e.target.value)} />
    </div>
  )
}

export default YantraInput;
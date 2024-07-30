import React from 'react';

interface YantraCardsProps {
    time: string;
    image: string;
}

const YantraCards: React.FC<YantraCardsProps> = ({ time, image }) => {
  return (
    <div className='flex items-center  border-slate-800 border-[1px] border-solid w-fit'>
        <div className='text-center px-3'>
            <h4 className='font-semibold'>{time.split(' ')[0]}</h4>
            <h4 className='font-semibold'>{time.split(' ')[1]}</h4>
        </div>
        <div>
            <img src={image} alt="card item" width={160} height={160} />
        </div>
    </div>
  )
}

export default YantraCards;
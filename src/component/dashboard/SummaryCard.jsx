import React from 'react';

const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className='rounded flex bg-white '>
      <div className={`text-3xl flex items-center justify-center ${color} text-white px-4`}>
        {icon}
      </div>
        <div className='pl-4 py-2'>
            <h3 className='text-lg font-semibold'>{text}</h3>
            <p className='text-xl font-bold'>{number}</p>
            </div>
    </div>
  )
}

export default SummaryCard

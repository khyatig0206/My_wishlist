import React from 'react';

const Notefilter = ({filter_note}) => {
  return (
    <select name="" id="" onChange={(e)=> filter_note(e.target.value)} >
            <option className='option' value="None">Filter</option>
            <option className="option" value="False">Active</option>
            <option className="option" value="True">Completed</option>
          </select>
  );
};

export default Notefilter;
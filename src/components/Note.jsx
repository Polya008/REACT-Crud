import React from 'react';

export default function Note({item, remove}) {
  return (
    <div>
        {item.content}
      <button onClick={()=>remove(item.id)}>X</button>
    </div>
  );
}
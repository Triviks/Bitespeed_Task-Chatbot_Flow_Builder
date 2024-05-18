import React from 'react';
import { BiMessageRoundedDetail } from "react-icons/bi";

const NodesPanel = () => {
  // FUNCTION TO HANDLE THE DRAG START EVENT FOR A NODE
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType); // SET THE NODE TYPE IN THE DATA TRANSFER OBJECT
    event.dataTransfer.effectAllowed = 'move'; // ALLOW MOVE EFFECT FOR THE DRAGGED ELEMENT
  };

  return (
    <aside className='p-2'>
      {/* MESSAGE NODE */}
      <div className="dndnode message d-flex flex-column align-items-center px-5 py-2" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        <span>
          <BiMessageRoundedDetail /> {/* ICON FOR MESSAGE NODE */}
        </span>
        <span>Message</span>
      </div>

      {/* WE CAN ADD MORE NODES AS WE NEED */}
    </aside>
  );
};
export default NodesPanel;
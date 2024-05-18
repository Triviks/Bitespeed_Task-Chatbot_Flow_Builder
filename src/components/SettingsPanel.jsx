import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";

function SettingsPanel({ node, onNodeChange }) {
  const [text, setText] = useState(node.data.label);

  // USE EFFECT TO UPDATE TEXT STATE WHEN NODE PROP CHANGES
  useEffect(() => {
    setText(node.data.label);
  }, [node]);

  // FUNCTION TO HANDLE TEXT CHANGE IN TEXTAREA
  const handleTextChange = (e) => {
    const newText = e.target.value; // GET NEW TEXT VALUE FROM TEXTAREA
    setText(newText); // UPDATE LOCAL TEXT STATE
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        label: newText, // UPDATE NODE'S LABEL WITH NEW TEXT
      },
    };
    onNodeChange(updatedNode); // CALL PARENT FUNCTION TO UPDATE NODE STATE
  };

  return (
    <div className='updatenode message'>
      <div className='border-bottom py-2 px-2 mb-4 d-flex justify-content-start align-items-center' id='update-head'>
          <IoMdArrowBack /> {/* BACK ICON */}
        <span style={{fontSize: "14px", fontWeight: "500"}}>
          Message
        </span>
      </div>

      <div className='px-2 border-bottom pb-3'>
        <label style={{fontSize: "12px", fontWeight: "500", color: "grey"}} className='mb-2'>
          Text
        </label>
        <textarea
        className='p-2'
          value={text}
          onChange={handleTextChange}
          style={{ width: "100%", fontSize: "12px", fontWeight: "500", borderRadius: "2px", border: "1px solid rgba(0, 0, 0, 0.2)"}}
          rows={3}
        />
      </div>
    </div>
  );
}
export default SettingsPanel;
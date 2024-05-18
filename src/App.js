// REACT IMPORTS
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// COMPONENT IMPORTS
import FlowBuilder from './components/FlowBuilder';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
// STYLE IMPORT
import './App.css';

function App() {
  // STATE TO TRACK THE CURRENTLY SELECTED NODE
  const [selectedNode, setSelectedNode] = useState(null); 

  // STATE TO MANAGE THE NODES IN THE FLOW
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'customNode',
      data: { label: 'test message 1' },
      position: { x: -300, y: 0 },
    },
    {
      id: '2',
      type: 'customNode',
      data: { label: 'test message 2' },
      position: { x: -50, y: -50 },
    },
  ]);

  // STATE TO MANAGE THE EDGES CONNECTING THE NODES IN THE FLOW
  const [edges, setEdges] = useState([{ id: 'edges-e1-2', source: '1', target: '2' }]);

  // FUNCTION TO HANDLE CHANGES TO A SPECIFIC NODE
  const handleNodeChange = (updatedNode) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
  };

  // FUNCTION TO VALIDATE IF ALL NODES ARE CONNECTED BY EDGES
  const validateNodes = () => {
    const allNodesConnected = nodes.every(node =>
      edges.some(edge => edge.source === node.id || edge.target === node.id)
    );
    if (!allNodesConnected) {
      toast.error('Cannot save Flow'); // SHOW ERROR TOAST IF ANY NODE IS NOT CONNECTED
      return false;
    }
    return true; // RETURN TRUE IF ALL NODES ARE PROPERLY CONNECTED
  };

  const handleSave = () => {
    if (validateNodes()) {
      const flowData = { nodes, edges };
      localStorage.setItem('flowData', JSON.stringify(flowData)); // Flow saved to local storage to restore later
      toast.success("Flow saved!"); // SHOW SUCCESS TOAST ON SUCCESSFUL SAVE
    }
  };

  return (
    <>
      <div className="App">
        {/* HEADER SECTION WITH SAVE CHANGES BUTTON */}
        <div className='container-fluid bg-light d-flex justify-content-end px-5 py-2'>
          <button className="save_btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        {/* MAIN BODY SECTION FOR FLOW BUILDER AND SIDE PANELS */}
        <div className='flow-body'>
          {/* FLOW COMPONENT */}
          <div className="flow-builder">
            <FlowBuilder 
              nodes={nodes}
              setNodes={setNodes}
              onSelectNode={setSelectedNode}
              edges={edges}
              setEdges={setEdges}
            />
          </div>
          
          {/* SIDEBAR COMPONENT TO SHOW SETTINGS PANEL OR NODES PANEL CONDITIONALLY */}
          <div className="sidebar p-0">
            {selectedNode ? (
              <SettingsPanel 
                node={selectedNode} 
                onNodeChange={handleNodeChange} 
              />
            ) : (
              <NodesPanel />
            )}
          </div>
        </div>
      </div>
      <ToastContainer /> {/* CONTAINER FOR SUCCESS OR ERROR NOTIFICATIONS */}
    </>
  );
}
export default App;
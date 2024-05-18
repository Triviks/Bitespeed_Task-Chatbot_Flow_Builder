import React, { useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode'; 

const nodeTypes = {
  customNode: CustomNode, // REGISTER THE CUSTOM NODE TYPE
};

const FlowBuilder = ({ nodes, setNodes, onSelectNode, edges, setEdges }) => {
  let id = 0;
  const getId = () => `dndnode_${id++}`; // FUNCTION TO GENERATE UNIQUE NODE IDS
  const [reactFlowInstance, setReactFlowInstance] = useState(null); // STATE FOR REACT FLOW INSTANCE

  // CALLBACK TO HANDLE NODE CHANGES
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  // CALLBACK TO HANDLE EDGE CHANGES
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  // CALLBACK TO HANDLE NEW CONNECTIONS
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // CALLBACK TO HANDLE DRAG OVER EVENT
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // CALLBACK TO HANDLE DROP EVENT
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: 'customNode', // USE THE CUSTOM NODE TYPE
        position,
        data: { label: 'textNode' },
      };

      setNodes((nds) => nds.concat(newNode)); // ADD THE NEW NODE TO THE NODES STATE
    },
    [reactFlowInstance, setNodes],
  );

  // CALLBACK TO HANDLE NODE CLICK EVENT
  const onNodeClick = useCallback(
    (event, node) => onSelectNode(node),
    [onSelectNode],
  );

  // CALLBACK TO HANDLE PANE CLICK EVENT
  const onPaneClick = useCallback(
    () => onSelectNode(null),
    [onSelectNode],
  );

  return (
    <>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          nodeTypes={nodeTypes} // Register the custom node type
        />
      </ReactFlowProvider>
    </>
  );
};
export default FlowBuilder;
import classes from './Welcome.module.css';
import '@xyflow/react/dist/style.css';

import { Title, Text, Box, Flex, Button } from '@mantine/core';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import * as React from 'react';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const thirdNode = { id: '3', position: { x: 0, y: 200 }, data: { label: '3' } };

export function Welcome() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = React.useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = () => {
    setNodes((nds) => [...nds, thirdNode]);
    setEdges(edges.concat({ id: 'e1-3', source: '1', target: '3' }));
  };

  const handleRemoveNode = () => {
    const nodeWithoutThird = nodes.filter((node) => node.id !== '3');
    setNodes(nodeWithoutThird);
  };

  return (
    <Box w="100vw" h="100vh">
      <Flex
        justify="center"
        direction="column"
        align="center"
        style={{ height: '100%', width: '100%' }}
      >
        <Title className={classes.title} ta="center">
          Welcome to{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Music.AI
          </Text>
        </Title>

        <Button onClick={handleAddNode}>Adicionar um novo nó</Button>

        <Box my={8}>
          <Button variant="outline" onClick={handleRemoveNode}>
            Remover um nó
          </Button>
        </Box>

        <div style={{ margin: 'auto 0', width: '80vw', height: '50vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </Flex>
    </Box>
  );
}

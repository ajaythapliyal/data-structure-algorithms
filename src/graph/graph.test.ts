import { Graph } from './graph';

describe('Graph', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
  });

  describe('build graph', () => {
    it('should build graph correctly', () => {
      expect(graph.isEmpty).toBeTruthy();
      expect(graph.vertexCount).toBe(0);

      for (let i = 1; i <= 8; i++) {
        graph.addVertex({ id: i });
      }

      const edges = [
        { 1: 2 },
        { 1: 5 },
        { 2: 6 },
        { 6: 3 },
        { 6: 7 },
        { 3: 7 },
        { 3: 4 },
        { 7: 4 },
        { 7: 8 },
        { 4: 8 }
      ];

      edges.forEach((edge) => {
        Object.entries(edge).forEach((entry) => {
          const [key, val] = entry;
          graph.addEdge({ id: parseInt(key.toString()) }, { id: val });
        });
      });

      expect(graph.vertexCount).toBe(8);
    });

    it('should build graph correctly #2', () => {
      expect(graph.isEmpty).toBeTruthy();
      expect(graph.vertexCount).toBe(0);

      for (let i = 1; i <= 5; i++) {
        graph.addVertex({ id: i });
      }

      const edges = [
        { 1: 2 },
        { 1: 5 },
        { 2: 5 },
        { 5: 4 },
        { 2: 4 },
        { 2: 3 },
        { 4: 3 }
      ];

      edges.forEach((edge) => {
        Object.entries(edge).forEach((entry) => {
          const [key, val] = entry;
          graph.addEdge({ id: parseInt(key.toString()) }, { id: val });
        });
      });

      expect(graph.vertexCount).toBe(5);
    });
  });

  describe('BFS', () => {
    it('should discover all nodes reachable from source with corrent distance', () => {
      for (let i = 1; i <= 8; i++) {
        graph.addVertex({ id: i });
      }

      const edges = [
        { 1: 2 },
        { 1: 5 },
        { 2: 6 },
        { 6: 3 },
        { 6: 7 },
        { 3: 7 },
        { 3: 4 },
        { 7: 4 },
        { 7: 8 },
        { 4: 8 }
      ];
      edges.forEach((edge) => {
        Object.entries(edge).forEach((entry) => {
          const [key, val] = entry;
          graph.addEdge({ id: parseInt(key.toString()) }, { id: val });
        });
      });

      expect(graph.bfs({ id: 2 })).toBeTruthy();
    });
  });

  describe('DFS', () => {
    it('it should discover all reachable vertices with correct timestamp', () => {
      for (let i = 1; i <= 6; i++) {
        graph.addVertex({ id: i });
      }

      const edges = [
        { 1: 2 },
        { 1: 4 },
        { 4: 2 },
        { 2: 5 },
        { 5: 4 },
        { 3: 5 },
        { 3: 6 },
        { 6: 6 }
      ];
      edges.forEach((edge) => {
        Object.entries(edge).forEach((entry) => {
          const [key, val] = entry;
          graph.addEdge({ id: parseInt(key.toString()) }, { id: val });
        });
      });

      const dfsTree = graph.dfs({ id: 1 });
      expect(dfsTree).toBeTruthy();
    });
  });
});

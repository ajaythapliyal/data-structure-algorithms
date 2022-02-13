import { Graph } from './graph';

describe('Graph', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
  });

  describe('build graph', () => {
    it('should build graph correctly', () => {
      expect(graph.isEmpty).toBeTruthy();
      expect(graph.size).toBe(0);

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
    });
  });
});

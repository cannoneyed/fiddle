import { Container, ObjectType } from 'libs/typedi';

import { default as GraphEditorLayout } from './layout';
import { default as GraphEditorState } from './state';
import { default as DragInteraction } from './interactions/node-drag';
import { default as PortInteractions } from './interactions/port';
import { default as SelectInteraction } from './interactions/node-select';

import { Graph } from 'core/models/graph';

import { Props } from 'features/GraphEditor';

export type Context = Graph | undefined;

export function get<T>(context: Context, type: ObjectType<T>): T {
  return Container.of(context).get(type);
}

const lastPropsMap = new Map<Graph, Props>();
export function deriveStateFromProps(graph: Graph, props: Props): GraphEditorState {
  const state = get(graph, GraphEditorState);

  lastPropsMap.set(graph, props);
  state.updateFromProps(props);

  // Initialize a newly constructed clip editor core
  if (!state.hasBeenInitialized) {
    state.hasBeenInitialized = true;
  }

  state.graph = graph;
  return state;
}

export {
  GraphEditorLayout,
  GraphEditorState,
  DragInteraction,
  PortInteractions,
  SelectInteraction,
};

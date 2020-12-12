import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
  isLoading: boolean;
  stopLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
  stopLoading: true,
}

const _uiReducer = createReducer(initialState,
  on( isLoading, state => ({ ...state, isLoading: false })),
  on( stopLoading, state => ({ ...state, stopLoading: true })),
);

export function uiReducer(state, action) {
  return _uiReducer(state, action);
}

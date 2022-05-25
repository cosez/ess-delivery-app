import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { updateStatus, rollbackStatus,  resetStatus, actualStatus} from './status-action';

import { Status } from '../shared/common';


export interface StatusList extends EntityState<Status> {
  // additional entities state properties
  selectedStatusId: string | null;
}

export const adapter: EntityAdapter<Status> = createEntityAdapter<Status>();

export const initialState: StatusList = adapter.getInitialState({
  selectedStatusId: null,
});

export function selectStatusId(a: Status): number {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function UpdateStatus(a: Status): number {
  return .;
}

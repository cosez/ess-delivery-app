import { createAction } from '@ngrx/store';

export const update = createAction('[status Component] Update');
export const rollBack = createAction('[status Component] RollBack');
export const reset = createAction('[status Component] Reset');
export const actual = createAction('[status Component] Actual');

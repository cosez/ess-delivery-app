import { createAction, props } from '@ngrx/store';

import { Status } from '../shared/common';

export const loadStatus = createAction('[Status/API] Load Status', props<{ status: Status[] }>());
export const rollbackStatus = createAction('[Status/API] Rollback Status', props<{ status: Status[] , id: number}>());
export const updateStatus = createAction('[Status/API] Update Status', props<{ users: Status[] , id: number}>());
export const resetStatus = createAction('[Status/API] Reset Status', props<{ users: Status[], id: number }>());
export const actualStatus = createAction('[Status/API] Actual Status', props<{ users: Status[], id: number }>());

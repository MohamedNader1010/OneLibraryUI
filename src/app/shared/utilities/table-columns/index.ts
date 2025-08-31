import { getClientColumns } from '../../../modules/client/client-table.columns';
import { getTeacherColumns } from '../../../modules/teacher/teacher-table.columns';
import { registerColumnsFactory } from './table-columns.factory';

export const CLIENT_COLUMNS = Symbol('CLIENT_TABLE_COLUMNS');
export const TEACHER_COLUMNS = Symbol('TEACHER_TABLE_COLUMNS');

registerColumnsFactory(CLIENT_COLUMNS, getClientColumns);
registerColumnsFactory(TEACHER_COLUMNS, getTeacherColumns);

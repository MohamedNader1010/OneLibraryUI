import {NoteComponent} from './noteComponent';
export interface Note {
	id: number;
	name: string;
	actualPrice: string;
	teacherPrice: string;
	finalPrice: string;
	clientId: number;
	client: string;
	termId: number;
	term: string;
	stageId: number;
	stage: string;
	noteComponents: NoteComponent[];
	originalPrice: string;
	earning: string;
}

import { NoteClient } from "./InoteClient";
import { NoteComponent } from "./noteComponent";
export interface Note {
	id: number;
	name: string;
	actualPrice: number;
	teacherPrice: number;
	finalPrice: number;
	clientId: number;
	client: string;
	clientTypeId: number;
	clientType: string;
	termId: number;
	term: string;
	stageId: number;
	stage: string;
	noteComponents: NoteComponent[];
	noteClients: NoteClient[];
	originalPrice: number;
	earning: number;
	quantity: number;
	fileName: string;
	filePath: string;
}

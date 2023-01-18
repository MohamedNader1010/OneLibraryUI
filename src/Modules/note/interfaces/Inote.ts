import {Client} from 'src/Modules/client/interFaces/Iclient';
import {Stage} from './IStage';
import {Term} from './ITerm';

export interface Note {
	id: number;
	name: string;
	quantity: number;
	actualPrice: string;
	teacherPrice: string;
	finalPrice: string;
	client: Client;
	term: Term;
	stage: Stage;
}

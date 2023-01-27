import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CanDeactivate} from '@angular/router';
import {DialogComponent} from '../../shared/components/dialog/dialog.component';
import {AddEditComponent} from '../Components/add-edit/add-edit.component';

@Injectable()
// implements CanDeactivate<AddEditComponent>
export class CanDeactivateGuard {
	constructor(public dialog: MatDialog) {}
	async canDeactivate(component: AddEditComponent) {
		if ((component.form.touched && component.form.dirty && component.isSubmitted) || component.form.untouched) return true;
		let res: boolean = await new Promise<boolean>((resolve, reject) => {
			this.dialog.closeAll();
			this.dialog
				.open(DialogComponent, {disableClose: true, data: {location: 'لم يتم حفظ التعديلات', msg: `لقد قمت بتعديل بعض البيانات ولم تقم بحفظها,هل انت متاكد من مغادرة الصفحة`}})
				.afterClosed()
				.subscribe({
					next: (res) => resolve(res),
					error: (e) => reject(() => console.log(e)),
				});
		});
		return res;
	}
}

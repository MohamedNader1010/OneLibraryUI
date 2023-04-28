// import {Injectable} from '@angular/core';
// import {MatDialog} from '@angular/material/dialog';
// import {CanDeactivate} from '@angular/router';
// import {DialogComponent} from '../../shared/components/dialog/dialog.component';

// @Injectable()
// export class CanDeactivateGuard implements CanDeactivate<AddEditComponent> {
// 	constructor(public dialog: MatDialog) {}
// 	async canDeactivate(component: AddEditComponent) {
// 		if ((component.Form.touched && component.Form.dirty && component.isSubmitted) || component.Form.untouched) return true;
// 		let res: boolean = await new Promise<boolean>((resolve, reject) => {
// 			this.dialog.closeAll();
// 			this.dialog
// 				.open(DialogComponent, {disableClose: true, data: {location: 'لم يتم حفظ التعديلات', msg: `لقد قمت بتعديل بعض البيانات ولم تقم بحفظها,هل انت متاكد من مغادرة الصفحة`}})
// 				.afterClosed()
// 				.subscribe({
// 					next: (res) => resolve(res),
// 					error: (e) => reject(),
// 				});
// 		});
// 		return res;
// 	}
// }

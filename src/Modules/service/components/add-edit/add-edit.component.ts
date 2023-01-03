import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {Material} from "src/Modules/material/interfaces/Imaterial";
import {MaterialService} from "src/Modules/material/services/material.service";
import {ServiceType} from "src/Modules/serviceType/interFaces/IserviceType";
import {ServicesTypeService} from "src/Modules/serviceType/services/serviceType.service";
import {ServicesService} from "../../services/services.service";

@Component({
	selector: "app-add-edit",
	templateUrl: "./add-edit.component.html",
	styleUrls: ["./add-edit.component.css"],
})
export class AddEditComponent implements OnInit {
	servicesForm: FormGroup;
	id!: number;
	MaterialDataSource: Material[] = [];
	ServiceTypeDataSource: ServiceType[] = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _service: ServicesService,
		private _material: MaterialService,
		private _type: ServicesTypeService,
		private fb: FormBuilder
	) {
		this.servicesForm = this.fb.group({
			name: ["", [Validators.required, Validators.maxLength(100)]],
			material: ["", [Validators.required]],
			type: ["", [Validators.required]],
		});
	}
	ngOnInit(): void {
		this.getAllMaterials();
		this.getAllServicesTypes();
		this.route.queryParams.subscribe((params) => (this.id = params["id"]));
		if (this.id) this.getSingle(this.id);
	}
	getSingle = (id: number) => this._service.getOne(id).subscribe((data) => {});
	getAllMaterials = () => this._material.getAll().subscribe({next: (data) => (this.MaterialDataSource = data)});
	getAllServicesTypes = () => this._type.getAll().subscribe({next: (data) => (this.ServiceTypeDataSource = data)});
	back = () => this.router.navigate(["services"]);
	handleSubmit() {
		if (this.servicesForm.valid) {
			if (this.id) {
				this._service.update(this.id, this.servicesForm.value).subscribe({
					next: () => {
						this.router.navigate(["services"]);
					},
				});
			} else {
				this._service.add(this.servicesForm.value).subscribe({
					next: () => {
						this.router.navigate(["services"]);
					},
				});
			}
		}
	}
}

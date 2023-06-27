import { Component, ElementRef, EventEmitter, Output, ViewChild, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
@Component({
	selector: "app-drag-and-drop",
	templateUrl: "./drag-and-drop.component.html",
	styleUrls: ["./drag-and-drop.component.css"],
})
export class DragAndDropComponent implements OnInit, OnDestroy {
	constructor(private toastr: ToastrService) {}
	subscriptions: Subscription[] = [];
	@ViewChild("fileDropRef", { static: false }) fileDropElment!: ElementRef;
	@Input() progress: number = 0;
	@Output() selectedFile = new EventEmitter<File | null>();
	@Input() fileName: string | null = null;
	file!: File | null;
	ngOnInit() {}
	onFileDropped = (file: File) => this.prepareFilesList(file);
	fileBrowseHandler = (event: any) => this.prepareFilesList(event.target.files[0]);
	deleteFile = () => {
		this.file = null;
		this.fileName = null;
		this.selectedFile.emit(this.file);
		this.progress = 0;
	};
	async prepareFilesList(file: File) {
		if (file.size > 1024 * 1024 * 5) {
			this.toastr.error("file size exceeded the accepted file size ,please select smaller file", "too larg document");
			return;
		}
		this.handleUpload(file);
		this.fileDropElment.nativeElement.value = "";
	}
	handleUpload = (file: File) => {
		this.file = file;
		this.selectedFile.emit(this.file);
	};
	formatBytes(bytes: any, decimals = 2) {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const dm = decimals <= 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	}
	ngOnDestroy() {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}
}

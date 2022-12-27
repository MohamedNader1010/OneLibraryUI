import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OneLibraryUI';
  isChecked = true;
  dummy: Dummy[] = [{ name: "Mohamed" }, { name: "Hamza" }, { name: "Zead" }, { name: "Shehab" }]
}

class Dummy {
  name?: string;
}

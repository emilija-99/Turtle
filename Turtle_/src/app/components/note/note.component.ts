import { Component } from '@angular/core';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  public note: any;

  noteChange($event: any) {
    console.log('event: ', $event);
  }

  resizeNote($event: any) {
    console.log('resize: ', $event);
  }
}

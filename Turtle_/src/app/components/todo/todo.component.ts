import { Component } from '@angular/core';
import { LoggerService } from '../../../assets/logger.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  allowDrop(ev: DragEvent): void {
    ev.preventDefault();
  }

  drag(ev: DragEvent): void {
    if (ev.target instanceof HTMLElement) {
      ev.dataTransfer?.setData('text', ev.target.id);
    }
  }

  drop(ev: DragEvent): void {
    ev.preventDefault();
    const data = ev.dataTransfer?.getData('text');
    if (data) {
      const draggedElement = document.getElementById(data);
      if (draggedElement) {
        const dropTarget = ev.target as HTMLElement;
        const dropTargetList = dropTarget.closest('ul');
        if (dropTargetList) {
          dropTargetList.appendChild(draggedElement);
        }
      }
    }
  }
  removeDragOver(ev: DragEvent): void {
    const dropTarget = ev.target as HTMLElement;
    dropTarget.closest('ul')?.classList.remove('drag-over');
  }
}

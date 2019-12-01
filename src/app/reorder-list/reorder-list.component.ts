import {
  Component,
  ContentChild, ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'

@Component({
  selector: 'app-reorder-list',
  templateUrl: './reorder-list.component.pug',
  styleUrls: ['./reorder-list.component.less'],
})
export class ReorderListComponent {
  @Input()
  items: any[] = []

  @Input()
  invalid = false

  @Output()
  onChange: EventEmitter<any> = new EventEmitter()

  @Output()
  onDrag: EventEmitter<boolean> = new EventEmitter()

  @Output()
  onRemove: EventEmitter<any> = new EventEmitter()

  @Input()
  showRemove: boolean = true

  @Input()
  showIndex: boolean = true

  dragOverIndex: number
  draggedIndex: number

  @ContentChild('listItem', { static: false })
  listItem: TemplateRef<any>


  constructor(private el: ElementRef) {}

  get listItemWidth(): number {
    let element = this.el.nativeElement.querySelector('li.list-item')
    return element && element.offsetWidth
  }

  get listItemHeight(): number {
    let element = this.el.nativeElement.querySelector('li.list-item')
    return element && element.offsetHeight
  }

  get containerWidth(): number {
    let element = this.el.nativeElement.querySelector('ul.reorder-list-container')
    return element && element.offsetWidth
  }

  get rowMaxItems() {
    return Math.floor(this.containerWidth / this.listItemWidth)
  }

  // Events for currently dragged item

  onDragStart($event, index: number) {
    this.onDrag.emit(true)
    setTimeout(() => {
      this.draggedIndex = index
    })
  }

  onDragEnd($event, index: number) {
    this.drop(this.dragOverIndex)
    this.onDrag.emit(false)
  }

  // Events for item drag over

  onDragOver($event, index: number) {
    this.dragOverIndex = index
  }

  onDragLeave($event, index: number) {}

  onDragDrop($event, index: number) {
    this.drop(index)
  }

  // TODO: it's being called twice, should only once?
  drop(currentIndex: number) {
    this.reorderItemsInArray(this.draggedIndex, currentIndex)
    this.reset()
    this.onDrag.emit(false)
  }

  transform(index) {
    if (this.moveDown(index)) {
      const translateX = (this.rowMaxItems - 1) * -this.listItemWidth,
        translateY = this.listItemHeight
      return `translate(${translateX}px, ${translateY}px)`
    }
    if (this.moveUp(index)) {
      const translateX = (this.rowMaxItems - 1) * this.listItemWidth,
        translateY = -this.listItemHeight
      return `translate(${translateX}px, ${translateY}px)`
    }
    if (this.moveRight(index)) {
      return `translate(${this.listItemWidth}px)`
    }
    if (this.moveLeft(index)) {
      return `translate(${-this.listItemWidth}px)`
    }
  }

  moveRight(index: number) {
    return this.shiftForward(index)
  }

  shiftForward(index: number) {
    return index >= this.dragOverIndex && this.draggedIndex > index
  }

  shiftBackward(index: number) {
    return index <= this.dragOverIndex && this.draggedIndex < index
  }

  moveLeft(index: number) {
    return this.shiftBackward(index)
  }

  moveDown(index: number) {
    const rowEnd = index % this.rowMaxItems === this.rowMaxItems - 1
    return this.shiftForward(index) && rowEnd
  }

  moveUp(index: number) {
    const rowStart = index % this.rowMaxItems === 0
    return this.shiftBackward(index) && rowStart
  }

  reorderItemsInArray(previousIndex: number, currentIndex: number) {
    this.items.splice(currentIndex, 0, this.items.splice(previousIndex, 1)[0])
    this.onChange.emit(this.items)
  }

  reset() {
    this.draggedIndex = undefined
    this.dragOverIndex = undefined
  }

  remove(item, index: number) {
    this.items.splice(index, 1)
    this.onRemove.emit(item)
    this.onChange.emit(this.items)
  }
}

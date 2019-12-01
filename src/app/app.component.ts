import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ng-drag-n-drop';

  listItems = [
    'https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg',
    'https://inteng-storage.s3.amazonaws.com/img/iea/4N610VqxGJ/sizes/cat-cloning_resize_md.jpg',
    'https://images.theconversation.com/files/302715/original/file-20191120-474-hjfnhn.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    'https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg',
    'https://inteng-storage.s3.amazonaws.com/img/iea/4N610VqxGJ/sizes/cat-cloning_resize_md.jpg',
    'https://images.theconversation.com/files/302715/original/file-20191120-474-hjfnhn.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'
  ]
}

import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'postImage',
})
export class PostImagePipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(!value) return '/assets/images/no-image.jpg';
    return value;
  }

}

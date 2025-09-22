import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
    name: 'image',
})
export class ImagePipe implements PipeTransform {
    transform(img: string | string[] | null, type: string = 'product'): string {
        if (!img) return '/assets/images/no-image.jpg';
        if (Array.isArray(img)) {
            const imgVal = img.at(0);
            if (!imgVal) return '/assets/images/no-image.jpg';
            if (this.isBlob(imgVal)) return imgVal;
            return `${baseUrl}/files/${type}/${imgVal}`;
        }
        // Es un string
        if (this.isBlob(img)) return img;
        return `${baseUrl}/files/${type}/${img}`;
    }

    isBlob(s: string) {
        return s.startsWith('blob:');
    }
}

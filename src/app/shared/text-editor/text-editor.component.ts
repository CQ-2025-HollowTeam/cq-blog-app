import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'text-editor',
  imports: [EditorComponent],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent {

  apiKey = environment.TINYMCE_API_KEY;

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    promotion: false,
    onboarding: false,
    branding: false,
    menubar: false,
    statusbar: false,
    toolbar: 'undo redo | styles | bold italic | image | alignleft aligncenter alignright | fontsize | forecolor',
  };



}

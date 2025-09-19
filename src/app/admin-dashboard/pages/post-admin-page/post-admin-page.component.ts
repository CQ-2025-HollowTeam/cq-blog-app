import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextEditorComponent } from '../../../shared/text-editor/text-editor.component';

@Component({
  selector: 'app-post-admin-page',
  imports: [TextEditorComponent],
  templateUrl: './post-admin-page.component.html',
  styleUrl: './post-admin-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostAdminPageComponent { }

import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from '../../../../../environments/environment';
import { Post } from '../../../../posts/interfaces/post.interface';
import { PostCategoryComponent } from '../../../../categories/components/post-category/post-category.component';
import { PostService } from '../../../../posts/services/post.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from '../../../../categories/interfaces/category.interface';
import { CategoryService } from '../../../../categories/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'post-form',
  imports: [ReactiveFormsModule, EditorComponent, PostCategoryComponent],
  templateUrl: './post-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit {
  
  post = input.required<Post>();

  fb = inject(FormBuilder);
  postService = inject(PostService);
  categoryService = inject(CategoryService);
  router = inject(Router);

  postForm = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    image: [''],
    content: ['', Validators.required],
    categories: [[{} as Category]],
  });

  apiKey = environment.TINYMCE_API_KEY;
  
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    promotion: false,
    onboarding: false,
    branding: false,
    menubar: false,
    apiKey: this.apiKey,
    statusbar: false,
    toolbar: 'undo redo | styles | bold italic | image | alignleft aligncenter alignright | fontsize | forecolor',
  };

  ngOnInit(): void {
    this.setFormValue(this.post());
  }

  categoriesResource = rxResource({
    params: () => ({}),
    stream: ({params}) => {
      return this.categoryService.getCategories();
    }
  });

  setFormValue(postLike: Partial<Post>){
    this.postForm.reset(postLike as any); 
    this.postForm.patchValue({categories: postLike.categories ?? []});
  }

  addCategory(categoryId: number) {
    //const exists = this.postForm.value.categories?.some(c => c.name === category);
    //if(exists) return;
  }

  async onSubmit() {
    if(this.postForm.invalid) return;

    const formValue = this.postForm.value;
    
    if(this.post().id == 0) {
      //Nuevo
      const postLike: Partial<Post> = {
        title: formValue.title!,
        slug: formValue.slug!,
        content: formValue.content!,
        authorId: '7d824024-9169-4811-9569-cdb16d1a60ea' //TODO: Cambiar cuando haya auth
      };
      await firstValueFrom(this.postService.createPost(postLike));

    } else {
      //Actualizar
      const postLike: Partial<Post> = {
        title: formValue.title!,  
        content: formValue.content!,
      };
      await firstValueFrom(this.postService.updatePost(this.post().id, postLike));
    }
  }

  discardChanges(event: Event) {
    event.preventDefault();
    //TODO: Mostrar modal de confirmación
    this.router.navigateByUrl('/admin/posts');
  }

  async removePost() {
    const response = await firstValueFrom(this.postService.removePost(this.post().id));
    this.router.navigateByUrl('/admin/posts');
  }

}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ButtonModule, SelectModule],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('codequest-blog-app');
}

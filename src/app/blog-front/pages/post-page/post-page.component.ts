import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { Post } from '../../../posts/interfaces/post.interface';
import { PostsCarouselComponent } from '../../../posts/components/posts-carousel/posts-carousel.component';
import { PostCategoryComponent } from '../../../posts/components/post-category/post-category.component';
import { PostCommentsComponent } from '../../../post-comments/components/post-comments/post-comments.component';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { CardLayout } from '../../../posts/components/post-card/post-card.component';

@Component({
  selector: 'app-post-page',
  imports: [
    PostsCarouselComponent, 
    PostCategoryComponent, 
    PostCommentsComponent, 
    DatePipe, 
    UpperCasePipe
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent {

  activatedRoute = inject(ActivatedRoute);

  postId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['idSlug']),
      tap(idSlug => console.log(idSlug)),
    )
  );

  post = signal<Post>(
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: `
        <p>En el panorama del desarrollo web, donde la agilidad y la innovación son la norma, los frameworks de JavaScript se han convertido en la columna vertebral de las aplicaciones modernas. Pero, ¿qué sucede cuando un proyecto evoluciona de un simple prototipo a una aplicación empresarial de gran envergadura? Aquí es donde <strong>Angular</strong> no solo brilla, sino que demuestra ser la plataforma de elección. Angular, más que un framework, es un ecosistema completo que nos equipa para construir aplicaciones robustas, escalables y, sobre todo, mantenibles.</p>

        <figure>
        <img src="https://images.unsplash.com/photo-1549692520-acc666993a20?q=80&w=1770&auto=format&fit=crop" alt="Diagrama de flujo con varios nodos y conexiones" style="width:100%; height:auto;">
        <figcaption>La arquitectura de Angular fomenta una estructura lógica y organizada.</figcaption>
        </figure>

        <h2>La Filosofía detrás de la Estructura</h2>
        <p>Lo primero que hay que entender de Angular es su filosofía. Se basa en el principio de <strong>"Convención sobre Configuración"</strong>. Esto significa que en lugar de perder tiempo decidiendo la mejor manera de estructurar carpetas, gestionar estados o conectar componentes, Angular nos proporciona una ruta clara y bien definida. Este enfoque es un salvavidas para equipos grandes, ya que garantiza que el código sea predecible y que cualquier desarrollador pueda integrarse y contribuir de forma efectiva casi de inmediato.</p>

        <p>Otro pilar fundamental es el uso de <strong>TypeScript</strong>. TypeScript es un superconjunto de JavaScript que añade tipado estático opcional. En Angular, su uso es obligatorio, y por una buena razón. El tipado nos ayuda a detectar errores en tiempo de compilación, antes de que el código llegue al navegador. Esto no solo reduce la cantidad de bugs, sino que también mejora la legibilidad del código y facilita la refactorización a medida que la aplicación crece.</p>

        <h2>Los Bloques de Construcción: De Componentes a Servicios</h2>
        <p>La arquitectura de Angular se basa en un conjunto de elementos bien definidos que trabajan juntos de forma armónica:</p>
        <ul>
        <li><strong>Componentes:</strong> Son los bloques visuales de la aplicación. Cada componente encapsula su propio <strong>HTML</strong> para la estructura, <strong>CSS</strong> para los estilos y <strong>TypeScript</strong> para la lógica. El manejo de la UI se vuelve intuitivo gracias a la vinculación de datos (data binding) que permite que los datos fluyan entre la lógica de TypeScript y la vista HTML.</li>
        <li><strong>Servicios:</strong> Los servicios son clases de TypeScript que se encargan de la lógica de negocio, como la obtención de datos de una API o la gestión del estado de la aplicación. Su verdadera magia reside en el sistema de Inyección de Dependencias. Este patrón nos permite "inyectar" instancias de servicios en los componentes que los necesitan, promoviendo un código desacoplado y mucho más fácil de probar con pruebas unitarias.</li>
        <li><strong>Módulos:</strong> Los módulos son los contenedores que organizan componentes, servicios y otros elementos en bloques lógicos. Un proyecto de Angular siempre tiene un módulo raíz (AppModule), pero podemos crear módulos de características (AdminModule, UserModule) para organizar la aplicación y, más importante, para implementar la carga perezosa (lazy loading), lo que mejora significativamente el rendimiento al cargar solo el código que el usuario necesita en un momento dado.</li>
        </ul>

        <h2>El Compañero Infalible: La Angular CLI</h2>
        <p>La experiencia de desarrollo con Angular está incompleta sin la Angular CLI (Command Line Interface). Esta potente herramienta automatiza gran parte del trabajo repetitivo. Con un simple comando como <code>ng new my-app</code>, podemos generar una estructura de proyecto completa. Para crear un nuevo componente, solo necesitamos <code>ng generate component user-profile</code>, y la CLI se encargará de crear los archivos necesarios y registrarlos en el módulo correcto. La CLI es la razón por la que Angular, a pesar de su estructura, se siente tan productivo en el día a día.</p>

        <h2>Conclusión</h2>
        <p>Angular se diferencia por su enfoque integral y su ecosistema maduro. Es la opción ideal para proyectos que tienen un horizonte a largo plazo, para equipos que valoran la consistencia y para empresas que no pueden permitirse los riesgos de un código desordenado. Si bien puede requerir una inversión inicial de tiempo, los beneficios en términos de mantenibilidad, escalabilidad y la robustez de la arquitectura superan con creces el esfuerzo. Angular no es solo para el frontend, es una herramienta completa para la ingeniería de software moderna.</p>
      `,
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/LeaTjvBRI6cldshD59jw_angular-de-cero.jpg',
      categories: ['Angular', 'RXJS', 'SQL'],
      comments: [
        {
          id: 1,
          authorId: '123',
          content: 'Interesante perspectiva, aunque creo que hay algunos puntos que podrían mejorarse. En general está bien estructurado el contenido.',
          post: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1,
          authorId: '123',
          content: 'Perfecto timing! Justo estaba buscando información sobre este tema para un proyecto. Muy útil y bien explicado. 👏',
          post: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          comments: [
            {
              id: 2,
              authorId: '3243',
              content: 'Totalmente de acuerdo! A mí también me sirvió muchísimo esa sección.',
              post: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 2,
              authorId: '3243',
              content: 'Totalmente de acuerdo!',
              post: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]
        },
        {
          id: 1,
          authorId: '123',
          content: 'Excelente artículo! Me ha ayudado mucho a entender mejor estos conceptos. Especialmente la parte sobre optimización, muy clara la explicación.',
          post: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
    },
  );

  highlightedPosts = signal<Post[]>([
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/T6It7zuNQPWizrBJvbaX_NEST-NEW.jpg',
      categories: ['Nest'],
      comments: [
        {
          id: 1,
          authorId: '123',
          content: 'Bla bla bla bla bla bla bla',
          post: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
    },
    {
      id: '123',
      authorId: '1234',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      content: 'Lorem ipsum dolor sit acta officia natus debitis neque saepe quisquam iste fugiat architecto maxime at fugit obcaecati optio, voluptatem dolorem asperiores aliquid ipsum doloribus..',
      createdAt: new Date(),
      image: 'https://import.cdn.thinkific.com/643563/61TYzXMSTaKdnKUemoIn_FLUTTER-MOVIL-DE-CERO-A-EXPERTO.jpg',
      categories: ['Flutter'],
      comments: [
        {
          id: 1,
          authorId: '123',
          content: 'Bla bla bla bla bla bla bla',
          post: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
    }
  ]);

  cardLayout = CardLayout;

}

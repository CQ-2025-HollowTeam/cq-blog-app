import { HttpStatusCode } from '@angular/common/http';

export interface APIError {
    headers: APIErrorHeaders;
    status: HttpStatusCode;
    statusText: string;
    url: string;
    ok: boolean;
    redirected: boolean;
    name: string;
    message: string;
    error: Error;
}

export interface Error {
    message: string;
    error: string;
    statusCode: HttpStatusCode;
}

export interface APIErrorHeaders {
    headers: NormalizedNamesClass;
    normalizedNames: NormalizedNamesClass;
    lazyUpdate: null;
}

export interface NormalizedNamesClass {}

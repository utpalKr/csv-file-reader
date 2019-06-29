import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';


@Injectable()
export class ExtractorService {

    private baseUrl;

    constructor() {
    }

    postFormData(file: File) {
        return from(new Promise((resolve, reject) => {
            let formData: any = new FormData()
            let xhr = new XMLHttpRequest()

            formData.append("file", file, file.name)

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response)
                    } else {
                        reject(xhr.response)
                    }
                }
            }
            xhr.open("POST", this.baseUrl + 'extractCSV', true);
            xhr.send(formData)
        }));
    }

    private handleError(error: any) {
            console.error('There is an error', error);
            return Promise.reject(error.message || error);
        }
  }

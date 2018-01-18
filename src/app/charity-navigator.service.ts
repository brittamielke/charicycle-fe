import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class CharityInfoService {

    private baseUrl = 'https://api.data.charitynavigator.org/v2/Organizations/'
    private ApiAppKey = '/?app_id=00c96230&app_key=28b778ddb662d03fa0112536e1fb005f'
    taxId;
    constructor(private http: Http) { }

    getCharityInfo(taxId: string): Observable<any[]> {
        console.log(taxId);
        taxId = taxId.replace("-", "");
        let apiUrl = this.baseUrl + taxId + this.ApiAppKey
        console.log(apiUrl);
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let results = res.json();
        return results || [];
    }

    private handleError(error: Response | any) {
        let errMsg: string;

        if (typeof error._body === "string") {
            errMsg = error._body
        } else {
            if (error instanceof Response) {
                if (error.status === 0) {
                    errMsg = "Error connecting to API"
                } else {

                    const errorJSON = error.json();
                    errMsg = errorJSON.message;
                }
            }
        }
        return Observable.throw(errMsg);
    }
}

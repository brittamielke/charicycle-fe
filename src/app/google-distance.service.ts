import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class DistanceDataService {

    private baseUrl = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial'
    private ApiKey = 'AIzaSyB21514pDxgeNnCLGl_Z073dk2TvHv0B54'
    constructor(private http: Http) { }

    getDistanceFromApi(origin: string, destination: string): Observable<any[]> {
        let apiUrl = `${this.baseUrl}&origins=${origin}&destinations=${destination}&key=${this.ApiKey}`;
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

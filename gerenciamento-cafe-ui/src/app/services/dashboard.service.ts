import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getDetalhes() {
    return this.http.get(this.url + "/dashboard/detalhes")
  }
}

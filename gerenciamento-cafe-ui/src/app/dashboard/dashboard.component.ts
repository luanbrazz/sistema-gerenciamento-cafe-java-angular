import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { ConstantesGeral } from '../shared/constantes-geral';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  respostaMensagem: any;
  dados: any;

  ngAfterViewInit() { }

  constructor(
    private dashboardService: DashboardService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
    this.ngxUiLoaderService.start();
    this.dadosDashboard();
  }

  dadosDashboard() {
    this.dashboardService.getDetalhes().subscribe((resp: any) => {
      this.ngxUiLoaderService.stop();
      this.dados = resp;
    }, (error: any) => {
      this.ngxUiLoaderService.stop();
      console.log(error);
      if (error.error?.message) {
        this.respostaMensagem = error.error?.message;
      } else {
        this.respostaMensagem = ConstantesGeral.erroGenerico;
      }
      this.snackbarService.openSnackBar(this.respostaMensagem, ConstantesGeral.error)
    })
  }

}

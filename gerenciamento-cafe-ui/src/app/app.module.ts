import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { MaterialModule } from './shared/material-module';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './signup/signup.component';

//ESTILO DO SPINNER
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Carregando...",
  textColor: "#FDFDFD",
  textPosition: "center-center",
  bgsColor: "#8516B7",
  fgsColor: "#8516B7",
  fgsType: SPINNER.rectangleBouncePulseOut,
  fgsSize: 100,
  hasProgressBar: false
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    // Importando o módulo HttpClientModule não é necessário aqui,
    // normalmente é importado na seção 'imports' do módulo.
    HttpClientModule,

    // Configurando o provedor de interceptores HTTP:
    {
        // Indicando que estamos fornecendo um interceptor de HTTP.
        provide: HTTP_INTERCEPTORS,

        // Especificando a classe do interceptor que será injetada.
        useClass: TokenInterceptorInterceptor,

        // Informando que pode haver vários interceptores.
        multi: true
    }
],

  bootstrap: [AppComponent]
})
export class AppModule { }

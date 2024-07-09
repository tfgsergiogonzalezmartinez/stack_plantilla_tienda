import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Components/Header/Header.component';
import { MainLayoutComponent } from './Layout/MainLayout/MainLayout.component';
import { LoginLayoutComponent } from './Layout/LoginLayout/LoginLayout.component';
import { LoginPageComponent } from './Pages/LoginPage/LoginPage.component';
import { MainPageComponent } from './Pages/MainPage/MainPage.component';
import { UserProfileDropdownComponent } from './Components/UserProfileDropdown/UserProfileDropdown.component';
import { ItemComponent } from './Components/Item/Item.component';
import { SubHeaderComponent } from './Components/SubHeader/SubHeader.component';
import { CarritoComprasComponent } from './Components/CarritoCompras/CarritoCompras.component';
import { UserPageComponent } from './Pages/UserPage/UserPage.component';
import { ModalComponent } from './Components/modal/modal.component';
import { InputFormComponent } from './Components/inputForm/inputForm.component';
import { TruncarPipe } from './truncar.pipe';
import { HeaederElementoComponent } from './Components/HeaederElemento/HeaederElemento.component';
import { VentasPageComponent } from './Pages/VentasPage/VentasPage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    LoginPageComponent,
    MainPageComponent,
    UserProfileDropdownComponent,
    ItemComponent,
    SubHeaderComponent,
    CarritoComprasComponent,
    UserPageComponent,
    ModalComponent,
    InputFormComponent,
    TruncarPipe,
    HeaederElementoComponent,
    VentasPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

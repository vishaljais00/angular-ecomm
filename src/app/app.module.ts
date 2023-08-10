import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SerachComponent } from './serach/serach.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    ErrorpageComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SerachComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

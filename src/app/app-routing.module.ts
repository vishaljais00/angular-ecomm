import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SerachComponent } from './serach/serach.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [authGuard]

  },

  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [authGuard]

  },

  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [authGuard]

  },

  {
    path: 'home-search/:query',
    component: SerachComponent

  },

  {
    path: 'details/:productId',
    component: ProductDetailsComponent

  },
  {
    path: 'user-auth',
    component: UserAuthComponent
  },
  
  {
    path: '**',
    component: ErrorpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

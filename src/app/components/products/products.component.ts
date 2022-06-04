import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataResponse } from 'src/app/models/dataResponse';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let categoryName : any = this.route.snapshot.paramMap.get('categoryName');

    if (categoryName == "all")
    {
      this.showAll();
    }
    else
    {
      this.filterProducts(categoryName?.trim());
    }
  }

  showAll(): void
  {
    this.http.get<DataResponse<Product[]>>("http://localhost:8080/api/product/getall")
    .subscribe(res => {
      this.products = res.data;
    });
  }

  filterProducts(categoryName : any): void {
    this.http.get<DataResponse<Product[]>>("http://localhost:8080/api/product/getallbycategory?categoryName=" + categoryName)
      .subscribe(res => {
        this.products = res.data;
      })
    }
}

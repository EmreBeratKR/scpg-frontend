import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { DataResponse } from 'src/app/models/dataResponse';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  constructor(private http: HttpClient, private router: Router) {
    this.http.get<DataResponse<Category[]>>("http://localhost:8080/api/categories/getall")
    .subscribe(res => {
      this.categories = res.data;
    });
  }

  ngOnInit(): void {
  }

  getCurrentCategory(): string {
    return this.router.url.split('/')[2];
  }

  onClick(target : any) {
    target.classList.add('active');
  }

}

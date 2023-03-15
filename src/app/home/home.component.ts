import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../apiservice';
import * as XLSX from 'xlsx';
import { dataPassService } from '../datapassService';
import { OwlOptions } from 'ngx-owl-carousel-o';


// const Excel = require('exceljs');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  ExcelData = [];
  ExcelData1 = [];

  uploadInputPlaceholder = "Choose file";
  buttonDisable = true;
  buttonDisable1 = false;
  choosebtn = false;
  url = window.location.href;
  xlFile: any;
  lastword = this.url.split("/").pop();    


  constructor(public api: ApiService,
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private dataService:dataPassService
  ) { }

  uploadForm: FormGroup = this.fb.group({
    file: ['',Validators.required]
  });

  ngOnInit(): void {
    //nothing
  }

  async readfile(ev: any) {
    this.uploadInputPlaceholder = ev.target.files[0].name
    this.xlFile = ev.target.files;
    let file = ev.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: "binary" });
      var sheetNames = workbook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { header: 1 });
      this.ExcelData1 = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { header: 0 });
      // console.log("sheet reading", this.ExcelData1);
      this.dataService.passExcel_head.next(this.ExcelData[0]);
      this.dataService.passExcel_body.next(this.ExcelData);      
    }
  }

  async upload() {
   
    const data = new FormData();
    const a = this.xlFile;
    data.append('file', a[0]);  
    this.api.addFiles(data).subscribe((res: any) => {
      if (res.success) {
        this.buttonDisable = false;
        this.buttonDisable1 = true;
        return this.showSuccess();
      }else{
        return this.showError();
      }
    });
  }
  showSuccess() {
    this.toastr.success('File Uploaded Successfully', 'Success', { timeOut: 3000 })
  }

  showError() {
    this.toastr.error('Something went Wrong', 'Failed', { timeOut: 3000 })
  }
  customOptions: OwlOptions = {
    loop: true,
    margin: 2,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
    nav: false,
    navSpeed: 1000,
    responsive: {
      0: {
        items: 1 
      },
      600:{
        items:1
      },
      1000:{
        items:2
      }
    },
  }
}

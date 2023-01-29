import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../apiservice';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { dataPassService } from '../datapassService';

// const Excel = require('exceljs');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  ExcelData = [];
  buttonDisable = true;
  constructor(public api: ApiService,
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private dataService:dataPassService
  ) { }

  uploadForm: FormGroup = this.fb.group({
    file: ['',Validators.required]
  });

  xlFile: any;

  ngOnInit(): void {
  }

  async readfile(ev: any) {
    this.xlFile = ev.target.files;
    let file = ev.target.files[0];
    // console.log(file);

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: "binary" });
      var sheetNames = workbook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { header: 1 })
      // console.log(this.ExcelData[0]);
      this.dataService.passExcel_head.next(this.ExcelData[0]);
      this.dataService.passExcel_body.next(this.ExcelData);
    }
    // for (let i in this.ExcelData[0]) {
    //   console.log(this.ExcelData[0][i]);
    //   await this.ExcelData[0][i];
    //   //  console.log(a);
 
    // }
  }

  async upload() {
    const data = new FormData();
    const a = this.xlFile
    data.append('file', a[0]);
    this.buttonDisable = false;
    // this.api.addFiles(data).subscribe((res: any) => {
    //   if (res.success) {
    //     this.buttonDisable = false;
    //     return this.showSuccess();
    //   }else{
    //     return this.showError();
    //   }
    // });
  }
  showSuccess() {
    this.toastr.success('File Uploaded Successfully', 'Success', { timeOut: 3000 })
  }

  showError() {
    this.toastr.error('Something went Wrong', 'Failed', { timeOut: 3000 })
  }
}

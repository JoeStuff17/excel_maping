import { ApiService } from './../apiservice';
import { dashboardRouting } from './../dashboard/dashboard.routes';
import { Router } from '@angular/router';
import { dataPassService } from './../datapassService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

interface head {
  head: string;
}

@Component({
  selector: 'app-tagging',
  templateUrl: './tagging.component.html',
  styleUrls: ['./tagging.component.scss']
})
export class TaggingComponent implements OnInit {
  // buttonDisable = true;
  dropdownList: any;
  ExcelData = [];
  excelbodyData = [];
  filterData = [];
  tableHeader = [];
  mappingData: any[] = [];
  myObj = {};
  

  constructor(private readonly fb: FormBuilder,
    private readonly dataService: dataPassService,
    private router: Router,
    private api: ApiService) { 
    }

  ngOnInit(): void {
    this.readheader();
    if (this.dropdownList.length === undefined) {
      this.router.navigateByUrl('/home')
    }
    this.fetch();
  }

  excelform: FormGroup = this.fb.group({
    dropbox: ['', Validators.required]
  });

  tagControl = new FormControl<''>('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  async readheader() {
    this.dataService.passExcel_head.subscribe((headdata: any) => {
      this.dropdownList = headdata;
      //this.dropdownList = Object.keys(data[0]) ;
      // console.log(this.dropdownList);
    });
    this.dataService.passExcel_body.subscribe((bodyData: any) => {
      this.excelbodyData = bodyData;
      
      // console.log(bodyData);
    })
  }

  ///----->uploading Data
  selectedData(d: any, i: any, h:any) {
    this.filterData = []
    for (let i = 1; i < this.excelbodyData.length; i++) {
      this.filterData.push(this.excelbodyData[i][d.key]);
     
    }

    if(this.tableHeader[i]=== h)
    {
      this.myObj[h]=this.filterData
    }
    console.log(this.myObj);
    // console.log(this.excelbodyData);
    // console.log(this.filterData);
    
   
  }


  copyData() {

    //  console.log(this.tableHeader);
   
     console.log(this.myObj);
    
    this.api.addData(this.myObj).subscribe((res)=>{
      console.log(res);
    })
    Swal.fire({
      title: 'Are you want to add?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes Add it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/dashboard');
        Swal.fire(
          'Well Done',
          'Your Data Added Successfully',
          'success'
        ).then((res) => { })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Not Uploaded',
          'error')
      }
    })
  }

  fetch() {
    this.api.getFileHeader().subscribe((res: any) => {
      // console.log(res);
      this.tableHeader = res.data

      for(let i=0; i<this.tableHeader.length; i++){
      
        console.log(this.tableHeader[i]);
        this.myObj[this.tableHeader[i]]=[this.filterData];
        console.log(this.myObj);
     }
    });

  }

}

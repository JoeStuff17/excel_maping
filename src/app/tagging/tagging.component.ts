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
  selectedData(d: any, i: any, j: any, h:any) {
    console.log(i,j);
    this.filterData = [];
    for (let x = 1; x < this.excelbodyData.length; x++) {
      
      this.filterData.push(this.excelbodyData[x][d.key]);
    }
    // console.log(this.filterData);

    if(this.tableHeader[i]===h)
    {
      this.myObj[h]=this.filterData
    }

    // for(let x=0; x<this.tableHeader.length; x++)
    // {
    //   if(x===i)
    //   {
    //     //do nothing
    //   }
    //   else{
    //     this.tableHeader[x].dropDown.splice(j,1);
    //     console.log(x);
        
    //   }
    // }

    // console.log(this.excelbodyData);
    // console.log(this.filterData);   
  }


  copyData() {
    console.log(this.myObj);

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
        ).then((res) => { this.api.addData(this.myObj).subscribe((res)=>{
        })})
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

      // console.log(res.data);
      // console.log(this.dropdownList);
      this.tableHeader = res.data;
      // console.log(this.tableHeader);
      
      // console.log(res);

      // this.tableHeader = [
      //   {
      //     header : 'Id',
      //     dropDown : ['Id', 'Name', 'Age', 'gender']
      //   },
      //   {
      //     header : 'name',
      //     dropDown : ['Id', 'Name', 'Age', 'gender']
      //   },
      //   {
      //     header : 'age',
      //     dropDown : ['Id', 'Name', 'Age', 'gender']
      //   },
      //   {
      //     header : 'sex',
      //     dropDown : ['Id', 'Name', 'Age', 'gender']
      //   }
      // ]
      

      // for(let i=0; i<res.data.length; i++)
      // {

      //   this.tableHeader.push({header: res.data[i], dropdown: this.dropdownList})        
      // }     
      

      for(let i=0; i<this.tableHeader.length; i++){
      
        this.myObj[this.tableHeader[i]]=[this.filterData];   
     }
    });

  }

}

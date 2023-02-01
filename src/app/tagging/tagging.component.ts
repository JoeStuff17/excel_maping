import { ApiService } from './../apiservice';
import { Router } from '@angular/router';
import { dataPassService } from './../datapassService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tagging',
  templateUrl: './tagging.component.html',
  styleUrls: ['./tagging.component.scss']
})

export class TaggingComponent implements OnInit {
  dropdownList: any;
  ExcelData = [];
  excelbodyData = [];
  filterData = [];
  tableHeader = [];
  mappingData: any[] = [];
  myObj = {};
  tableLength: any;
  strucure = {};
  counter = 0;
  disabled = true;

  constructor(private readonly fb: FormBuilder,
    private readonly dataService: dataPassService,
    private router: Router,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.readheader();
    if (this.dropdownList.length === 0) {
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
    this.dropdownList = [];
    this.dataService.passExcel_head.subscribe((headdata: any) => {
      for (const d of headdata) {
        this.dropdownList.push({ isSelected: false, name: d, data: headdata });
      }
    });
    this.dataService.passExcel_body.subscribe((bodyData: any) => {
      this.excelbodyData = bodyData;
    })
  }


  ///----->Dropdown selection
  selectedData(d: any, i: any, j: number, h: any) {
    this.dropdownList[j]['isSelected'] = true;
    this.filterData = [];

    for (let x = 1; x < this.excelbodyData.length; x++) {
      this.filterData.push(this.excelbodyData[x][j]);
    }

    if (this.tableHeader[i] === h) {
      this.myObj[h.header] = this.filterData;
    }

    this.counter++
    if (this.tableHeader.length === this.counter) {
      this.disabled = false;
    }
  }

  ///----->Submition and calling Post API
  copyData() {
    Swal.fire({
      title: 'Are you want to add?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes Add it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      this.api.addData(this.myObj).subscribe((res) => {
        console.log(res.data, res.err);
        this.dataService.err_count.next(res.err);
        this.dataService.suc_count.next(res.data);
        // console.log(res.data);
      });
      if (result.value) {
        Swal.fire(
          'Well Done',
          'Your Data Added Successfully',
          'success'
        ).then((res) => { this.router.navigateByUrl('/dashboard'); })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Not Uploaded',
          'error')
      }
    })
  }

  ///----->Fetching SQL-Table headers
  fetch() {
    this.api.getFileHeader().subscribe((res: any) => {
      this.tableLength = res.data.length;
      for (let i = 0; i < res.data.length; i++) {
        this.tableHeader.push({ header: res.data[i], dropdown: this.dropdownList });
      }

      for (let i = 0; i < this.tableHeader.length; i++) {
        this.myObj[this.tableHeader[i].header] = [this.filterData];
      }
    });
  }
}
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
  myObj: any = {};
  tableLength: any;
  counter = 0;
  disabled = true;
  selectedList: any[] = [];
  headerData: any;
  allData: any[] = [];

  constructor(private readonly fb: FormBuilder,
    private readonly dataService: dataPassService,
    private router: Router,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.readheader();
    if (this.dropdownList.length === 0) {
      this.router.navigateByUrl('/subscription')
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
      console.log(bodyData);
      this.excelbodyData = bodyData;
    })
  }

  unSelectData() {
    for (const d of this.dropdownList) {
      d['isSelected'] = false;
    }
  }

  ///----->Dropdown selection
  selectedData(i: any, j: number, h: any) {
    if (this.selectedList.length > 0) {
      const isExistIndex = this.selectedList.findIndex((x: any) => x.id === i);
      if (isExistIndex < 0) {
        this.selectedList.push({ id: i, name: this.dropdownList[j]['name'] });
      } else {
        this.selectedList[isExistIndex]['name'] = this.dropdownList[j]['name'];
      }
    } else {
      this.selectedList.push({ id: i, name: this.dropdownList[j]['name'] });
    }
    this.removeList();
    this.filterData = [];
    console.log(this.allData);
    let arr = [];

    for (let x = 0; x < (this.excelbodyData.length - 1); x++) {
      this.allData[x][h.header] = this.excelbodyData[Number(x + 1)][j];
    }
    // for (let k = 0; k < this.tableHeader.length; k++) {
    //   if (this.myObj[this.tableHeader[k].header].length === 1) {
    //     this.disabled = false;
    //     return;
    //   }
    // }
    this.tableHeader[i]['isSelected'] = true;
    this.disabled = this.tableHeader.filter((x: any) => !x.isSelected).length > 0;
    // this.disabled = false;
  }

  removeList() {
    this.unSelectData();
    for (const s of this.selectedList) {
      this.dropdownList.filter((x: any) => x.name == s.name)[0]['isSelected'] = true;
    }
  }

  ///----->Submition and calling Post API
  copyData() {
    Swal.fire({
      title: 'Are you want to add?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes Add it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        // Swal.showLoading()
        console.log(this.allData);
        
        this.api.addData(this.allData).subscribe((res) => {
          console.log(res);
          this.dataService.err_count.next(res.err);
          this.dataService.suc_count.next(res.data);
          // console.log(res.data);
          Swal.fire(
            'Well Done',
            'Your Data Added Successfully',
            'success'
          ).then((res) => { this.router.navigateByUrl('/dashboard'); })
        });

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
      console.log("filter", this.filterData);
      for (let i = 0; i < res.data.length; i++) {
        this.tableHeader.push({ header: res.data[i], dropdown: this.dropdownList, isSelected: false });
      }
      for (let x = 1; x < this.excelbodyData.length; x++) {
        this.allData.push({});
      }
    });
  }
}
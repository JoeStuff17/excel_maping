import { Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../apiservice';
import { dataPassService } from '../datapassService';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {

  batchData: any;
  dummy: any
  displayedColumns: string[] = [
    'batchId',
    'clientId',
    'totalCount',
    'successCount',
    'failedCount',
    'successProcessCount',
    'failedProcessCount',
    'purpose'];
  @ViewChild('paginator1') paginator1: MatPaginator;
  constructor(private api: ApiService,
    private dataService:dataPassService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBatchesRec();
  }

  async getBatchesRec(): Promise<any> {
    this.api.getBatches().subscribe((res: any) => {
      res.data.reverse();
      this.batchData = new MatTableDataSource(res.data);
      this.batchData.paginator = this.paginator1;
    });
  }

  select(row){
    this.dataService.batchId.next(row.id);
    this.router.navigate([`/batches/${row['id']}`]);
  }
}

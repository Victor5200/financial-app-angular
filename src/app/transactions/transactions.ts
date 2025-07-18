import {Component, OnInit} from '@angular/core';
import {TransactionsService} from '../services/transactions.service';
import {Transaction} from '../models/transaction.model';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss'],
  imports: [CommonModule, CurrencyPipe],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private readonly transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }
}

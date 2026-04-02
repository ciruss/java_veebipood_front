import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environments';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-check-payment',
  imports: [],
  templateUrl: './check-payment.html',
  styleUrl: './check-payment.css',
})
export class CheckPayment {
  // success- http://localhost:4200/check-payment?order_reference=dadwdjjj9&payment_reference=852add52c107f438d2e660d94c32e50af7fb7b7fc3c892ea5743264fae9d84f4
  // fail-  http://localhost:4200/check-payment?order_reference=dadwdjjj10&payment_reference=453ace94c682329ac032ee9fed3779c7127129df35ba1fd4ad04e4e543e3b79e
  orderStatus: string = '';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const orderReference = this.route.snapshot.queryParamMap.get('order_reference');
    const paymentReference = this.route.snapshot.queryParamMap.get('payment_reference');

    fetch(
      `${backendUrl}/check-payment?orderReference=${orderReference}&paymentReference=${paymentReference}`,
      {
        method: 'PATCH',
      },
    )
      .then((response) => response.json())
      .then((data) => {
        this.orderStatus = data.paymentState;
        this.changeDetector.detectChanges();
      });
  }
}

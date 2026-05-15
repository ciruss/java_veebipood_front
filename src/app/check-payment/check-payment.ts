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

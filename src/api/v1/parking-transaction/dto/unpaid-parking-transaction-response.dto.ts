export class UnpaidParkingTransactionResponseDto {
  id: number;
  entryTime: Date;
  exitTime: Date;
  chargeStartTime: Date;
  chargeTime: Date;
  paymentTime: Date;
  chargeAmount: number;
  parkingAmount: number;
  totalAmount: number;
  carNum: string;
  isPaid: boolean;
  paymentId: string;
}

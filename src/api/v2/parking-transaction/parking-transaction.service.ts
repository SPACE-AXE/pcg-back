import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParkingTransactionDto } from './dto/create-parking-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingTransaction } from './entities/parking-transaction.entity';
import { IsNull, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Car } from '../car/entities/car.entity';
import { CHARGING_FEE_PER_SECOND, KR_TIME_DIFF } from 'src/constants/constants';

@Injectable()
export class ParkingTransactionService {
  constructor(
    @InjectRepository(ParkingTransaction)
    private readonly parkingTransactionRepository: Repository<ParkingTransaction>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async startParkingTransaction(
    parkId: number,
    createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    const car = await this.carRepository.findOne({
      where: { carNum: createParkingTransactionDto.carNum },
      relations: {
        user: true,
      },
    });

    const parkedCar = await this.parkingTransactionRepository.findOne({
      where: {
        carNum: createParkingTransactionDto.carNum,
        exitTime: IsNull(),
      },
    });

    if (parkedCar) {
      throw new ConflictException('Car is already parked');
    }

    const paymentId = crypto.randomUUID();

    const newParkingTransaction = this.parkingTransactionRepository.create({
      user: { id: car ? car.user.id : null },
      car: { id: car ? car.id : null },
      park: { id: parkId },
      carNum: createParkingTransactionDto.carNum,
      paymentId,
      entryTime: new Date(),
    });

    await this.parkingTransactionRepository.insert(newParkingTransaction);

    return { paymentId };
  }

  async exitParkingTransaction(
    parkId: number,
    createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    const parkingTransaction = await this.parkingTransactionRepository.findOne({
      where: {
        park: { id: parkId },
        carNum: createParkingTransactionDto.carNum,
        exitTime: IsNull(),
      },
    });

    if (!parkingTransaction) {
      throw new ConflictException('Car is not parked');
    }

    if (!parkingTransaction.isPaid) {
      throw new ForbiddenException('Payment is not completed');
    }

    return this.parkingTransactionRepository.update(
      { id: parkingTransaction.id },
      {
        exitTime: new Date(),
      },
    );
  }

  async startCharge(
    parkId: number,
    createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    const parkingTransaction = await this.parkingTransactionRepository.findOne({
      where: {
        park: { id: parkId },
        carNum: createParkingTransactionDto.carNum,
        exitTime: IsNull(),
      },
    });

    if (!parkingTransaction) {
      throw new ConflictException('Car is not parked');
    }

    if (parkingTransaction.chargeStartTime) {
      throw new ConflictException('Car is already charging');
    }

    return this.parkingTransactionRepository.update(
      { id: parkingTransaction.id },
      {
        chargeStartTime: new Date(),
      },
    );
  }

  async finishCharge(
    parkId: number,
    createParkingTransactionDto: CreateParkingTransactionDto,
  ) {
    const parkingTransaction = await this.parkingTransactionRepository.findOne({
      where: {
        park: { id: parkId },
        carNum: createParkingTransactionDto.carNum,
        exitTime: IsNull(),
      },
    });

    if (!parkingTransaction) {
      throw new ConflictException('Car is not parked');
    }

    if (!parkingTransaction.chargeStartTime) {
      throw new ConflictException('Car is not charging');
    }

    if (parkingTransaction.chargeTime) {
      throw new ConflictException('Car is already charged');
    }

    const chargeTime = this.getChargeTime(parkingTransaction);

    return this.parkingTransactionRepository.update(
      { id: parkingTransaction.id },
      {
        chargeTime: chargeTime,
        chargeAmount: chargeTime * CHARGING_FEE_PER_SECOND,
      },
    );
  }

  private getChargeTime(parkingTransaction: ParkingTransaction): number {
    return (
      (new Date().getTime() +
        KR_TIME_DIFF -
        parkingTransaction.chargeStartTime.getTime()) /
      1000
    );
  }

  findAll(user: User) {
    return this.parkingTransactionRepository.find({
      where: { user: { id: user.id } },
    });
  }

  findUnpaidParkingTransactions(user: User, paymentId: string) {
    return this.parkingTransactionRepository.findOne({
      where: { isPaid: false, user: { id: user.id }, paymentId },
    });
  }

  async getParkedCars(user: User) {
    const parkedCars = await this.parkingTransactionRepository.find({
      where: { user: { id: user.id }, isPaid: false },
    });

    parkedCars.forEach((parkedCar) => {
      parkedCar.currentParkingTime = Math.floor(
        (new Date().getTime() - parkedCar.entryTime.getTime()) / 1000,
      );
    });

    return parkedCars;
  }

  async getUnpaidParkingTransactionByCarNumber(carNum: string) {
    const unpaidParkingTransaction =
      await this.parkingTransactionRepository.findOne({
        where: { carNum, isPaid: false },
      });
    if (!unpaidParkingTransaction) {
      throw new NotFoundException('Unpaid parking transaction not found');
    }
    return unpaidParkingTransaction;
  }
}

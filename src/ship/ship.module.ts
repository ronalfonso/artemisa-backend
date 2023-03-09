import { Module } from '@nestjs/common';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';

@Module({
  imports: [],
  controllers: [ShipController],
  providers: [ShipService],
})
export class ShipModule {}

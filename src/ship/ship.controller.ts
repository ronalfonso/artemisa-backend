import { Body, Controller, Post } from '@nestjs/common';
import { ShipService } from './ship.service';

@Controller('ship')
export class ShipController {
  constructor(private shipService: ShipService) {}
  @Post('evaluate')
  evaluate(@Body() payload: any) {
    return this.shipService.evaluate(payload);
  }
}

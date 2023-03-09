import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipModule } from './ship/ship.module';

@Module({
  imports: [ShipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

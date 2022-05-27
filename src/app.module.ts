import { Module } from '@nestjs/common';
import { StatusModule } from './status/status.module';
import {EventEmitterModule} from '@nestjs/event-emitter';


import { AppService } from './app.service';
import { StatusService } from './status/status.service';
import { StatusGateway } from './status/status.gateway';

@Module({
  imports: [StatusModule, EventEmitterModule.forRoot()  ],
  controllers: [],
  providers: [AppService, StatusService , StatusGateway],
})
export class AppModule {}

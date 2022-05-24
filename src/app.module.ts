import { Module } from '@nestjs/common';
import { StatusModule } from './status/status.module';
import {EventEmitterModule} from '@nestjs/event-emitter';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { ChangeService } from './change/change.service';
import { StatusService } from './status/status.service';
import { StatusGateway } from './status/status.gateway';

@Module({
  imports: [StatusModule, EventEmitterModule.forRoot()  ],
  controllers: [],
  providers: [AppService, StatusService, ChangeService, StatusGateway],
})
export class AppModule {}

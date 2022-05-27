import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { StatusGateway } from './status.gateway';
import { StatusService } from './status.service';
import { Order, StatusEnum } from './status.interface';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { io } from 'socket.io-client';


//TODO add property based testing
describe('This test suite describes the StatusEnumGateway functionality', () => {
  let statusGateway: StatusGateway;
  let statusService: StatusService;
  let testData: Order;
  let mockData: Order;
  let app:INestApplication;
  var socket = io("ws://localhost:2000");

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [StatusService, StatusGateway   ],
    }).compile();

    statusGateway = module.get<StatusGateway>(StatusGateway);
    statusService = module.get<StatusService>(StatusService);
    //CREATE THE WEB SERVER FOR THE TEST, KILL IF PREVIOUS INSTANCE IS FOUND
    if(app!=eval(undefined)){
      app.close();
    }
    app = module.createNestApplication();
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.init();
    app.listen(2000);
  })

  beforeEach(async () => {
    testData =  {
      name : "Ana",
      id : 2050,
      order_name : "batata recheada",
      restaurant : "Casa da batata",
      status : StatusEnum['Undefined']
    }
    mockData = {...testData}; //deep copy
    socket.off();
  });

  afterAll( async () => {
    socket.close();
    await app.close();
  })

  //Improve robustness
    describe('when a status signal arrives', () => {
      it('can issue an update status notify event',  (done) => {
        expect.assertions(1);
        testData.status=StatusEnum['Accepted'];
        mockData.status = StatusEnum['Undefined'];
        socket.on('dispatch',(msg) => {
          expect(msg).toEqual(testData);
          done();
        })
        socket.emit('advance', mockData, );
      });
      it('can issue a rollback status notify event', (done) =>{
        // Only allow if initial state is undefined
        expect.assertions(1);
        testData.status = StatusEnum['Rejected'];
        mockData.status = StatusEnum['Undefined'];
        socket.on('dispatch',(msg) => {
          expect(msg).toEqual(testData);
          done();
        })
        socket.emit('regress', mockData, );
      });
      it('can issue a reject status notify event', (done) =>{
              // Only allow if initial state is undefined
        expect.assertions(1);
        testData.status = StatusEnum['Rejected'];
        mockData.status = StatusEnum['Undefined'];
        socket.on('dispatch',(msg) => {
          expect(msg).toEqual(testData);
          done();
        })
        socket.emit('regress', mockData, );
      });
      it('can issue a reset status notify event', (done) => {
        expect.assertions(1);
        testData.status = StatusEnum['Undefined'];
        mockData.status = StatusEnum['Rejected'];
        socket.on('dispatch',(msg) => {
          expect(msg).toEqual(testData);
          done();
        })
        socket.emit('reset', mockData, );
      });
      it('can issue an actual status notify event', (done) => {
        expect.assertions(1);
        testData.status = StatusEnum['Ready'];
        mockData.status = StatusEnum['Ready'];
        socket.on('dispatch',(msg) => {
          expect(msg).toEqual(testData);
          done();
        })
        socket.emit('actual', mockData, );
      });
    });
  });

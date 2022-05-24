import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { StatusGateway } from './status.gateway';
import { StatusService } from './status.service';
import { Order, Status } from './status.interface';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { io } from 'socket.io-client';


//TODO add property based testing
describe('This test suite describes the StatusGateway functionality', () => {
  let statusGateway: StatusGateway;
  let statusService: StatusService;
  let testData: Order;
  let mockData: Order;
  let app:INestApplication;
  var socket = io("ws://localhost:3000");

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [StatusService, StatusGateway , IoAdapter ],
    }).compile();

    statusGateway = module.get<StatusGateway>(StatusGateway);
    statusService = module.get<StatusService>(StatusService);
    //CREATE THE WEB SERVER FOR THE TEST
    app = module.createNestApplication();
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.init();
    app.listen(3000);
  })

  beforeEach(async () => {
    testData =  {
      name : "Ana",
      id : 2050,
      order_name : "batata recheada",
      restaurant : "Casa da batata",
      status : Status['Undefined']
    }
    mockData = {...testData}; //deep copy
  });

  afterAll( async () => {
    socket.close();
    await app.close();
  })

  //Improve robustness
    describe('when a status signal arrives', () => {
      it('can issue an update status notify event',  ( done ) => {
        expect.assertions(1);
        testData.status=Status['Accepted'];
        mockData.status = Status['Undefined'];
        socket.emit('advance', mockData,(msg) => {
          expect(msg).toEqual(testData);
          done();
        });
      });
      it('can issue a rollback status notify event', (done) =>{
        // Only allow if initial state is undefined
        expect.assertions(1);
        testData.status = Status['Rejected'];
        mockData.status = Status['Undefined'];
        socket.emit('regress', mockData, (msg) => {
          expect(msg).toEqual(testData);
          done();
        });
      });
      it('can issue a reject status notify event', (done) =>{
              // Only allow if initial state is undefined
        expect.assertions(1);
        testData.status = Status['Rejected'];
        mockData.status = Status['Undefined'];
        socket.emit('regress', mockData, (msg) => {
          expect(msg).toEqual(testData);
          done();
        });
      });
      it('can issue a reset status notify event', (done) => {
        expect.assertions(1);
        testData.status = Status['Undefined'];
        mockData.status = Status['Rejected'];
        socket.emit('reset', mockData, (msg) => {
        expect(msg).toEqual(testData);
        done();
        });
      });
      it('can issue an actual status notify event', (done) => {
        expect.assertions(1);
        testData.status = Status['Ready'];
        mockData.status = Status['Ready'];
        socket.emit('actual', mockData, (msg) => {
        expect(msg).toEqual(testData);
        done();
        });
      });
    });
  });

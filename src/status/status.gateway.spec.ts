import { Test, TestingModule } from '@nestjs/testing';
import { StatusGateway } from './status.gateway';
import { StatusService } from './status.service';
import { Order, Status } from './status.interface';

//TODO add property based testing
describe('This test suite describes the StatusGateway functionality', () => {
  let statusGateway: StatusGateway;
  let statusService: StatusService;
  let testData: Order;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusGateway],
      providers: [StatusService],
    }).compile();

    statusGateway = module.get<StatusGateway>(StatusGateway);
    statusService = module.get<StatusService>(StatusService);
    testData =  {
      name : "Ana",
      id : 2050,
      order_name : "batata recheada",
      restaurant : "Casa da batata",
      status : Status['Undefined']
    }

  });


  describe('when a status signal arrives', () => {
    it('can issue a update notify event', async () => {
          testData.status = Status['Accepted'];
          const result = testData;
          jest.spyOn(statusService, 'advanceStatus').mockImplementation(() => result);
          expect(await statusGateway.advanceStatus()).toBe(result);
    });

    // it('might regress state', async () =>{
    //       testData.status = Status['Undefined'];
    //       const result =  testData;
    //       jest.spyOn(statusService, 'regressStatus').mockImplementation(() => result);
    //       expect(await statusGateway.regressStatus()).toBe(result);
    // });

    // it('might mantain state', async () => {
    //    testData.status = Status['Undefined'];
    //   const result = testData;
    //   jest.spyOn(statusService, 'resetStatus').mockImplementation(() => result);
    //   expect(await statusGateway.resetStatus()).toBe(result);
    // })

    // it('might reset state', async () => {
    //   testData.status = Status[ 'Preparing' ];
    //   const result = testData.status= Status[ 'Unchanged' ]; // we extract data from the observable before
    //   jest.spyOn(statusService, 'actualStatus').mockImplementation(() => result);
    //   expect(await statusGateway.actualStatus()).toBe(result);
    // })
  });


});

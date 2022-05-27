import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';
import { Order, StatusEnum } from './status.interface';

describe('This test suite describes the StatusEnumService functionality', () => {
  let service: StatusService;
  let targetData: Order;
  var mockData: Order;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService],
    }).compile();

    service = module.get<StatusService>(StatusService);
    targetData =  {
      name : "Ana",
      id : 2050,
      order_name : "batata recheada",
      restaurant : "Casa da batata",
      status : StatusEnum['Undefined']
    }
    mockData =   {
      name : "Ana",
      id : 2050,
      order_name : "batata recheada",
      restaurant : "Casa da batata",
      status : StatusEnum['Undefined']
    }
  });

  //TODO property based testing
  describe('when a signal arrives', () => {
      it('might advance to the next state', async () => { //REFACTOR: remove async
        targetData.status = StatusEnum['Accepted'];
        mockData.status = StatusEnum['Undefined'];
        const out = service.promoteStatus(mockData);
        console.log(mockData,out);
        expect(out).toStrictEqual(targetData);
      })
      it('but won\'t cycle back to the first state', () => {
        targetData.status = StatusEnum['Ready'];
        mockData.status = StatusEnum['Ready'];
        const out = service.promoteStatus(mockData);
        console.log(mockData,out);
        expect(out).toStrictEqual(targetData);
      })
      it('also won\'t cycle back to the last state', () => {
          targetData.status = StatusEnum['Rejected'];
          mockData.status = StatusEnum['Rejected'];
          const out = service.demoteStatus(mockData);
          console.log(mockData,out);
          expect(out).toStrictEqual(targetData);
      })
      it('might return to a previous state', () => {
          targetData.status = StatusEnum['Rejected'];
          mockData.status = StatusEnum['Undefined'];
          const out = service.demoteStatus(mockData);
          console.log(mockData,out);
          expect(out).toStrictEqual(targetData);
      })
      it('might jump to the default state', () => {
          targetData.status = StatusEnum['Undefined'];
          mockData.status = StatusEnum['Preparing'];
          const out = service.resetStatus(mockData);
          console.log(mockData,out);
          expect(out).toStrictEqual(targetData);
      })
      it('might stay at the current state', () => {
          targetData.status = StatusEnum['Undefined'];
          mockData.status = StatusEnum['Undefined'];
          const out = service.actualStatus(mockData);
          console.log(mockData,out);
          expect(out).toStrictEqual(targetData);
      })
  })
});

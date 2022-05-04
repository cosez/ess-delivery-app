import {Status} from "./status"

export class Status_service {
    tempStatus: Status = new Status();


    addStatus(order: Status): Status {
    let status_state = new Status();
        this.tempStatus.clone(order);
        if(this.tempStatus.isUniqueID()){
        status_state = this.tempStatus;
         this.tempStatus.pushStatus();
     }
    return status_state;
    }

    removeStatus(order: Status): Status {
        let status_state = new Status();
        this.tempStatus.clone(order);
        if(!this.tempStatus.isUniqueID()){
            status_state = this.tempStatus;
            this.tempStatus.removeStatus();
        }
        return status_state;
    }

    updateStatus(order: Status): Status {
        let status_state = new Status();
        if(this.isUniqueID){ // statusVal == MADE, ACCEPT and READY
            let index = this.statusList.findIndex(testID => (testID.id == order.id));
            this.statusList[index].statusVal++;
            status_state = this.statusList[index];
        }
        return status_state;
    }

    sendSignal(code: string) {
        let success_status;
        switch(code){
                case "NOTIFY":
                // call notifyByEmail()
                break;

                case "TRYAGAIN":
                // TODO call something here
                break;

        }
    }

    returnStatusList(): Status[] {
        return this.statusList;
    }
}

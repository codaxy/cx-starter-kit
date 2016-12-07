import { updateArray, append } from 'cx/data';

function delayedResponse(response) {
    return new Promise((resolve) => {
        setTimeout(()=>resolve(response), Math.random() * 300);
    });
}

export class Resource {
    constructor(data) {
        this.data = data || [];
        this.nextId = 1000000;
    }

    filter(data, f) {
        return data;
    }

    query(filter) {
        return delayedResponse(this.filter(this.data, filter));
    }

    get(id) {
        var record = this.data.find(x=>x.id == id);
        return delayedResponse(record);
    }

    post(id, record) {
        this.data = updateArray(this.data, x=>({
            ...record
        }), x=>x.id == id);

        return delayedResponse({...record});
    }

    newRecord() {
        return {};
    }

    put(record) {
        var record = {
            ...record,
            id: ++this.nextId,
            ...this.newRecord()
        };
        this.data = append(this.data, record);
        return delayedResponse({...record});
    }

    delete(id) {
        this.data = this.data.filter(a=>a.id != id);
        return delayedResponse();
    }
}


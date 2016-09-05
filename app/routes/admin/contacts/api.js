import {Resource} from 'app/util/Resource';
import casual from 'app/util/casual';

const contactData = Array.from({length: 100}, (_, index) => {
    var firstName = casual.first_name,
        lastName = casual.last_name;
    return {
        id: index + 1,
        firstName: firstName,
        lastName: lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        street: casual.street,
        streetNo: casual.integer(1, 100),
        zip: casual.integer(10000, 100000),
        city: casual.city,
        state: casual.state,
        country: casual.country
    }
});

export const contacts = new Resource(contactData);

contacts.filter = (data, f) => {
    if (!f)
        return data;
    var result = data;
    if (f.query) {
        var checks = f.query.split(' ').map(w=>new RegExp(w, 'gi'));
        result = result.filter(a=>checks.every(ex=>a.firstName.match(ex) || a.lastName.match(ex)));
    }
    return result;
};

const dates = [];
const moment = require("moment");
const yiq = require("yiq");
const chance = require('chance').Chance();

const parts = ["entregar", "buscar", "devolver", "revisar", "lavar"];
const values = ["as roupas", "os edredons", "os sapatos", "oss tapetes", "os vestidos", "as gravatas", "as capas de sofá"];


let start = moment().subtract("2", "months");

for (var i = 0; i < 90; i++) {
    start = start.add(Math.round(Math.random() * 30) + 6, "hours");
    if (chance.bool({ likelihood: 30 })) {
        const color = chance.color({ format: 'hex' });

        dates.push({
            date: start.toDate(),
            title: chance.pickone(parts) + " " + chance.pickone(values),
            color,
            textColor: yiq(color)
        })

    }
}



module.exports = dates;
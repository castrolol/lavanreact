import moment from "moment";


export function agruparEventos(eventos, dataReferencia) {

    if(!dataReferencia) throw new Error("É necessário passar uma data de referencia");

    const data = moment(dataReferencia).startOf("week").add(1, "day");
    const resultado = [];

    for (var i = 0; i < 6; i++) {
        const textoData = data.format("YYYY-MM-DD");
        let textoDia = data.format("dddd");
        textoDia = textoDia.split("-")[0];
         
        const eventosData = eventos.filter( evento => {
            return moment(evento.date).format("YYYY-MM-DD") === textoData;
        });

        resultado.push({
            dia: textoDia,
            eventos: eventosData
        });

        data.add(1, "day")
    }



    return resultado
}
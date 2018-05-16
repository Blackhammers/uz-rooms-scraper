const cheerio = require('cheerio')
const request = require('request')
const tableToJson = require('tabletojson')


const roomsUrl = 'http://www.plan.uz.zgora.pl/sale_lista_budynkow.php?pTyp=P'


request(roomsUrl, (error, response) => {
    if (!error) {
        // let tables = tableToJson.convert(response.body)
        // console.log(tables[0])

        const $ = cheerio.load(response.body);
        $('tr td a').each((index, el) => {
            console.log(el)
        })
    }
    else {
        console.log(error)
    }
})



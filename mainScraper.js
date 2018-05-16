const cheerio = require('cheerio')
const request = require('request')

const roomsUrl = 'http://www.plan.uz.zgora.pl/sale_lista_budynkow.php?pTyp=P'


request(roomsUrl, (error, response) => {
    console.log(response.body)
})
const cheerio = require('cheerio')
const request = require('request')
const tableToJson = require('tabletojson')


const roomsUrl = 'http://www.plan.uz.zgora.pl/sale_lista_budynkow.php?pTyp=P'
const prefixUrl = 'http://www.plan.uz.zgora.pl/'


request(roomsUrl, (error, response) => {
    if (!error) {
        let arrayOfBuildings = []
        let arrayOfBuildingsUrls = []

        let tables = tableToJson.convert(response.body)
        let allBuildings = tables[0]
        allBuildings.splice(0, 1)

        const $ = cheerio.load(response.body);
        $('tr td a').each((index, el) => {
            arrayOfBuildingsUrls.push(prefixUrl + el.attribs.href)
        })

        allBuildings.forEach((building, index) => {
            arrayOfBuildings.push({
                buildingNumber: building['0'],
                buildingName: building['1'],
                buildingAddress: building['2'],
                buildingUrl: arrayOfBuildingsUrls[index]
            })
        });

        console.log(arrayOfBuildings)
    }
    else {
        console.log(error)
    }
})



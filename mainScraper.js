const cheerio = require('cheerio')
const request = require('request')
const tableToJson = require('tabletojson')
const async = require('async');


const roomsUrl = 'http://www.plan.uz.zgora.pl/sale_lista_budynkow.php?pTyp=P'
const prefixUrl = 'http://www.plan.uz.zgora.pl/'


const mainScraper = () => {
    async.waterfall([
        cb => {
            console.log('Callback numer 1 rozpoczęty')
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
                    console.log('Tworzenie tablicy z obiektami budynków ukońzczone')
                    cb(null, arrayOfBuildings);
                }
                else {
                    console.log(error)
                }
            })
        },
        (arrayOfBuildings, cb) => {
            console.log('Callback numer 2 rozpoczęty')

        }
    ])
}

mainScraper()
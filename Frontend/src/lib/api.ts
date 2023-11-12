const API_URL = ""
let programs = []
function getPrograms(){
    fetch(API_URL + "api/x")
    .then(response=>response.json)
}
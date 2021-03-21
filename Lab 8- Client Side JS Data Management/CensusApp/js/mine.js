const countryInpBox = document.querySelector("#country")
const populationInputBox = document.querySelector("#population")
const formElement = document.querySelector("#form")
const countriesTables = document.querySelector("#countries")

formElement.addEventListener('submit', addCensus)

const db = new Localbase('aa1704079.b02.db')
showCensusData()

let editedID;
let isEdit = false;


//database //indexedDB
//database
function form2object(formElement){
    const formData = new FormData(formElement)
    const data = { }

    for (const [key ,value] of formData) {
        data[key]= value
    }
    return data
}

async function addCensus(event){

    event.preventDefault()

    const newCensus =form2object(formElement)

    // const newCensus ={
    //      country : countryInpBox.value ,
    //      population : populationInputBox.value
    //  }


    //save the object into database
    if(isEdit){
        await db.collection('census').doc({id : editedID}).update(newCensus)
    }else {
        newCensus.id = Date.now().toString()
        await db.collection('census').add(newCensus)
    }

    await showCensusData()
    formElement.reset()
    isEdit = false;
}

async function deleteCensus(cid) {
    await db.collection('census').doc({id: cid}).delete()
    await showCensusData()
}

async function editCensus(cid){
    const edited = await db.collection('census').doc({id : cid}).get()
    countryInpBox.value = edited.country
    populationInputBox.value = edited.population

    editedID = edited.id
    isEdit = true
}

function censusToHTMLRow(c) {
    return `
         <tr>
            <td>${c.country}</td>
            <td>${c.population}</td>
            <td>
                <l class="fa fa-home" onclick="editCensus('${c.id}')">Edit</>
                <i class="fa fa-save " onclick="deleteCensus('${c.id}')">Delete</i>
            </td>
        </tr>
    `}

async function showCensusData(noOfRows){
    let census;
    // open the database and read all the doc inside the collection
    if(noOfRows)
        census = await db.collection('census').limit(parseInt(noOfRows)).get()

    else
        census = await db.collection('census').get()

    // we will convert the collection data into HTML table
    if(census.length>0){
        const censusHTMLRows = census.map(c=> censusToHTMLRow(c))
        countriesTables.innerHTML = `
     <thead>
            <tr>
                <th>Country</th>
                <th>Population</th>
                <th>Action</th>
            
            </tr>
     </thead>
     ${censusHTMLRows.join('')}`
    }

}


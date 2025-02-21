class Item {

    constructor({text}){
        this.text = text; 
    }

    toHTML(){
        return "<li>" + this.text + "</li>"; 
    }

}

let list = []; 

let first = new Item({
    "text":"My first task!"
});

list.push(first);

//  FUNCTIONS TO READ LIST AND CLEAR LIST

// save the list as a JSON object
function updateStorage() {
    let data = JSON.stringify(list);
    console.log(data);
    localStorage.setItem("list", data);
    return;
}

//  get stored "list" and turn each JSON item into Items in the list
//  then return the list of items
function readStorage(){
    //  get stored data and turn it into a JSON object
    //  if there's nothing there, you have an empty object
    //  we don't want to change the data here so we make it a const
    const storage = JSON.parse(localStorage.getItem('list')) || []; 



    let result = storage.map(
        listData => new Item(listData)
    )

    return result; 
}

//  read list into HTML
function readList(){
    let listElement = document.querySelector('.list');
    

    listElement.innerHTML = ""; 

    //  check to make sure there is something in the storage; 
    //  if not, do nothing
    let storageCheck = localStorage.getItem('list');
    if (!storageCheck){
        console.log('No saved list found in local storage'); 
        return;     
    }

    //  set the list to the list that it gets out of storage;
    list = readStorage(); 

    list.forEach(
        itemData =>{
          //  data becomes an Item object
          let item = new Item(itemData); 

          //  object toHTML is called
          let itemHTML = item.toHTML(); 

          //  insert the html into the inner html of the element
          listElement.innerHTML += itemHTML; 
    
        }
    ); // conclude the loop



    return;
}

// delete the list
function deleteList(){
    //  delete local storage under list
    localStorage.removeItem('list');

    //  set list to an empty array
    list = []; 

    return; 
}

function formSubmit(event){
    //  stop the default event
    event.preventDefault(); 

    //  form holds the form data
    let form = new FormData(event.currentTarget); 

    //  make a JSON object from the form data
    let itemData = Object.fromEntries(form); 

    //  make an Item from the itemData
    let newItem = new Item({
        text: itemData.text
    })

    //  add the new item to the list
    list.push(newItem); 

    //  save the list that now has the new item
    updateStorage(); 

    //  then take the saved list and load it into the HTML
    readList(); 
    
    return; 
}
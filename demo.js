
const input = document.createElement('button');
input.innerText = "Add Text";
input.setAttribute('style', 'margin:10px;');

createTab({name:'My First Tab'});
createTab({content:input,name:'My Second Tab'});
createTab({name:'My Third Tab'});
createTab({name:'My Third Tab'});
createTab({name:'My Third Tab'});

var put = 1;
giveEvent(input, 'click', ()=>{
    const h1 = document.createElement('h1');
    h1.innerText = put;
    put++;

    getActiveTabSection().appendChild(h1);

    doneAction();

});

giveShortcuts();
giveAppInfo({dialogTitle:'vectorex.net'});

const input = document.createElement('button');
input.innerText = "Add Text";
input.setAttribute('style', 'margin:10px;');

createTab({name:'My First Tab'});
createTab({content:"<h1>This is a static header</h1>", name:'My Second Tab'});
createTab({content:input, name:'My Third Tab'});

var put = 1;
giveEvent(input, 'click', ()=>{
    const h1 = document.createElement('h1');
    h1.innerText = put + ". This can be undone and redone, try it out (Ctrl + Z/Ctrl + Y)";
    put++;
    getActiveTabSection().appendChild(h1);

    doneAction();
});

giveShortcuts();
giveAppInfo({dialogTitle:'vectorex.net'});
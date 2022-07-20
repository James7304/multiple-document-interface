
///// Tab array /////
var T_ARR = [];

// This function finds the active tab and puts it on the end of the array
function reposT_ARR(){

    if(T_ARR.length == 0){
        console.error('ERROR :: reposT_ARR :: There are no tabs => no active tabs');
    }
    let activeTabId = getActiveTab().getAttribute('tab-id'); // Find the active tab id

    let pos;
    let i = 0;
    while(i < T_ARR.length){
        if(T_ARR[i].id == activeTabId){
            pos = i;
            i = T_ARR.length;
        }
        i++;
    }
    
    T_ARR.push(T_ARR[pos]);
    T_ARR[pos] = null;

    condenseT_ARR();
}
// This function finds all elements in the array with value null and removes them, keeping all the other elements in the right order
function condenseT_ARR(){

    let popBacks = 0;
    for(var i = 0; i < T_ARR.length; i++){

        if(T_ARR[i] == null){

            popBacks++;
            for(var j = i + 1; j < T_ARR.length; j++){
                T_ARR[j - 1] = T_ARR[j];
                T_ARR[j] = '-';
            }
        }
    }

    for(var k = 0; k < popBacks; k++){
        T_ARR.pop();
    }
}


///// ID handling /////
// This function gives object passed into it a unique tab-id
var tabNo=1;
function setNewTabID(object){
    object.setAttribute('tab-id', tabNo);
    tabNo++;
    return;
}
// Give unique event id
function giveEventId(object){
    
    let id = Math.floor(Math.random() * 1000000) + 1000000;

    while(document.querySelector("[event-id='" + id + "']")){
        id = Math.floor(Math.random() * 1000000) + 1000000;
    }

    object.setAttribute('event-id', id);
}


///// Getting the tabs /////

// Returns the active tab id
function getActiveTabId(){
    const active = document.querySelector("[data-type='tab-holder']").querySelector('.active');
    if(!active){
        return;
    }
    return active.getAttribute('tab-id');
}

// Returns the HTML of the active tab
function getActiveTab(){
    return getTab(getActiveTabId());
}
// Returns the filename of the active tab
function getActiveTabName(){
    return getTabName(getActiveTabId());
}
// Returns the entire section for the active tab
function getActiveTabSection(){
    return getTabSection(getActiveTabId());
}
// Returns the content for the active tab
function getActiveTabContent(){
    return getTabContent(getActiveTabId());
}

// Returns the HTML of the target tab
function getTab(tabid){
    return document.querySelector("[tab-id='" + tabid + "']");
}
// Returns the filename of the target tab
function getTabName(tabid){
    const text = getTab(tabid).innerText;
    return text.substring(0, text.length  - 1);
}
// Returns the entire section for the target tab
function getTabSection(tabid){
    return document.querySelector("[content-id='" + tabid + "']");
}
// Returns the content for the target tab
function getTabContent(tabid){
    return document.querySelector("[content-id='" + tabid + "']").innerHTML;
}


///// Saving stuff /////

// When changes have been made for the first time to the active tab, call this function. It is called by default in done_action()
function changesToActiveTab(){
    getActiveTab().setAttribute('status', 'unsaved-changes');
}
// When changes have been made for the first time to the target tab, call this function. It is called by default in done_action()
function changesToTab(tabid){
    getTab(tabid).setAttribute('status', 'unsaved-changes');
}
// Saves that the active tab has been saved
function activeTabSaved(){
    getActiveTab().removeAttribute('status');
}
// Saves that the target tab has been saved
function tabSaved(tabid){
    getTab(tabid).removeAttribute('status');
}

// Downloads file in the user's browser
function download(filename, filetype, data) {
    const blob = new Blob([data], {type: 'txt'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename + "." + filetype;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

// Removes any dialog box that is on the screen
function removeDlg(){
    document.querySelector('.modal-dlg').remove();
}
// Save validation dialog box
function createSaveValidationDialog(){
    return new Promise((resolve)=>{

        const modal = document.createElement('div');
        modal.classList.add('modal-dlg');

        const dlg = document.createElement('div');
        dlg.classList.add('dlg');

        const title = document.createElement('div');
        title.classList.add('dlg-header');
        title.innerText = appInfo.dialogTitle;

        const main = document.createElement('div');
        main.classList.add('dlg-main');
        main.innerHTML = "<h1>Do you want to save the changes you made?</h1><p>Your changes will be lost if you don't save them.</p>";
        
        const buttons = document.createElement('div');
        buttons.classList.add('dlg-buttons');

        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = "Cancel";
        cancelBtn.onclick = ()=>{
            removeDlg();
        };

        const dontBtn = document.createElement('button');
        dontBtn.innerText = "Don't Save";
        dontBtn.onclick = ()=>{
            removeDlg();
            resolve("Don't Save");
        };

        const saveBtn = document.createElement('button');
        saveBtn.innerText = "Save";
        saveBtn.onclick = ()=>{
            removeDlg();
            resolve("Save");
        };

        buttons.appendChild(cancelBtn);
        buttons.appendChild(dontBtn);
        buttons.appendChild(saveBtn);

        dlg.appendChild(title);
        dlg.appendChild(main);
        dlg.appendChild(buttons);
        modal.appendChild(dlg);
        document.body.appendChild(modal);
        
    });
}
// This dialog box handles the saving of the document
function createSavingDialog(docCollection=appInfo.defaultDocumentCollection, tabid=getActiveTabId()){
    return new Promise((resolve)=>{

        const modal = document.createElement('div');
        modal.classList.add('modal-dlg');

        const dlg = document.createElement('div');
        dlg.classList.add('dlg');

        const title = document.createElement('div');
        title.classList.add('dlg-header');
        title.innerText = appInfo.dialogTitle;

        const main = document.createElement('div');
        main.classList.add('dlg-main');
        main.innerHTML = "<h1>Where do you want to save your file to?</h1>";

        const saves = document.createElement('div');
        saves.classList.add('saves');
        
        main.appendChild(saves);
        
        const device = document.createElement('div');
        device.classList.add('save-btn');
        device.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' height='45'><path d='M528 0h-480C21.5 0 0 21.5 0 48v320C0 394.5 21.5 416 48 416h192L224 464H152C138.8 464 128 474.8 128 488S138.8 512 152 512h272c13.25 0 24-10.75 24-24s-10.75-24-24-24H352L336 416h192c26.5 0 48-21.5 48-48v-320C576 21.5 554.5 0 528 0zM512 288H64V64h448V288z'/></svg><br>Device";

        device.onclick = ()=>{
            download(getTabName(tabid), appInfo.defaultFileType, docCollection());
            removeDlg();
            resolve('Saved');
        };

        saves.appendChild(device);

        const buttons = document.createElement('div');
        buttons.classList.add('dlg-buttons');

        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = "Cancel";
        cancelBtn.onclick = ()=>{
            removeDlg();
        };
        
        buttons.appendChild(cancelBtn);

        dlg.appendChild(title);
        dlg.appendChild(main);
        dlg.appendChild(buttons);
        modal.appendChild(dlg);
        document.body.appendChild(modal);
    });
}


///// Tab construction - dynamically and statically /////
// Give each tab the necassery events
function giveTabEvents(tab, docCollection){
    $(tab).on('activate', function(){

        const activeTab = getActiveTab();
        if(activeTab != null){
            $(activeTab).trigger('deactivate');
        }
        this.classList.add('active'); 
        document.querySelector("[content-id='" + this.getAttribute('tab-id') + "']").style.display = "block";

        reposT_ARR();      
    });
    $(tab).on('deactivate', function(){
        this.classList.remove('active');
        document.querySelector("[content-id='" + this.getAttribute('tab-id') + "']").style.display = "none";
    });

    $(tab).on('click', function(){

        if(this.querySelector('div').matches(':hover')){ // Close button has been pressed
            $(tab).trigger('close');
        }
        else{ // This tab wants to be opened
            $(tab).trigger('activate');
        }
    });
    $(tab).on('close', function(){

        function closeThis(){

            if(tab.classList.contains('active')){
            
                T_ARR.pop();
                if(T_ARR.length >= 1){
                    $("[tab-id='" + T_ARR[T_ARR.length - 1].id + "']").trigger('activate');
                }
            }
    
            document.querySelector("[content-id='" + tab.getAttribute('tab-id') + "']").remove();
            tab.remove();
            condenseT_ARR();
        }
        
        if(tab.getAttribute('status') == 'unsaved-changes'){
            
            // Display unsaved changes box
            createSaveValidationDialog().then((promise)=>{
                if(promise == "Save"){
                    createSavingDialog(docCollection, tab.getAttribute('tab-id')).then((promise)=>{
                        if(promise == "Saved"){
                            closeThis();
                        }
                    });
                }
                else if(promise == "Don't Save"){
                    closeThis();
                }
            });
        }
        else{
            closeThis();
        }


    });
}
// Creates a new tab
function createTab(args){

    // Have default values for the parameter
    const defaultArgs = {
        activate:true,
        content:appInfo.defaultTabContent, 
        name:'untitled_doc',
        docCollection:appInfo.defaultDocumentCollection,
        saved:true
    };
    args = Object.assign({},defaultArgs, args);

    // Create HTML and add it to the tab
    const tab = document.createElement('li');
    setNewTabID(tab);
    tab.innerHTML = args.name + '<div>✕</div>';
    document.querySelector("[data-type='tab-holder']").appendChild(tab);

    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-section');
    tabContent.setAttribute('content-id', tab.getAttribute('tab-id'));
    if(args.content){
        args.content instanceof Element || args.content instanceof HTMLDocument ? tabContent.appendChild(args.content) : tabContent.innerHTML = args.content;
    }
    document.querySelector("[data-type='tab-content']").appendChild(tabContent);

    // Add the tab to the global T_ARR
    T_ARR.push({id:tab.getAttribute('tab-id'), stateIndex:0, states:[$(tabContent).clone(true, true)]});

    // Give events
    giveTabEvents(tab, args.docCollection);

    if(args.activate){
        // Active this tab
        $(tab).trigger('activate');
    }
    if(!args.saved){
        changesToActiveTab();
    }

    return tab.getAttribute('tab-id');
}
// Takes the initial set off tabs created in the .HTML file and adds the events and stuff
function constructInitialTabs(){

    let tabs = document.querySelector("[data-type='tab-holder']").querySelectorAll('li');
    let tabContent = document.querySelector("[data-type='tab-content']").querySelectorAll('.tab-section');
    
    if(tabs.length > tabContent.length){
        for(var i = 0; i < tabs.length - tabContent.length; i++){
            const new_content = document.createElement('div');
            new_content.classList.add('tab-section');
            document.querySelector("[data-type='tab-content']").appendChild(new_content);
        }
        console.warn('WARNING :: TABS-UNDO-REDO :: There are not the same number of tabs and tab contents :: There are more tabs');
    }
    else if(tabs.length < tabContent.length){
        for(var i = 0; i < tabContent.length - tabs.length; i++){
            const new_tab = document.createElement('li');
            new_tab.innerText = "untitled_doc";
            document.querySelector("[data-type='tab-holder']").appendChild(new_tab);
        }
        console.warn('WARNING :: TABS-UNDO-REDO :: There are not the same number of tabs and tab contents :: There are more tab contents');
    }
    
    tabs = document.querySelector("[data-type='tab-holder']").querySelectorAll('li');
    tabContent = document.querySelector("[data-type='tab-content']").querySelectorAll('.tab-section');

    let foundActive = false;
    for(var i = 0; i < tabs.length; i++){

        // Add data to the existing tabs and tabContent
        setNewTabID(tabs[i]);
        const close_button = document.createElement('div');
        close_button.innerText = '✕';
        tabs[i].appendChild(close_button);

        tabContent[i].setAttribute('content-id', tabs[i].getAttribute('tab-id'));
        tabContent[i].style.display = "none";

        // Add the tab to the global T_ARR
        T_ARR.push({id:tabs[i].getAttribute('tab-id'), stateIndex:0, states:[$(tabContent[i]).clone(true, true)]});
        
        giveTabEvents(tabs[i]);

        if(tabs[i].classList.contains('active')){
            if(!foundActive){
                $(tabs[i]).trigger('activate');
                foundActive = true;
            }
            else{
                tabs[i].classList.remove('active')
            }
        }
    }

    // Make the first tab active
    if(tabs.length > 0 && !foundActive){
        $(tabs[0]).trigger('activate');
    }
}


///// Undo and redo functions /////
// Call this function whenever an action has been done, so that it can be undone by the user
function doneAction(unsavedChanges = true){
    for(var i = T_ARR[T_ARR.length - 1].states.length - 1; i > T_ARR[T_ARR.length - 1].stateIndex; i--){
        T_ARR[T_ARR.length - 1].states.pop();
    }

    T_ARR[T_ARR.length - 1].states.push($(getActiveTabSection()).clone(true, true));
    T_ARR[T_ARR.length - 1].stateIndex = T_ARR[T_ARR.length - 1].states.length - 1;

    if(unsavedChanges){
        changesToActiveTab();
    }
}
// This function undos an action
function undo_action(){
    
    if(T_ARR[T_ARR.length - 1].stateIndex > 0){
        T_ARR[T_ARR.length - 1].stateIndex--;
        getActiveTabSection().innerHTML = T_ARR[T_ARR.length - 1].states[T_ARR[T_ARR.length - 1].stateIndex][0].innerHTML;
    }
}
// This function redos an action
function redo_action(){

    if(T_ARR[T_ARR.length - 1].stateIndex < T_ARR[T_ARR.length - 1].states.length - 1){
        T_ARR[T_ARR.length - 1].stateIndex++;
        getActiveTabSection().innerHTML = T_ARR[T_ARR.length - 1].states[T_ARR[T_ARR.length - 1].stateIndex][0].innerHTML;
    }
}


///// Event handling /////
// The user must call this function to give an event to an object that must keep the event when undoing and redoing actions
function giveEvent(el, eventType, handler){

    let end = false;
    let parent = el;
    while(!end){
        parent = parent.parentElement;
        if(parent.classList.contains('tab-section')){
            end = true;
        }
        else if(parent.tagName == 'BODY'){
            return console.error("ERROR :: giveEvent :: Element given is not a child of a tab");
        }
    }

    if(el.getAttribute('event-id') == null){
        giveEventId(el);
    }

    $(parent).on(eventType, "[event-id='" + el.getAttribute('event-id') + "']", handler);
}


///// Shortcuts /////
// The user can call this function to initiate shortcuts for the functions available. There are default ones, or the user can create their own or remove them
function giveShortcuts(args){

    // Have default values for the parameter
    const defaultArgs = {
        undo:[{ctrl:true, shft:false, key:'z'}],
        redo:[{ctrl:true, shft:true, key:'z'}, {ctrl:true, shft:false, key:'y'}],
        closeTab:[{ctrl:true, shft:false, key:'q'}],
        newTab:[{ctrl:true, shft:false, key:'b'}],
        save:[{ctrl:true, shft:false, key:'s'}],
    };
    args = Object.assign({},defaultArgs, args);

    document.addEventListener('keydown', (event)=>{

        for(var i = 0; i < args.undo.length; i++){
            if(event.ctrlKey == args.undo[i].ctrl && event.shiftKey == args.undo[i].shft && event.key.toLowerCase() == args.undo[i].key){
                event.preventDefault();
                undo_action();
                return;
            }
        }
        for(var i = 0; i < args.redo.length; i++){
            if(event.ctrlKey == args.redo[i].ctrl && event.shiftKey == args.redo[i].shft && event.key.toLowerCase() == args.redo[i].key){
                event.preventDefault();
                redo_action();
                return;
            }
        }
        for(var i = 0; i < args.closeTab.length; i++){
            if(event.ctrlKey == args.closeTab[i].ctrl && event.shiftKey == args.closeTab[i].shft && event.key.toLowerCase() == args.closeTab[i].key){
                event.preventDefault();
                $(getActiveTab()).trigger('close');
                return;
            }
        }
        for(var i = 0; i < args.newTab.length; i++){
            if(event.ctrlKey == args.newTab[i].ctrl && event.shiftKey == args.newTab[i].shft && event.key.toLowerCase() == args.newTab[i].key){
                event.preventDefault();
                createTab({saved:false});
                return;
            }
        }
        for(var i = 0; i < args.save.length; i++){
            if(event.ctrlKey == args.save[i].ctrl && event.shiftKey == args.save[i].shft && event.key.toLowerCase() == args.save[i].key){
                event.preventDefault();
                createSavingDialog(appInfo.defaultDocumentCollection);
                return;
            }
        }
    });
}


///// App information /////
// Stores all the information about the app
let appInfo = {
    dialogTitle:'Click to continue',
    defaultTabContent:"",
    defaultDocumentCollection:()=>{return getActiveTabSection().innerHTML;},
    defaultFileType:"html"
};
// The user can change any the default settings given
function giveAppInfo(args){
    appInfo = Object.assign({},appInfo, args);
}


// This constructs initial tabs that are in the document, and have not been added using createTabs()
constructInitialTabs();

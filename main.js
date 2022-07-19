
// Globals
var T_ARR = [];
var tabNo=1;

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

// This function gives object passed into it a unique tab-id
function setNewTabID(object){
    object.setAttribute('tab-id', tabNo);
    tabNo++;
    return;
}

// Returns the HTML of the active tag
function getActiveTab(){
    return document.querySelector("[data-type='tab-holder']").querySelector('.active');
}
function getActiveTabSection(){
    return getTabSection(getActiveTab().getAttribute('tab-id'));
}

// Returns the target tab/tab content
function getTab(tabid){
    return document.querySelector("[tab-id='" + tabid + "']");
}
function getTabSection(tabid){
    return document.querySelector("[content-id='" + tabid + "']");
}
function getTabContent(tabid){
    return document.querySelector("[content-id='" + tabid + "']").innerHTML;
}

// Give each tab the necassery events
function giveTabEvents(tab, saveFunction){
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
        
        if(!saveFunction()){
            return;
        }

        if(this.classList.contains('active')){
            
            T_ARR.pop();
            if(T_ARR.length >= 1){
                $("[tab-id='" + T_ARR[T_ARR.length - 1].id + "']").trigger('activate');
            }
        }

        document.querySelector("[content-id='" + this.getAttribute('tab-id') + "']").remove();
        this.remove();
        condenseT_ARR();

    });
}

// Creates a new tab
function createTab(args){

    // Have default values for the parameter
    const defaultArgs = {
        activate:true,
        content:false, 
        name:'untitled_doc',
        saveFunction:()=>{return true;}
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
    T_ARR.push({id:tab.getAttribute('tab-id'), stateIndex:0, states:[$(tabContent.innerHTML).clone(true, true)]});

    // Give events
    giveTabEvents(tab, args.saveFunction);

    if(args.activate){
        // Active this tab
        $(tab).trigger('activate');
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
        T_ARR.push({id:tabs[i].getAttribute('tab-id'), stateIndex:0, states:[$(tabContent[i].innerHTML).clone(true, true)]});
        
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

// Undo and redo functions
function doneAction(){
    for(var i = T_ARR[T_ARR.length - 1].states.length - 1; i > T_ARR[T_ARR.length - 1].stateIndex; i--){
        T_ARR[T_ARR.length - 1].states.pop();
    }

    T_ARR[T_ARR.length - 1].states.push($(getActiveTabSection().innerHTML).clone(true, true));
    T_ARR[T_ARR.length - 1].stateIndex = T_ARR[T_ARR.length - 1].states.length - 1;
}
function undo_action(){
    if(T_ARR[T_ARR.length - 1].stateIndex > 0){
        T_ARR[T_ARR.length - 1].stateIndex--;
        getActiveTabSection().innerHTML = T_ARR[T_ARR.length - 1].states[T_ARR[T_ARR.length - 1].stateIndex][0].innerHTML;
    }
}
function redo_action(){
    if(T_ARR[T_ARR.length - 1].stateIndex < T_ARR[T_ARR.length - 1].states.length - 1){
        T_ARR[T_ARR.length - 1].stateIndex++;
        getActiveTabSection().innerHTML = T_ARR[T_ARR.length - 1].states[T_ARR[T_ARR.length - 1].stateIndex][0].innerHTML;
    }
}

constructInitialTabs();

createTab({content:"<h1>First tab</h1>",name:'My First Tab'});
createTab({name:'My Second Tab'});
createTab({name:'My Third Tab'});


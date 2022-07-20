# Multiple Document Interface
This project is an interface for a MDI (Multiple Document Interface) app. It includes features such as a tabbed UI, the ability to dynamically add tabs and change tab content, the ability to save documents, saving validation, and undo and redo functions.

## Demo
[View a demo here](http://jamesmccorkindale.co.uk/demos/mdi)

## Usage
### Source
Download the source code from GitHub and put it into your site.

Add `mdi.css` into the `<head>` tag.
```
<link href="./mdi.css" rel="stylesheet">
```

Add `mdi.js` at the end of the `<body>` tag.
```
<script src="./mdi.js" type="text/javascript"></script>
```
Or use the compressed version `mdi.min.js`.
```
<script src="./mdi.min.js" type="text/javascript"></script>
```

### Other requirements
This project requires jQuery to run. Add the CDN into your `<head>` tag.
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
```

### Initial Code
To create the interface, add the following code to the your `<body>` tag. This will create the framework for the entire interface.
```
<div class="tabs" data-type="tabs">
    <div data-type="tab-bar">
        <ul data-type="tab-holder">

        </ul>
    </div>
    <div data-type="tab-content">

    </div>
</div>
```


## Creating tabs

All tabs are given a unique id called `tab-id` this is stored as an attribute on each tab.

### Creating tabs on window load
To initially create tabs in your .html file, add  an `<li>` tag into the `<ul data-type="tab-holder"></ul>` tag for each tab you want.
```
<div class="tabs" data-type="tabs">
    <div data-type="tab-bar">
        <ul data-type="tab-holder">
        
            <li>My First Tab</li>
            <li>My Second Tab</li>
            <li>My Third Tab</li>
            
        </ul>
    </div>
    <div data-type="tab-content">

    </div>
</div>
```

By default, the first tab will be set as the active tab (tab that is currently open), however, you can override this by including `active` in the classlist of the tab you want to be the active tab.
```
<div class="tabs" data-type="tabs">
    <div data-type="tab-bar">
        <ul data-type="tab-holder">
        
            <li>My First Tab</li>
            <li class="active">My Second Tab</li>
            <li>My Third Tab</li>
            
        </ul>
    </div>
    <div data-type="tab-content">

    </div>
</div>
```


### Dynamically creating tabs
To dynamically create a tab using Javascript, use the `createTab(args)` function. `createTab()` returns the `tab-id` of the tab that it just created.
`createTab(args)` has the following default parameter attributes.

| Attribute      | Value | Description     |
| ---            | ---            | ---            |
| activate | true | if true, the new tab will be made the active tab |
| content | appInfo.defaultTabContent | the contents of the new tab section, this can be DOM elements or plain text |
| name | 'untitled_doc' | the name given to the tab |
| docCollection | appInfo.defaultDocumentCollection | the method that will be used to collect the data when needed to be saved |
| saved | true | whether the new tab will already be saved somewhere |



**Example**
```
const input = document.createElement('button');
input.innerText = "Click this button for fun";
input.setAttribute('style', 'margin:10px;');

createTab({name:'My First Tab'});
createTab({content:input, name:'My Second Tab'});
createTab({content:"<h1>Third tab</h1>", name:'My Third Tab'});
```

## Style Customisation
### Tabs
To customise the tabs, add a identifier (like a class or id) to the `<div>` tag that contains the tab holder.
```
<div class="custom-tabs" data-type="tab-bar">
    <ul data-type="tab-holder">

        <li>My First Tab</li>
        <li class="active">My Second Tab</li>
        <li>My Third Tab</li>

    </ul>
</div>
```
From here, you can customise the tab-bar, tab-holder and the actual tabs. Do it like this.
```
div.custom-tabs[data-type="tab-bar"]{
    /* Custom styles for the tab-bar go here */
    ...
}
div.custom-tabs[data-type="tab-bar"] ul[data-type="tab-holder"]{
    /* Custom styles for the tab-holder go here */
    ...
}
div.custom-tabs[data-type="tab-bar"] ul[data-type="tab-holder"] li{
    /* Custom styles for the tabs go here */
    ...
}
```

### Tab Content
You can also easily adapt the tab content using a similiar method. Add a identifier to the `<div>` tag that contains all the tab sections.
```
<div class="custom-sections" data-type="tab-content">
    
</div>
```
And then, you can change the style of the tab sections' container, and the tab sections like this.
```
div.custom-sections[data-type="tab-content"]{
    /* Custom styles for the tab-content go here */
    ...
}
div.custom-sections[data-type="tab-content"] .tab-section{
    /* Custom styles for the tab sections go here */
    ...
}
```

## Getting and Setting Tab Content
One of the most important things you will need to be able to do is getting and setting content in each tab section. The following functions should help with this.
*Note: All parameters of tabid is the individual ID given to each tab. For more details, see [Creating Tabs](https://github.com/James7304/multiple-document-interface/blob/main/README.md#creating-tabs).*

| function      | returns |
| ---            | ---            |
| getActiveTabId() | the `tab-id` of the active tab |
| getActiveTab() | the `<li>` tag of the active tab |
| getActiveTabName() | the document name of the active tab |
| getActiveTabSection() | the `<div>` tag that contains the content of the active tab |
| getActiveTabContent() | the content of the active tab |
|||
| getTab(tabid) | the `<li>` tag of the target tab |
| getTabName(tabid) | the document name of the target tab |
| getTabSection(tabid) | the `<div>` tag that contains the content of the target tab |
| getTabContent(tabid) | the content of the target tab |


## Undo and Redo Functions
### Undo and Redo
To undo an action, simply call `undo_action()`. Similiary, to redo an action, call `redo_action()`. These are usually implented when the user clicks an undo/redo button or uses a shortcut like Ctrl + Z/Ctrl + Shft + Z. These default shortcuts can be activated using the `giveShortcuts()` function. For more details, see [Default Shortcuts](https://github.com/James7304/multiple-document-interface/blob/main/README.md#default-shortcuts).

### Actions
When undoing or redoing, an action is undone/redone. To define when an action has occured, call `done_action()`. This will effectivley take a screen shot of the active tab, so that it can be referred back to later in the document.

### Events
When the undoing or redoing functions are used, any events added to elements in the tabs must be added using the function `giveEvent(el, eventType, handler)`, otherwise these elements may lose their events assigned to them. When using the `giveEvent()` function, ensure that the element that is having the event given to it, is already in a tab, otherwise an error warning will occur.

**Example**
```
const input = document.createElement('button');
input.innerText = "Add Text";
input.setAttribute('style', 'margin:10px;');

createTab({content:input, name:'My Second Tab'});

var put = 1;
giveEvent(input, 'click', ()=>{
    const h1 = document.createElement('h1');
    h1.innerText = put + ". This can be undone and redone, try it out (Ctrl + Z/Ctrl + Y)";
    put++;
    getActiveTabSection().appendChild(h1);

    doneAction();
});
```
*In the example, notice how the `done_action()` function is called as we are changing the contents of the tab.*

## Saving Functionality
*Note: Currently, files can only be downloaded to the device, a saving stream has not yet been implemented, nor has compatibility with any cloud APIs, however this is something that will be implemented in the future.*

### Save Validation
When tabs are attempted to be closed by the user, there is an option of having save validation (i.e. a dialog box appears requesting that the user save their progress on the file). This can be toggled on/off via the following functions. The *changesTo* functions should be used when the user first makes changes to the file after having saved it or loaded it into the app. The *TabSaved* functions should rarely/not be used as they are already implemented when the tab gets saved by this library.

*Note: All parameters of tabid is the individual ID given to each tab. For more details, see [Creating Tabs](https://github.com/James7304/multiple-document-interface/blob/main/README.md#creating-tabs).

| function      | action |
| ---            | ---            |
| changesToActiveTab() | toggles save validation **on** for the active tab |
| changesToTab(tabid) | toggles save validation **on** for the target tab |
| activeTabSaved() | toggles save validation **off** for the active tab |
| tabSaved(tabid) | toggles save validation **of** for the target tab |

### Creating a Save As Dialog
A save as dialog can be created by calling the function `createSavingDialog(docCollection=appInfo.defaultDocumentCollection, tabid=getActiveTabId())`. The parameters are as follows.
| createSavingDialog      |  |  |
| ---            | ---            | ---            |
| parameter | default value | use |
| docCollection | appInfo.defaultDocumentCollection | defines the method that should be used to collect to data of the target tab |
| tabid | getActiveTabId() | ID of the target tab that is to be saved |

**Example**
```
createSavingDialog(canvasToPNG, getActiveTabId());
```

## Default Shortcuts
There are default shortcuts available to be used. Simply call `giveShortcuts()` to quickly get started with them. The default shortcuts are as follows.

| Attribute      | Ctrl  | Shft  | Key  |
| ---            | ---            | ---            | ---            |
| undo | true | false | 'z' |
| redo | true | true | 'z' |
| redo | true | false | 'y' |
| closeTab | true | false | 'q' |
| newTab | true | false | 'b' |
| save | true | false | 's' |

`giveShortcuts()` also can take in one parameter - `giveShortcuts(args)` to override any specific actions. The format for the object is as follows.
```
args = {
    attr1:[{ctrl:`true/false`, shft:`true/false`, key:`'letter'`}, ...],
    ...
}
```
*In words: Each of the five attributes (undo, redo, closeTab, newTab and save) has a array of shortcut objects that can be used to activate it. The shortcut object contains the parameters ctrl, shft and key.*


## App Information
The global variable `appInfo` contains information about the app that can be accessed anywhere. It is an object and the default values are as follows.

| Attribute      | Value | Description     |
| ---            | ---            | ---            |
| dialogTitle | "Click to continue" | the title given on dialog boxes |
| defaultTabContent | "" | the default content given to tabs when created dynamically using `createTab()` |
| defaultDocumentCollection | ()=>{return getActiveTabSection().innerHTML;} | the default function used for collecting the data in the tab when saving the file |
| defaultFileType | "html" | the default function file extension used when saving the file |

To change any of these values, use the function `giveAppInfo(args)` and as a parameter pass an object containing any of the attributes above, these attributes will then be changed in `appInfo`.

**Example**
```
giveAppInfo({
    dialogTitle:'vectorex.net',
    defaultDocumentCollection:fileToXML(),
    defaultFileType:'xml'
});
```

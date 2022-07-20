# Multiple Document Interface
This project is an interface for a MDI (Multiple Document Interface) app. It includes features such as a tabbed UI, the ability to dynamically add tabs and change tab content, the ability to save documents, saving validation, and undo and redo functions.

## Usage
### Source
Download the source code from GitHub and put it into your site.

Add `mdi-styles.css` into the `<head>` tag.
```
<link href="./mdi-styles.css" rel="stylesheet">
```

Add `mdi-main.js` at the end of the `<body>` tag.
```
<script src="./mdi-main.js" type="text/javascript"></script>
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
To dynamically create a tab using Javascript, use the `createTab(args)` function.
`createTab(args)` has the following default parameter attributes.

| Attribute      | Value | Description     |
| ---            | ---                  | ---                                                                                                    |
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

## Undo and Redo Functions
### Undo and Redo
To undo an action, simply call `undo_action()`. Similiary, to redo an action, call `redo_action()`. These are usually implented when the user clicks an undo/redo button or uses a shortcut like Ctrl + Z/Ctrl + Shft + Z. These default shortcuts can be activated using the `giveShortcuts()` function. For more details, see [Default Shortcuts](#Default Shortcuts).

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
    h1.innerText = put;
    put++;
    getActiveTabSection().appendChild(h1);

    doneAction();
});
```
*In the example, notice how the `done_action()` function is called as we are changing the contents of the tab.*

## Saving Functionality
### Creating a Save As Dialog

### Using Cloud APIs


## Default Shortcuts


## App Information


## Unique IDs








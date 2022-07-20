# Multiple Document Interface
This project is an interface for a MDI (Multiple Document Interface) app. It includes features like a tabbed UI, the ability to dynamically add tabs and change tab content, the ability to create custom save functions before closing tabs and undo and redo functions.

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
To initially create tabs in your .html file, add the following.
```
<div class="tabs" data-type="tabs">
    <div data-type="tab-bar">
        <ul data-type="tab-holder">
            ==<li>My First Tab</li>
            <li>My Second Tab</li>==
        </ul>
    </div>
    <div data-type="tab-content">

    </div>
</div>
```

### Dynamically creating tabs


## Style Customisation
### Tabs

### Tab Content


## Undo and Redo Functions
### Undo

### Redo

### Actions

### Events


## Saving Functionality
### Creating a Save As Dialog

### Using Cloud APIs


## Getting and Setting Tab Content


## Default Shortcuts


## App Information


## Unique IDs








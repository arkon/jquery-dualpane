# jquery-dualpane

A simple, lightweight jQuery plugin for creating a dual-pane view.


## Installation

Simply include the script on the page that you'd like to use it (after the jQuery library):

```HTML
<script src='/path/to/jquery.dual[ane.min.js'></script>
```

Also remember to add the stylesheet for some default goodness:

```HTML
<link href='/path/to/jquery.dualpane.css'>
```


## Usage

In your HTML, you need to have some element with exactly 2 nested `<div>`s:

```HTML
<div id='my-selector'>
    <div>Left pane</div>
    <div>Right pane</div>
</div>
```

You can then dualpane-ify it by doing this:

```JavaScript
$('#my-selector').dualpane();
```


## Options

### leftColWidth

**Default**: 0.5 *(i.e. 50%)*

A decimal or integer value representing the initial width of the left column. If it's a decimal, it will be evaluated as a percentage value (of the parent element's width). If it's an integer, it is used as an exact pixel amount.


### rightColWidth

**Default**: none

**Note**: If this option is present, it overrides `leftColWidth`!

A decimal or integer value representing the initial width of the right column. If it's a decimal, it will be evaluated as a percentage value (of the parent element's width). If it's an integer, it is used as an exact pixel amount.


### limit

**Default**: 100 *(i.e. 100px)*

An integer value representing the number of pixels that the panes should keep at the very least at the left/right gutters.


## Examples

Initial left column width of 25%:

```JavaScript
$('#my-selector').dualpane({
    leftColWidth: 0.25
});
```

Initial right column width of 300px, with a gutter limit of 50px:

```JavaScript
$('#my-selector').dualpane({
    rightColWidth: 300
    limit: 50
});
```

# collidify
collidify is a jQuery plugin that handles jQuery UI draggable collision events, such as revert, collide, and border.

# Introduction
During the process of working one of my projects, I really wanted to have draggable elements around a countainer, but revert back if invalid. Some libraries worked decently, but still overflowed outside of containers, or weren't very intuitive. I sought to solve this issue and make collision and revert events easier in jQuery. 

> This plugin is a work in progress, and am adding more features and accessibility optiions.

# Documentation
collidify requires you to have jQuery and jQuery UI in order to properly use the plugin! 

jQuery CDN Links:<br>
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
```

To use collidify, just use `element.collidify()`!

```js
//Collidify Function - Turns the element into a draggable with no arguments
$('.draggable').collidify()

/*
*   The first parameter is the collision options, 
*   which I will list all of them below.
*
*   The second parameter is the draggable options,
*   those which are applied to $('.draggable').draggable()
*/

// $(element).collidify(collisionOptions, draggableOptions)
$('.draggable').collidify({ collides: [ $('.collider') ] },
                          { containment: $('.container') } )

// More detailed docs and examples coming soon!!!
```

# Options

```js
collides: [], // Lists the items that the element will trigger collision events with
revert:   [], // Lists the items that the element will revert position if dragged over
border:   [], // Lists the items that that will receive a border when the element is dragged over
onCollide() {}, //Triggers whenever an element collides with a listed element. TRIGGERS ON DRAG!
onRevert()  {}, //Triggers whenever an element is reverted from a listed element
onBorder()  {}, //Triggers whenever a listed element receives a border
onBorderRemove() {}, //Triggers whenever a listed element loses a border
onCollideEnter() {}, //Triggers once the element has entered the bounds of a listed element
onCollideLeave() {}, //Triggers once the element has left the bounds of a listed element
borderStyle: "2px dashed blue", //The style for border events
borderClass: ".border" //A class for border events
```
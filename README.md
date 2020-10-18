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

**Using Collidify:**

```js
/** $(element).collidify() 
 *  Does not require any parameters.
 *  Using no parameters turns an element into a draggable.
 */
$('.draggable').collidify()

/*
*   The first parameter is the collision options, 
*   which I will list all of them below.
*
*   The second parameter is the draggable options,
*   those which are applied to $('.draggable').draggable()
*/

// Usage:
$(element).collidify(collisionOptions, draggableOptions)

// Example:
$('.draggable').collidify({ collides: [ $('.collider') ] },
                          { containment: $('.container') } )

```

So what kinds of things can you do with collidify?

Example 1: Adding a border when dragged over
```js
var options = {
    border: [ $('.border') ]
}

$('.draggable').collidify(options);
```

Example 2: Reverting an element when dragged and dropped
(Invalid droppable)
```js
var options = {
    revert: [ $('.invalid') ]
}

$('.draggable').collidify(options);
```

Example 3: Triggering an event when collision is detected
```js
var options = {
    collides: [ $('.collide') ],
    onCollideEnter: function() {
        console.log("Collision!");
    }
}

$('.draggable').collidify(options);
```

Example 4: Changing border colors, and logging when the border is removed
```js
var options = {
    border: [ $('.collide') ],
    borderStyle: "2px dashed blue",
    onBorderRemove: function() {
        console.log("Border Removed!");
    }
}

$('.draggable').collidify(options);
```

Example 5: Mix and Match events!
```js
var options = {
    revert: [ $('.invalid') ],
    collides: [ $('.invalid') ],
    onCollideEnter: function() {
        console.log("Entered Collision");
    },
    onRevert: function() {
        console.log("Reverted!");
    }
}

$('.draggable').collidify(options);
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
borderClass: ".border", //A class for border events

// You may use the jquery start, drag, and end events in the second parameter, 
// but if you want to keep code concise, you can use the following events as well!
onStart() {}, // Triggers when dragging starts (used in the first parameter)
onDrag() {}, // Triggers when dragging (used in the first parameter)
onEnd() {}, // Triggers when dragging ends (used in the first parameter)


```
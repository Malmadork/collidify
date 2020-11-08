(function( $ ) {

    $.fn.collidify = function( collisionOptions, draggableOptions) {
        
        var CollisionOptions = $.extend( {}, $.fn.collidify.CollisionOptions, collisionOptions );
        var DraggableOptions = $.extend( {}, $.fn.collidify.DraggableOptions, draggableOptions );

        
       
        var events = {
            start: function() {
                if($.fn.collidify.CollisionItems.length > 0) {
                    $.fn.collidify.CollisionItems.forEach(item => {
                        item.position.originalPosition.top = $(this).offset().top;
                        item.position.originalPosition.left = $(this).offset().left;
                        item.position.originalPosition.bottom = $(this).offset().top + $(this).height();
                        item.position.originalPosition.right = $(this).offset().left + $(this).width(); 
                    }) 
                }
                if($.fn.collidify.BorderItems.length > 0) {
                    $.fn.collidify.BorderItems.forEach(item => {
                        item.position.originalPosition.top = $(this).offset().top;
                        item.position.originalPosition.left = $(this).offset().left;
                        item.position.originalPosition.bottom = $(this).offset().top + $(this).height();
                        item.position.originalPosition.right = $(this).offset().left + $(this).width(); 
                    }) 
                }
                if($.fn.collidify.RevertItems.length > 0) {
                    $.fn.collidify.RevertItems.forEach(item => {
                        item.position.originalPosition.top = $(this).offset().top;
                        item.position.originalPosition.left = $(this).offset().left;
                        item.position.originalPosition.bottom = $(this).offset().top + $(this).height();
                        item.position.originalPosition.right = $(this).offset().left + $(this).width(); 
                    }) 
                }
                CollisionOptions.onStart();
            },
            drag: function() {
                CollisionOptions.onDrag();

                if($.fn.collidify.CollisionItems.length > 0) {
                    $.fn.collidify.CollisionItems.forEach(item => {

                        item.position.newPosition.top = $(this).offset().top;
                        item.position.newPosition.left = $(this).offset().left;
                        item.position.newPosition.bottom = $(this).offset().top + $(this).height();
                        item.position.newPosition.right = $(this).offset().left + $(this).width(); 

                        if($.fn.collidify.hasCollision(item.element, item.type, item.position)) {
                            if(CollisionOptions.onCollide) CollisionOptions.onCollide();

                            if(!item.isColliding) {
                                if(CollisionOptions.onCollideEnter) CollisionOptions.onCollideEnter();
                                item.isColliding = true;
                            }

                        }
                        else if(item.isColliding) {
                            if(CollisionOptions.onCollideLeave) CollisionOptions.onCollideLeave();
                            item.isColliding = false
                        }
                    }) 
                }
                if($.fn.collidify.BorderItems.length > 0) {
                    $.fn.collidify.BorderItems.forEach(item => {
                        //if(item.borderStyle) console.log(item.borderStyle)
                        let borderStyle = item.borderStyle
                        

                        item.position.newPosition.top = $(this).offset().top;
                        item.position.newPosition.left = $(this).offset().left;
                        item.position.newPosition.bottom = $(this).offset().top + $(this).height();
                        item.position.newPosition.right = $(this).offset().left + $(this).width(); 

                        if($.fn.collidify.hasCollision(item.element, item.type, item.position)) {
                            
                            if(!item.isColliding) {
                                item.isColliding = true;
                                if(CollisionOptions.onBorder) CollisionOptions.onBorder();
                                item.element.css({border: borderStyle})
                            }
                            

                        }
                        else if(item.isColliding) {
                            if(CollisionOptions.onBorderRemove) CollisionOptions.onBorderRemove();
                            item.isColliding = false
                            item.element.css({border: item.preBorderStyle})
                        }
                    }) 
                }

                if($.fn.collidify.RevertItems.length > 0) {
                    $.fn.collidify.RevertItems.forEach(item => {
                        item.position.newPosition.top = $(this).offset().top;
                        item.position.newPosition.left = $(this).offset().left;
                        item.position.newPosition.bottom = $(this).offset().top + $(this).height();
                        item.position.newPosition.right = $(this).offset().left + $(this).width();
                    });
                }

            },
            stop: function() {

                if($.fn.collidify.RevertItems.length > 0) {
                    $.fn.collidify.RevertItems.forEach(item => {
                        if($.fn.collidify.hasCollision(item.element, item.type, item.position)) {
                            $(this).offset({top:item.position.originalPosition.top, left:item.position.originalPosition.left})
                                if(CollisionOptions.onRevert) CollisionOptions.onRevert()
                            item.element.css("border", item.preBorderStyle)
                        }
                    })
                }
    
                CollisionOptions.onEnd();
            }
        }

        var eventopts = $.extend( {}, DraggableOptions, events );
        

        if($.ui === undefined || !$.ui.version) {
            return console.error("collidify.js requires jquery.ui to function!")
        }
        else {
            if(CollisionOptions.collides) {
                if(Array.isArray(CollisionOptions.collides)) {
                    if(CollisionOptions.collides.length > 0) {
                        CollisionOptions.collides.forEach(item => {
                            
                            let obj = (typeof item === 'object' && item.selector) ? 
        {
            type: (CollisionOptions.type !== undefined) ? CollisionOptions.type : "enter",
            element: item,
            position: {
                originalPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                newPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }
            },
            isColliding: false
        } : ((item.element && typeof item.element === 'object' && item.element.selector) ?
        {
            type: (item.type != undefined) ? item.type : (CollisionOptions.type !== undefined) ? CollisionOptions.type : "enter",
            element: item.element,
            position: {
                originalPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                newPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }
            },
            isColliding: false
        } : null);

                            if(obj !== null) $.fn.collidify.CollisionItems.push(obj)
                        })
                    }
                }
                else {
                    let obj = {
                        type: (CollisionOptions.type !== undefined) ? CollisionOptions.type : "enter",
                        element: CollisionOptions.collides,
                        position: {
                            originalPosition: {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            },
                            newPosition: {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            }
                        },
                        isColliding: false
                    }
                    if(obj !== null) $.fn.collidify.CollisionItems.push(obj)
                }
            }
            if(CollisionOptions.border) {
                if(Array.isArray(CollisionOptions.border)) {
                    if(CollisionOptions.border.length > 0) {
                        CollisionOptions.border.forEach(item => {
                            
                            let obj = (typeof item === 'object' && item.selector) ? 
        {
            type: (CollisionOptions.type !== undefined) ? CollisionOptions.type : "enter",
            element: item,
            position: {
                originalPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                newPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }
            },
            preBorderStyle: item.css("border"),
            borderStyle: CollisionOptions.borderStyle ? CollisionOptions.borderStyle :
                collisions.borderClass ? $(collisions.borderClass).css("border") :
                "1px solid red",
            isColliding: false
        } : ((item.element && typeof item.element === 'object' && item.element.selector) ?
        {
            type: (item.type != undefined) ? item.type : (CollisionOptions.type !== undefined) ? CollisionOptions.type : "enter",
            element: item.element,
            position: {
                originalPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                newPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }
            },
            preBorderStyle: item.element.css("border"),
            borderStyle: ( item.borderStyle ? item.borderStyle : 
                CollisionOptions.borderStyle ? CollisionOptions.borderStyle :
                collisions.borderClass ? $(collisions.borderClass).css("border") :
                "1px solid red"),
            isColliding: false
        } : null);

                            if(obj !== null) $.fn.collidify.BorderItems.push(obj)
                        })
                    }
                }
                else {
                    let obj = {
                        type: (CollisionOptions.type !== undefined) ? CollisionOptions.type : "enter",
                        element: CollisionOptions.border,
                        position: {
                            originalPosition: {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            },
                            newPosition: {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            }
                        },
                        preBorderStyle: CollisionOptions.border.css("border"),
                        borderStyle: CollisionOptions.borderStyle ? CollisionOptions.borderStyle :
                collisions.borderClass ? $(collisions.borderClass).css("border") :
                "1px solid red",
                        isColliding: false
                    }
                    if(obj !== null) $.fn.collidify.BorderItems.push(obj)
                }
            }
            if(CollisionOptions.revert) {
                if(Array.isArray(CollisionOptions.revert)) {
                    if(CollisionOptions.revert.length > 0) {
                        CollisionOptions.revert.forEach(item => {
                            
                            let obj = (typeof item === 'object' && item.selector) ? 
        {
            type: (CollisionOptions.type !== undefined) ? CollisionOptions.type : "enter",
            element: item,
            position: {
                originalPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                newPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }
            },
            preBorderStyle: item.css("border"),
            isColliding: false
        } : ((item.element && typeof item.element === 'object' && item.element.selector) ?
        {
            type: (item.type != undefined) ? item.type : (CollisionOptions.type !== undefined) ? CollisionOptions.type : "enter",
            element: item.element,
            position: {
                originalPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                newPosition: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }
            },
            preBorderStyle: item.element.css("border"),
            isColliding: false
        } : null);

                            if(obj !== null) $.fn.collidify.RevertItems.push(obj)
                        })
                    }
                }
                else {
                    let obj = {
                        type: (CollisionOptions.type !== undefined) ? CollisionOptions.type : "enter",
                        element: CollisionOptions.revert,
                        position: {
                            originalPosition: {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            },
                            newPosition: {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            }
                        },
                        preBorderStyle: CollisionOptions.revert.css("border"),
                        isColliding: false
                    }
                    if(obj !== null) $.fn.collidify.RevertItems.push(obj)
                }
            }
            
            return this.draggable(eventopts)
        }
    }

    $.fn.collidify.CollisionOptions = {
        onStart: function() {

        },
        onDrag: function() {

        },
        onEnd: function() {

        },
        onCollide: function() {

        },
        onRevert: function() {

        },
        onBorder: function() {

        }, 
        onBorderRemove: function() {

        }, 
        onCollideEnter: function() {

        }, 
        onCollideLeave: function() {

        },
    };
    $.fn.collidify.DraggableOptions = {
        start: function() {

        },
        drag: function() {

        },
        stop: function() {

        }
    };

    $.fn.collidify.CollisionItems = [];
    $.fn.collidify.BorderItems = [];
    $.fn.collidify.RevertItems = [];

    $.fn.collidify.hasCollision = (item, type, position) => {
        let result = false;

        

        let boundElement = (typeof item === 'object' && item.selector) ? 
        item : ((item.element && typeof item.element === 'object' && item.element.selector) ?
        item.element : null);

        let boundType = type;
        if(boundElement !== null) {
            
                boundElement.each(function(i, obj) {
                    
                    let obj_offset = $(obj).offset()
                let w = $(obj).width();
                let h = $(obj).height();
                let pos = position.newPosition;
          
                if(boundType == "enter") {
                    if (pos.left < obj_offset.left + w &&
                        pos.right  > obj_offset.left &&
                        pos.top < obj_offset.top + h &&
                        pos.bottom > obj_offset.top) {
                        
                            result = true;
                        
                    }
                }
                else if(boundType == "inside") {
                    if (pos.right < obj_offset.left + w &&
                        pos.left  > obj_offset.left &&
                        pos.bottom < obj_offset.top + h &&
                        pos.top > obj_offset.top) {
                        
                            result = true;
                    }
                }
                
                })
            }

    return result;
    }

}( jQuery ));
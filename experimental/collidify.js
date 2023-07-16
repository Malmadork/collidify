(function( $ ) {

    $.fn.collidify = function( collisionOptions, draggableOptions) {
        
        // Applies the Collision and Draggable options to the element.
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
                if($.fn.collidify.StyleItems.length > 0) {
                    $.fn.collidify.StyleItems.forEach(item => {
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
                if($.fn.collidify.StyleItems.length > 0) {
                    $.fn.collidify.StyleItems.forEach(item => {
                        //console.log(item)

                        item.position.newPosition.top = $(this).offset().top;
                        item.position.newPosition.left = $(this).offset().left;
                        item.position.newPosition.bottom = $(this).offset().top + $(this).height();
                        item.position.newPosition.right = $(this).offset().left + $(this).width(); 

                        if($.fn.collidify.hasCollision(item.element, item.type, item.position)) {
                            
                            if(!item.isColliding) {
                                item.isColliding = true;
                                if(CollisionOptions.onStyle()) CollisionOptions.onStyle();

                                // FIX THIS PLEASE
                                // THIS DONT WORK
                                // AHHHHHHHHHHHHH
                                // It probably needs two for loops or something. not changing styles.


                                if(Array.isArray(item.postStyle)) {
                                    item.postStyle.forEach( (s) => {
                                        //console.log(s);
                                        let obj = {};
                                        obj[s.postStyle.css] = istem.postStyle.style;
                                        s.element.css(obj)
                                    })
                                }
                                else {
                                    let obj = {};
                                    obj[item.postStyle.css] = item.postStyle.style;
                                    item.element.css(obj)
                                }
                                
                            }
                            

                        }
                        else if(item.isColliding) {
                            if(CollisionOptions.onStyleRemove()) CollisionOptions.onStyleRemove();
                            item.isColliding = false
                            // item.element.css({border: item.preBorderStyle})

                            // FIX THIS PLEASE
                            // THIS DONT WORK
                            // AHHHHHHHHHHHHH
                            // It probably needs two for loops or something. not changing styles.

                            if(Array.isArray(item.preStyle)) {
                                item.preStyle.forEach( (s) => {
                                    //console.log(s);
                                    let obj = {};
                                    obj[s.preStyle.css] = s.preStyle.style;
                                    s.element.css(obj)
                                })
                            }
                            else {
                                let obj = {};
                                obj[item.preStyle.css] = item.preStyle.style;
                                item.element.css(obj)
                            }
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
                                if(CollisionOptions.onRevert) CollisionOptions.onRevert();
                                if(item.preStyle && item.preStyle != null && item.preStyle.css != null && Array.isArray(item.preStyle.css)) {
                                    item.preStyle.forEach( (s) => {

                                        // FIX THIS PLEASE
                                        // THIS DONT WORK
                                        // AHHHHHHHHHHHHH

                                         // It probably needs two for loops or something. not changing styles.
                                        
                                        let obj = {};
                                        obj[s.preStyle.css] = s.preStyle.style;
                                        s.element.css(obj)
                                    })
                                }
                                else if(item.preStyle && item.preStyle != null && item.preStyle.css != null && !Array.isArray(item.preStyle.css)) {
                                    //if(item.preStyle.css && item.preStyle.css != null) {
                                        let obj = {};
                                        obj[item.preStyle.css] = item.preStyle.style;
                                        item.element.css(obj)
                                    //}
                                }
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
            if(CollisionOptions.style) {
                if(Array.isArray(CollisionOptions.style)) {
                    if(CollisionOptions.style.length > 0) {
                        CollisionOptions.style.forEach(item => {
                            //console.log(item);
                            
                            let obj = (item.element && typeof item.element === 'object' && item.element.selector &&
                                       item.css && item.style && !Array.isArray(item.style) && !Array.isArray(item.css)) ? 
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
            preStyle: {
                type: (item.type ? item.type : "enter"),
                css: item.style,
                style: item.element.css(item.css)
            },
            postStyle: {
                type: (item.type ? item.type : "enter"),
                css: item.css,
                style: item.style
            },
            isColliding: false
        } : ((item.element && typeof item.element === 'object' && item.element.selector && 
              item.css && item.style && Array.isArray(item.style) && Array.isArray(item.css) && item.css.length == item.style.length) ?
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
            preStyle: {
                type: (item.type ? item.type : "enter"),
                css: item.css,
                style: []
            },
            postStyle: {
                type: (item.type ? item.type : "enter"),
                css: item.css,
                style: item.style
            },
            isColliding: false
        } : null);

                            if(obj !== null) {
                                if(Array.isArray(obj.preStyle.css)) {
                                    item.css.forEach( (key) => {
                                        obj.preStyle.style.push(obj.element.css(key));
                                    })
                                }
                                
                                $.fn.collidify.StyleItems.push(obj)
                            }
                        })
                    }
                }
                else if(typeof CollisionOptions.style === 'object') {

                    let obj = null;

                    if(CollisionOptions.style.css && CollisionOptions.style.style && 
                        Array.isArray(CollisionOptions.style.style) && Array.isArray(CollisionOptions.style.css) && 
                        CollisionOptions.style.css.length == CollisionOptions.style.style.length) {
                            obj = {
                                type: (CollisionOptions.style.type !== undefined) ? CollisionOptions.type : "enter",
                                element: CollisionOptions.style.element,
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
                                preStyle: {
                                    type: (CollisionOptions.style.type ? CollisionOptions.style.type : "enter"),
                                    css: CollisionOptions.style.css,
                                    style: []
                                },
                                postStyle: {
                                    type: (CollisionOptions.style.type ? CollisionOptions.style.type : "enter"),
                                    css: CollisionOptions.style.css,
                                    style: CollisionOptions.style.style
                                },
                                isColliding: false
                            }
                        }
                        else if(CollisionOptions.style.css && CollisionOptions.style.style && 
                            !Array.isArray(CollisionOptions.style.style) && !Array.isArray(CollisionOptions.style.css)) {
                            obj = {
                                type: (CollisionOptions.style.type !== undefined) ? CollisionOptions.type : "enter",
                                element: CollisionOptions.style.element,
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
                                preStyle: {
                                    type: (CollisionOptions.style.type ? CollisionOptions.style.type : "enter"),
                                    css: CollisionOptions.style.css,
                                    style: CollisionOptions.style.element.css(CollisionOptions.style.css)
                                },
                                postStyle: {
                                    type: (CollisionOptions.style.type ? CollisionOptions.style.type : "enter"),
                                    css: CollisionOptions.style.css,
                                    style: CollisionOptions.style.style
                                },
                                isColliding: false
                            }
                        }
                    
                    if(obj !== null) $.fn.collidify.StyleItems.push(obj)
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
            preStyle: null,
            postStyle: null,
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
            preStyle: null,
            postStyle: null,
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
                        preStyle: null,
                        postStyle: null,
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
        onStyle: function() {
            
        },
        onStyleRemove: function() {

        },
        onCollideEnter: function() {

        }, 
        onCollideLeave: function() {

        }

        /** 
         * 
        // DEPRECATED //

        // onBorder: function() {

        // }, 
        // onBorderRemove: function() {

        // }, 

        */
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
    $.fn.collidify.StyleItems = [];
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
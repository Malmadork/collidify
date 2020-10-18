(function( $ ) {
 
    $.fn.collidify = function( cols, draggableopts ) {
 
        var collisions = $.extend( {}, $.fn.collidify.collisions, cols );
        var dragopts = $.extend( {}, $.fn.collidify.dragopts, draggableopts );

        if(collisions.border) {
            if(Array.isArray(collisions.border)) {
                if(collisions.border.length > 0) {
                        
                    $.fn.collidify.preBorderStyles = $.fn.collidify.getPreborderStyles(collisions.border);
                   
                }
            }
            else {
                console.error("OPTIONS.revert must be of type array.")
            }
        }

        var events = {
            start: function() {
                $.fn.collidify.element.originalPosition.top = $(this).offset().top;
                $.fn.collidify.element.originalPosition.left = $(this).offset().left;
                $.fn.collidify.element.originalPosition.bottom = $(this).offset().top + $(this).height();
                $.fn.collidify.element.originalPosition.right = $(this).offset().left + $(this).width(); 
                
                collisions.onStart();

                
                
            },
            drag: function() {
                $.fn.collidify.element.newPosition.top = $(this).offset().top;
                $.fn.collidify.element.newPosition.left = $(this).offset().left;
                $.fn.collidify.element.newPosition.bottom = $(this).offset().top + $(this).height();
                $.fn.collidify.element.newPosition.right = $(this).offset().left + $(this).width(); 
                collisions.onDrag();
                if(collisions.collides) {
                    if(Array.isArray(collisions.collides)) {
                        if(collisions.collides.length > 0) {
                            if($.fn.collidify.checkCollision(collisions.collides)) {
                                if(collisions.onCollide) collisions.onCollide();
                                if(!$.fn.collidify.isCollisionEnter) {
                                    if(collisions.onCollideEnter) collisions.onCollideEnter();
                                    $.fn.collidify.isCollisionEnter = true;
                                    $.fn.collidify.hasCollisionEnterFired = true;
                                }
                                
                            }
                            else if($.fn.collidify.isCollisionEnter){
                                if(collisions.onCollideLeave) collisions.onCollideLeave();
                                $.fn.collidify.isCollisionEnter = false;
                                $.fn.collidify.hasCollisionEnterFired = false;
                            }
                        }
                    }
                    else {
                        console.error("OPTIONS.revert must be of type array.")
                    }
                }

                if(collisions.border) {
                    if(Array.isArray(collisions.border)) {
                        if(collisions.border.length > 0) {
                            if($.fn.collidify.checkCollision( collisions.border)) {


                                
                                let borderStyle = 
                                ( collisions.borderStyle ? collisions.borderStyle : 
                                  collisions.borderClass ? $(collisions.borderClass).css("border") :
                                  "1px solid red");

                                
                                  
                                  var collides = $.fn.collidify.getCollisionItems(collisions.border);
                                  if(collides.length > 0) {
                                    collides.forEach(hover => {
                                        hover.css({border: borderStyle})
                                    })
                                  }
                                
                                if(collisions.onBorder && !$.fn.collidify.hasBorderChangeFired) {
                                    $.fn.collidify.hasBorderChangeFired = true;
                                    collisions.onBorder();
                                } 
                            }
                            else {
                                $.fn.collidify.removeBorder(collisions.border);
                                if(collisions.onBorderRemove && $.fn.collidify.hasBorderChangeFired) {
                                    collisions.onBorderRemove();
                                    $.fn.collidify.hasBorderChangeFired = false;
                                }
                            }
                        }
                    }
                    else {
                        console.error("OPTIONS.revert must be of type array.")
                    }
                }
                        

            },
            stop: function() {

                if(collisions.revert) {
                    if(Array.isArray(collisions.revert) ) {
                        if(collisions.revert.length > 0) {
                            if($.fn.collidify.checkCollision(collisions.revert)) {
                                $(this).offset({top:$.fn.collidify.element.originalPosition.top, left:$.fn.collidify.element.originalPosition.left})
                                if(collisions.onRevert) collisions.onRevert()
                            }
                        }
                    }
                    else {
                        console.error("OPTIONS.revert must be of type array.")
                    }
                }

                collisions.onEnd();
            }
        }
 
        var eventopts = $.extend( {}, dragopts, events );
        
        
        if($.ui === undefined || !$.ui.version) {
            return console.error("collidify.js requires jquery.ui to function!")
        }
        else {
            return this.draggable(eventopts)
        }

        
    };

    $.fn.collidify.collisions = {
        onStart: function() {

        },
        onDrag: function() {

        },
        onEnd: function() {

        },
        onCollide: function() {

        }
    };
    $.fn.collidify.dragopts = {
        start: function() {

        },
        drag: function() {

        },
        stop: function() {

        }
    };

    $.fn.collidify.element = {
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
    }

    $.fn.collidify.checkCollision = function(bounds) {
        let result = false;
        bounds.forEach(bound => {
            if(typeof bound === 'object') {
                if(bound.selector) {
                   bound.each(function(i, obj) {
                    let obj_offset = $(obj).offset()
                    let w = $(obj).width();
                    let h = $(obj).height();
                    let pos = $.fn.collidify.element.newPosition;
              
                    if (pos.left < obj_offset.left + w &&
                        pos.right  > obj_offset.left &&
                        pos.top < obj_offset.top + h &&
                        pos.bottom > obj_offset.top) {
                        
                            result = true;
                        
                    }
                    else {
                    }
                   })
                }
            }
        })

        return result;
    }

    $.fn.collidify.getCollisionItems = function(bounds) {
        let result = [];
        bounds.forEach(bound => {
            if(typeof bound === 'object') {
                if(bound.selector) {
                   bound.each(function(i, obj) {
                    let obj_offset = $(obj).offset()
                    let w = $(obj).width();
                    let h = $(obj).height();
                    let pos = $.fn.collidify.element.newPosition;
              
                    if (pos.left < obj_offset.left + w &&
                        pos.right  > obj_offset.left &&
                        pos.top < obj_offset.top + h &&
                        pos.bottom > obj_offset.top) {
                        
                            result.push(bound);
                        
                    }
                   })
                }
            }
        })

        return result;
    }

    $.fn.collidify.removeBorder = function(bounds) {
        bounds.forEach(bound => {
            if(typeof bound === 'object') {
                if(bound.selector) {
                   bound.each(function(i, obj) {
                    let obj_offset = $(obj).offset()
                    let w = $(obj).width();
                    let h = $(obj).height();
                    let pos = $.fn.collidify.element.newPosition;
              
                    if (pos.left < obj_offset.left + w &&
                        pos.right  > obj_offset.left &&
                        pos.top < obj_offset.top + h &&
                        pos.bottom > obj_offset.top) {
                        
                           
                        
                    }
                    else {
                        
                        for(var i = 0; i < $.fn.collidify.preBorderStyles.length;i++) {
                            var style = $.fn.collidify.preBorderStyles[i].style;
                            if(style !== $.fn.collidify.preBorderStyles[i].element.css("border")) {
                                $.fn.collidify.isBorderChange = true;
                            }
                            else {
                                $.fn.collidify.isBorderChange = false;
                            }
                            $.fn.collidify.preBorderStyles[i].element.css({border: style})
                            
                        }
                        
                    }
                   })
                }
            }
        })
    }

    $.fn.collidify.getPreborderStyles = function(bounds) {
        let result = [];
        bounds.forEach(bound => {
            if(typeof bound === 'object') {
                if(bound.selector) {
                   bound.each(function(i, obj) {
                        result.push({
                            element: $(obj),
                            style: $(obj).css("border")
                        })
                   })
                }
            }
        })

        return result;
    }

    $.fn.collidify.preBorderStyles = [];
    $.fn.collidify.isBorderChange = false;
    $.fn.collidify.hasBorderChangeFired = false;
    $.fn.collidify.isCollisionEnter = false;
    $.fn.collidify.hasCollisionEnterFired = false;
      
 
}( jQuery ));
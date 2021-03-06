/**
 * @author thatcher
 */
(function($, $M){ 
    
    var log;
    
    $M.Guides = function(options){
        $.extend(true, this, options, $.model('guides', {
            $id:{
                not:[null],
                msg:'$id must be defined'
            },
            description:{
                not:[null],
                msg:'please provide a description'
            },
            deprecated:{
                msg:'last version for which this entry was valid'
            },
            deleted:{
                pattern:/^[0-9]{1,32}$/,
                msg:'timestamp when record was removed'
            },
            examples:{
                not:[null],
                msg:'please provide an example'
            },
            name:{
                pattern:/^[\w]{1,64}$/,
                not:[null],
                msg:'please provide a short name'
            },
            order:{
                pattern:/^[0-9]{1,32}$/,
                'default': 0
            },
            page:{
                pattern:/^[\w]{1,64}$/,
                not:[null],
                msg:'please provide a name this entry will belond to.'
            },
            version:{
                references: '#releases',
                not:[null],
                msg:'please select a valid release id'
            }
        }));
        log = $.logger('EnvJS.Models.Guides');
    };
    
    $.extend( $M.Guides.prototype, {
        all:function(callback){
            var _this = this;
            this.find({
                async:false,
                select:"new Query('guides').addSort('order')",
                success:function(results){
                    log.debug('loaded all %s guides', results.data.length );
                    callback(results.data);
                },
                error: function(xhr, status, e){
                    log.error('failed to load all guides. (%s)', status).
                        exception(e);
                    callback([_this.template({
                        $id:'404',
                        description:'failed to load guides. ('+status+')'
                    })]);
                }
            });
        },
        currentPages:function(callback){
            var _this = this;
            this.find({
                async:false,
                select:"new Query('guides').addFilter('deleted', $EQUAL, '').addSort('order')",
                data: ['$id', 'page', 'name'],
                success:function(results){
                    log.debug('loaded all %s guides', results.data.length );
                    callback(results.data);
                },
                error: function(xhr, status, e){
                    log.error('failed to load all guides. (%s)', status).
                        exception(e);
                    callback([_this.template({
                        $id:'404',
                        description:'failed to load guides. ('+status+')'
                    })]);
                }
            });
        },
        current:function(callback){
            var _this = this;
            this.find({
                async:false,
                select:"new Query('guides').addFilter('deleted', $EQUAL, '').addSort('order')",
                success:function(results){
                    log.debug('loaded all %s guides', results.data.length );
                    callback(results.data);
                },
                error: function(xhr, status, e){
                    log.error('failed to load all guides. (%s)', status).
                        exception(e);
                    callback([_this.template({
                        $id:'404',
                        description:'failed to load guides. ('+status+')'
                    })]);
                }
            });
        },
        forVersion: function(version , callback){
            var _this = this;
            log.debug('getting guides for version %s', version );
            this.find({
                async: false,
                select:"new Query('guides').addFilter('version', $EQUAL, '"+version+"').addSort('order')",
                success: function(results){
                    log.debug('found apis for %s', version );
                    callback(results.data);
                },
                error:function(xhr, status, e){
                    log.error('failed to find api for version %s', version);
                    callback(_this.template({
                        $id:'404',
                        version: version,
                        description:'failed to load apis for version'+version
                    }));
                }
            });
        },
        template: function(options){
            log.debug('generating template guide entry');
            return $.extend({
                $id:'running-newentry',
                description:'Please provide a description.',
                deprecated:'',
                deleted:'',
                examples:'',
                name:'newentry',
                order:'99',
                page:'running',
                version:['1.0.x', '1.1.rc2', '1.2.11']
            }, options );
        }
    });
    
})(jQuery, EnvJS.Models);
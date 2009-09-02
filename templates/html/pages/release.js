<e4x>
	{extend("html/base.js")}
    <block id='main'>
        <div id='release'>
            <h3><a href={$.env('root')+'releases'}>&lt; releases</a></h3>
            <div class='first column span-5 colborder'>
                <h4>{_$.release.name}</h4>
                <h5>
                    <a href={$.env('root')+'doc/guide-'+_$.release.id}>
                        Getting Started
                    </a>
                </h5>
                <h5>
                    <a href={$.env('root')+'doc/api-'+_$.release.id}>
                        API
                    </a>
                </h5>
                <em>Release</em><br/>
                <span>Envjs {_$.release.id}</span> 
            </div>
             
            <div id='cover' 
                 class='column span-6 colborder'>
                    {(function(){
                        return _.e4x([
                            {a:{
                                $href:this.zip,
                                img:{ 
                                    $src:$.env('root')+'images/zip.jpg',
                                    $alt:'zip',
                                    $height:'70px'
                                }
                            }},
                            {a:{
                                $href:this.tar,
                                img:{ 
                                    $src:$.env('root')+'images/tar.jpg',
                                    $alt:'tar',
                                    $height:'70px'
                                }
                            }}
                        ]);
                    })()}
            </div>
            <div id='media' 
                 class='column span-9'>
                <ol class='clear'>
                    {_('.*', _$.release.artifacts).map(function(index, note){
                        return {li:{$:[
                            {a:{
                                $href:this.url,
                                $:this.label
                            }},
                            _.e4x(this.description)
                        ]}};
                    }).e4x()}
                    
                </ol>
            </div>
            
            <!--/**div  class='this last column small is a box that span-3'>
                <h6>purchase this album</h6>
                <p align='center'>
                    <em>Compact Disc</em><br/>
                    <span id='cost'>$9.00</span>
                    [<a href='cart/add/2'>Buy</a>]
                </p>
            </div*/-->
            <div id='description' class='column span-22'>
                <div class='column span-18 push-3'>
                    {_$.release.description}
                    <div class='column'>
                        <h5>
                            <a href={_$.release.README} target='_blank'>
                                README
                            </a>
                        </h5>
                    </div>
                    <div class='column'>
                        <ul class='clear'>
                            {_('.*', _$.release.notes).map(function(index, note){
                                return {li:note};
                            }).e4x()}
                        </ul>
                    </div>
                    <div class='column'>
                        <strong>jQuery 1.3.2</strong>
                        <img src={'http://chart.apis.google.com/chart'+
                             '?chs=150x75'+
                             '&cht=gom'+
                             '&chd=t:95'+
                             '&chl=1348 of 1420'}/>
                    </div>
                        
                </div>
            </div>
        </div>
    </block>
</e4x> 

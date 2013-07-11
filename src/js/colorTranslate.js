var originalContent;

function translatePixels(){

    var translationMap = [ 
        $('#red').slider( "value" ),
        $('#green').slider( "value" ),
        $('#blue').slider( "value" ),
        $('#alpha').slider( "value" )
        ];

    canvasElement = document.querySelector("#bitmap");
    canvasContext = canvasElement.getContext("2d");
    pixelData = canvasContext.getImageData( 0, 0, canvasElement.width, canvasElement.height );
    
    var noSaturate = $('input#loop').is(":checked");

    
    for(var i=0, len=pixelData.data.length; i < len; i++)
        {
        
        colorIndex = i % 4;
        
        if( noSaturate ){
            // Not using modulo for performance and because it's broken in JavaScript
            pixelData.data[i] = ( origialContent.data[i] + translationMap[ colorIndex ] ) & 255 ;
        }else{
            pixelData.data[i] = Math.min( origialContent.data[i] + translationMap[ colorIndex ], 255 );
        }
        
        }
        
    canvasContext.putImageData( pixelData, 0, 0 );
    }
    
function loadImage( imagepath ){

    if( imagepath === undefined ){
        imagepath = 'img/kitten.jpg';
    }

    baseImage = new Image();
    
    baseImage.onload= function(){

            var canvasElement = document.querySelector("#bitmap");
            var canvasContext = canvasElement.getContext("2d");
            canvasElement.height = baseImage.height;
            canvasElement.width = baseImage.width;
            canvasContext.drawImage( baseImage, 0, 0 );
            
            origialContent = canvasContext.getImageData( 0, 0, canvasElement.width, canvasElement.height );
            
        };
    
    baseImage.src = imagepath;

}
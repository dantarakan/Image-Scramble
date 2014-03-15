/*-----------------Image scramble/unscramble demo-----------
|	Author: Daniil Tarakanov                               |
|	URL: tarakanov.me                                      |
|	GitHub: dantarakan                                     |
|__________________________________________________________|*/

var image;
var imageWidth;

/*----------------Upload and display image-----------*/
/*----------Taken from user KyleMit on SO------------*/
$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
    $('#myImage').attr('src', e.target.result);
};

/*---------------END of image upload--------------*/

function unscramble()
{
	var size = document.getElementById('number').value;
	image=document.getElementById("myImage");
	imageWidth = image.width;
	if(imageWidth>image.height)
	{
		imageWidth = image.height;
	}
	var c=document.getElementById("myCanvas");
	c.width = imageWidth;
	c.height = image.height;
	var ctx=c.getContext("2d");
	initUnscramble(size,c,ctx);
}

function initUnscramble(size,c,ctx)
{
	for(var n = size;n>1;n--)
	{
		ctx.clearRect ( 0 , 0 , imageWidth , imageWidth );
		var width = Math.floor(imageWidth/n);
		var margin = imageWidth - (width*n);
		var angleArray = [];
		var cellNo = n*n;
		var cellCount = 0;
		var angle = 270;
		for(var i=0;i<cellNo;i++)
		{
			angleArray.push(angle);
			if(angle === 90)
			{
				angle=270;
			}
			else
			{
				angle=angle-90;
			}
		}

		var imagePieces = [];

		for(var vert=0; vert<n;vert++)
		{
			for (var hor = 0; hor < n; hor++) {
				var canvas = document.createElement('canvas');
	            canvas.width = width;
	            canvas.height = width;
	            var context = canvas.getContext('2d');
	            context.drawImage(image, hor * width, vert * width, width, width, 0, 0, canvas.width, canvas.height);
	            imagePieces.push(canvas.toDataURL());
			}
		}
		if(margin>0)
		{
			var canvas = document.createElement('canvas');
            canvas.width = margin;
            canvas.height = imageWidth;
            var context = canvas.getContext('2d');
            context.drawImage(image, imageWidth-margin, 0, margin, imageWidth, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
            var bottomCanvas = document.createElement('canvas');
            bottomCanvas.width = imageWidth;
            bottomCanvas.height = margin;
            var bottomContext = bottomCanvas.getContext('2d');
            bottomContext.drawImage(image, 0, imageWidth-margin, imageWidth, margin, 0, 0, bottomCanvas.width, bottomCanvas.height);
            imagePieces.push(bottomCanvas.toDataURL());
		}

		// imagePieces now contains data urls of all the pieces of the image
	    // load one piece onto the page
	    var anImageElement = new Image();
		for(var vert=0; vert<n;vert++)
		{
			for (var hor = 0; hor < n; hor++) {
				anImageElement.src = imagePieces[cellCount];
				var rAngle = angleArray[cellCount];
				drawImageRot(ctx,anImageElement, hor*width, vert*width, width, width, rAngle);
				cellCount++;
			}
		}
		if(margin>0)
		{
			anImageElement.src = imagePieces[imagePieces.length-2];
			ctx.drawImage(anImageElement, imageWidth-margin,0);
			anImageElement.src = imagePieces[imagePieces.length-1];
			ctx.drawImage(anImageElement, 0,imageWidth-margin);
		}
		image.src=c.toDataURL();
	}
}

function scramble()
{
	var size = document.getElementById('number').value;
	image=document.getElementById("myImage");
	imageWidth = image.width;
	if(imageWidth>image.height)
	{
		imageWidth = image.height;
	}
	var c=document.getElementById("myCanvas");
	c.width = imageWidth;
	c.height = image.height;
	var ctx=c.getContext("2d");
	initScramble(size,c,ctx);
}

function initScramble(size,c,ctx)
{
	for(var n = 2;n<=size;n++)
	{
		ctx.clearRect ( 0 , 0 , imageWidth , imageWidth );
		var width = Math.floor(imageWidth/n);
		var margin = imageWidth - (width*n);
		var angleArray = [];
		var cellNo = n*n;
		var cellCount = 0;
		var angle = 90;
		for(var i=0;i<cellNo;i++)
		{
			angleArray.push(angle);
			if(angle === 270)
			{
				angle=90;
			}
			else
			{
				angle=angle+90;
			}
		}

		var imagePieces = [];

		for(var vert=0; vert<n;vert++)
		{
			for (var hor = 0; hor < n; hor++) {
				var canvas = document.createElement('canvas');
	            canvas.width = width;
	            canvas.height = width;
	            var context = canvas.getContext('2d');
	            context.drawImage(image, hor * width, vert * width, width, width, 0, 0, canvas.width, canvas.height);
	            imagePieces.push(canvas.toDataURL());
			}
		}
		if(margin>0)
		{
			var canvas = document.createElement('canvas');
            canvas.width = margin;
            canvas.height = imageWidth;
            var context = canvas.getContext('2d');
            context.drawImage(image, imageWidth-margin, 0, margin, imageWidth, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
            var bottomCanvas = document.createElement('canvas');
            bottomCanvas.width = imageWidth;
            bottomCanvas.height = margin;
            var bottomContext = bottomCanvas.getContext('2d');
            bottomContext.drawImage(image, 0, imageWidth-margin, imageWidth, margin, 0, 0, bottomCanvas.width, bottomCanvas.height);
            imagePieces.push(bottomCanvas.toDataURL());
		}

		// imagePieces now contains data urls of all the pieces of the image
	    // load one piece onto the page
	    var anImageElement = new Image();
		for(var vert=0; vert<n;vert++)
		{
			for (var hor = 0; hor < n; hor++) {
				anImageElement.src = imagePieces[cellCount];
				var rAngle = angleArray[cellCount];
				drawImageRot(ctx,anImageElement, hor*width, vert*width, width, width, rAngle);
				cellCount++;
			}
		}
		if(margin>0)
		{
			anImageElement.src = imagePieces[imagePieces.length-2];
			ctx.drawImage(anImageElement, imageWidth-margin,0);
			anImageElement.src = imagePieces[imagePieces.length-1];
			ctx.drawImage(anImageElement, 0,imageWidth-margin);
		}
		image.src=c.toDataURL();
	}
}


function drawImageRot(ctx,img,x,y,width,height,deg){
	//Convert degrees to radian 
	var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    //reset the canvas  
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}
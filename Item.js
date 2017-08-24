class Item
{
	constructor(url, imgUrl, text)
	{
		this.a = document.createElement("a");
		this.div = document.createElement("div");
		this.img = document.createElement("img");
		this.h1 = document.createElement("h1");

		this.a.setAttribute("target", "_blank");
		this.div.setAttribute("class", "grid-item");
		this.img.setAttribute("class", "grid-image");
		this.h1.setAttribute("class", "grid-text");
		this.setUrl(url);
		this.setText(text);
		this.setImgUrl(imgUrl);

		$("#grid").append(this.a);
		this.a.append(this.div);
		this.div.append(this.h1);
	}

	setUrl(url)
	{
		this.a.href = url;
	}

	setImgUrl(imgUrl)
	{
		if(imgUrl)
		{//set the image if it isn't blank

			//also need to check if supported format e.g. not tiff or svg

			if(this.validFileType(imgUrl))
			{
				this.div.style.backgroundColor = "white";
				this.img.setAttribute("src", imgUrl);
				this.div.append(this.img);
			}
		}

		else
		{//set background color to a radom color
			if(this.div.children.length > 1)
			{//remove img if the div contains one
				this.img.remove();
			}

			this.div.style.backgroundColor = "#"+((1<<24)*Math.random()|0).toString(16);//should probably add a set instead
		}

	}

	setText(text)
	{
		this.h1.textContent = text;
	}

	validFileType(url)
	{//check url file extension
		var valid = ["bmp", "jpg", "jpeg", "png", "gif", "svg"];
		var type = url.split(".");
		type = type[type.length-1];

		for(var i in valid)
		{
			console.log("type : "+type+" i :"+i);
			if(valid[i] == type) return true;
		}

		return false;
	}
}

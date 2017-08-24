$(function(){

	var items = [];

	getRandomArticle(10);

	function addNewItems(num)
	{
		for(var i = 0;i<num;i++)
		{
			items.push(new Item("", "", ""));
		}
	}

	function getArticle(input, num)
	{
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php",
			data: {
				origin: "*",
				format: "json",
				action: "query",
				generator: "search",
				prop: "pageimages|info",
				gsrsearch: input,
				piprop: "original",
				inprop: "url",
				gsrlimit: num
			},

			success: function(data)
			{
				var itemIndex = 0;
				var dat = data.query.pages;

				for(var d in dat)
				{
					var imgUrl = "";
					var url = dat[d].fullurl;
					var title = dat[d].title;

					try
					{
						imgUrl = dat[d].original.source;//Not all links have images
					}

					catch(e){}

					finally
					{
						if(itemIndex >= items.length) addNewItems(1);//add new grid items if needed

						items[itemIndex].setImgUrl(imgUrl);
						items[itemIndex].setUrl(url);
						items[itemIndex].setText(title);
						itemIndex++;
					}
				}
			}
		});
	}

	function getRandomArticle(num, startIndex)
	{
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php",
			data: {
				origin: "*",
				format: "json",
				action: "query",
				list: "random",
				grnlimit: num,
				prop: "pageimages|info",
				piprop: "original",
				inprop: "url",
				generator: "random",
				grnnamespace: 0
			},

			success: function(data)
			{
				var itemIndex = 0;

				if(startIndex) itemIndex = startIndex;

				var dat = data.query.pages;

				for(var d in dat)
				{
					var imgUrl = "";
					var url = dat[d].fullurl;
					var title = dat[d].title;

					try
					{
						imgUrl = dat[d].original.source;//Not all links have images
					}

					catch(e){}

					finally
					{
						if(itemIndex >= items.length) addNewItems(1);//add new grid items if needed

						items[itemIndex].setImgUrl(imgUrl);
						items[itemIndex].setUrl(url);
						items[itemIndex].setText(title);
						itemIndex++;
					}
				}

			}
		});
	}

	$("#submit").click(function(){
		search();
	});

	$("#search").keypress(function(e){
		if(e.which == 13) search();
	});

	function search()
	{
		var input = $("#search").val();

		if(input)
		{
			getArticle(input, 50);
			$("#search").val("");
			$('html, body').animate({ scrollTop: 0 }, 'fast');
		}
	}

	//endless Scroll
	$(window).scroll(function ()
	{
   		if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100)
		{
			var index = items.length;

			addNewItems(10);
      		getRandomArticle(10, index);
   		}
});
});

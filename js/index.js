 $(document).ready(function(){
   //if enter is hit search
   $("#searchBox").keydown(function(key){
     if(key.which == 13){
       findWiki();
     }
     if(key.which == 8){
      var searchString = $("#searchBox");
     searchString.focus();
     console.log(searchString.text());
     }
   });
//remove &'s for urls
$(document).on('click', '.searchResult', function(clicked){
      var newTitle = $(this).children("#title").children("span").html().replace(/&amp;/i,"%26");
      console.log(newTitle);
      window.open('https://en.wikipedia.org/wiki/'+newTitle);
  });
   // go to a random page
  $("#randomBtn").click(function(){
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  });
   //search if clicked
  $("#searchBtn").click(function(){
     findWiki();
   });
   //find the wiki pages and change layout for better viewing 
  function findWiki (){
    $("#main").css("padding-top","20px");
    $("#main").css("box-shadow","  0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)");
    var searchString = $("#searchBox");
     searchString.focus();
     console.log(searchString.text());
     $.ajax({
       url: '//en.wikipedia.org/w/api.php',
       data: { action: 'query', list: 'search', srsearch:searchString.val(), format: 'json' },
       dataType: 'jsonp',
       success: function (x) {
         $("#searchResults").children().remove();
         var i=0;
         if(x.query.search.length>0){
           for(var searches in x.query.search){
             var div = $("<div id='searchResult"+i+"'class='searchResult'></div>");
             var span = $("<span></span>").text(x.query.search[i].title);
             var title = $("<h2 id='title'></h2>");
             var snippet = $("<h3 id='snippet'></h3>").html(x.query.search[i].snippet);
             $("#searchResults").append(div);
             $("#searchResult"+i).append(title);
             $("#searchResult"+i+" #title").append(span);
             $("#searchResult"+i).append(snippet);
             i++;
           }
         }else{
             var div = $("<div id='noResult'class='noResult'></div>");
             var span = $("<span></span>").text("Nothing was found");
             var title = $("<h2 id='title'></h2>");
             $("#searchResults").append(div);
             $("#noResult").append(title);
             $("#noResult #title").append(span);
           }
       }
     });
  }
});
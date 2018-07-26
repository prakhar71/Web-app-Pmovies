$(document).ready(function () {

    $("#searchform").on("submit",function (e) {
        var search = $("#searchText").val();

        getMovies(search);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query='+searchText)
        .then(function (resp) {
            console.log(resp);
            var output  ='';
            var movies = resp.data.results;
            $.each(movies,function (index,data) {

                let str ="http://image.tmdb.org/t/p/w185";
               var ans = str.concat(data.poster_path);
                output += `
                
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="well text-center">
                    
                    <img src="${ans}" />
                    <h5>${data.title}</h5>
                    <a class="btn btn-primary btn-md" onclick="movieSelected('${data.id}')" href="#">Movie Detail</a>
                    </div>
                   
                    </div>
                
                
                
                `;

console.log(data.id);
            });

            $("#movieCont").html(output);

        })
        .catch(function (err) {
            console.log(err);
        });

}

function movieSelected(id) {
    sessionStorage.setItem('imdbID',id);
    window.location = 'movie.html';
    return false;
}

function getMovieDetail() {

   var movieId =sessionStorage.getItem('imdbID');

   var ans = 'https://api.themoviedb.org/3/movie/'+movieId+'?api_key=fa155f635119344d33fcb84fb807649b&language=en-US';
    axios.get(ans)
        .then(function (resp) {
            console.log(resp);

            var movie = resp.data;
            var genre = genreString(movie.genres);
            var imdb = "https://www.imdb.com/title/" + movie.imdb_id;
            let str ="http://image.tmdb.org/t/p/w185";
            var ans = str.concat(movie.poster_path);
            var output = `
            
                
                <div class="row">
                    <div class="col-md-4">
                        <img src="${ans}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                            <ul class="list-group">
                                    <li class="list-group-item"><strong>Genre:</strong>${genre}</li>
                                    <li class="list-group-item"><strong>Budget:</strong>${movie.budget}</li>
                                
                                      <li class="list-group-item"><strong>rating:</strong>${movie.popularity}</li>
                                       <li class="list-group-item"><strong>Released:</strong>${movie.release_date}</li>
                                        <li class="list-group-item"><strong>Overview:</strong>${movie.overview}</li>
                            </ul>
                    </div>
                </div>
                
                <div class="row">
                <div class="well">
                
                    <h3>Plot</h3><br>
                    <p>${movie.overview}</p>
                    <br>
                    <a href="${imdb}" target="_blank" class="btn btn-primary btn-md">View IMDB</a>
                    <a href="index.html" class="btn btn-default btn-md">Go To Homepage</a>
                
                </div>
                </div>
            
            
            
            `;


            $("#movie").html(output);


        })
        .catch(function (err) {
            console.log(err);
        });


}


function genreString(arr) {
    var str = '';
    for(i=0;i<arr.length-1;i++){

        str += arr[i].name + '  ,';
    }

    str += arr[i].name;
    return str;
}

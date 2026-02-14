(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) {
      var appendString = '';

      for (var i = 0; i < results.length; i++) {
        var item = store[results[i].ref];
        appendString += '<h3><a href="' + item.url + '">' + item.title + '</a></h3>';
        appendString += '<p>' + item.content.substring(0, 150) + '...</p>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<h3>No results found</h3>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('q');

  if (searchTerm) {
    document.getElementById('search-results').innerHTML = 'Searching...';

    // In a real implementation, you might want to fetch the JSON first
    fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        var idx = lunr(function () {
          this.field('id');
          this.field('title', { boost: 10 });
          this.field('content');

          for (var key in data) { // In this simple version, data is array
            this.add({
              'id': key,
              'title': data[key].title,
              'content': data[key].content
            });
          }
        });

        var results = idx.search(searchTerm);
        // Map results back to the original data
        // The ref in results is the index in the data array
        // We need to pass the data store to display function
        // But formatting explicitly:
        var enrichedResults = results.map(function(result) {
            return {
                ref: result.ref, // This is the index (0, 1, 2...)
                score: result.score
            };
        });
        
        displaySearchResults(enrichedResults, data);
      })
      .catch(err => {
          console.error("Error fetching search data: ", err);
          document.getElementById('search-results').innerHTML = 'Error loading search.';
      });
  }
})();

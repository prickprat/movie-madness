

Easy Questions:
    + Create a endpoint to return movie details given a title of a movie
        - Add error handling for incorrect input parameters
        - API Testing for edge cases (e.g. '/' in the title)
        - Optional parameter for 'release_year'
    /-/ e.g. movie/search/?title="Saving Private Ryan"&release_year="1998"
    + Names and DOBs of the cast of a film given a title


Harder Questions:
    + Implement Pagination with a different subset count than what the open API provides.
        /-/ e.g. movie/search?release_year="1990"&num_results="100"

    + Discuss mechanisms for Authentication & Authorisation
    + 6 Degrees ::
        - Work out the strategy by mining the API
        - Then Implement the strategy piecemeal
        - Isolate the algorithm so we can unit test it
        // How do we benchmark the performance of the algorithm. How do we know we've improved it.

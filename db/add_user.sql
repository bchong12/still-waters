insert into users (username, password)
values (${username}, ${hash});

select username, user_id from users
where username = ${username};
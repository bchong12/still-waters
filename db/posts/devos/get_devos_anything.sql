select * from devos
where date iLIKE '%'||$2||'%'
AND user_id = $1
limit 9;
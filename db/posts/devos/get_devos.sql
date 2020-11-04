select * from devos 
where user_id = ${id}
order by devos_id desc
limit 9;
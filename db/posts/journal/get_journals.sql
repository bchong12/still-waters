select * from journal 
where user_id = ${id}
order by journal_id desc
limit 9;
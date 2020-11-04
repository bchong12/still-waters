create table journal (
    journal_id serial primary key,
    date text,
    gratitude text,
    worries text,
    journal text,
    goals text,
    reflections text,
    user_id int references users(user_id)
);

create table devos (
    devos_id serial primary key,
    date text,
    book text,
    chapter text,
    verses text,
    analysis text,
    prayers text,
    user_id int references users(user_id)
);
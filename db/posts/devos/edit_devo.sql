UPDATE devos
SET date = ${date}, book = ${book}, chapter = ${chapter}, verses = ${verses}, analysis = ${analysis}, prayers = ${prayers}
WHERE devos_id = ${devosId} AND user_id = ${id};
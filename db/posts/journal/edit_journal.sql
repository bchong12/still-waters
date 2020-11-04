UPDATE journal
SET date = ${date}, gratitude = ${gratitude}, worries = ${worries}, journal = ${journal}, goals = ${goals}, reflections = ${reflections}
WHERE journal_id = ${journalId} AND user_id = ${id};
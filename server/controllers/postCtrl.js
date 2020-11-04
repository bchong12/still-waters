module.exports = {
  //journals
  createJournal: async (req, res) => {
    const db = req.app.get("db");
    const {
      date,
      gratitude,
      worries,
      journal,
      goals,
      reflections,
      id,
    } = req.body;

    await db.posts.journal.add_journal({
      date,
      gratitude,
      worries,
      journal,
      goals,
      reflections,
      id,
    });

    res.sendStatus(200);
  },

  getJournals: async (req, res) => {
    const db = req.app.get("db");
    const id = req.params.userId;

    const journals = await db.posts.journal.get_journals({ id });

    res.status(200).send(journals);
  },

  getJournal: async (req, res) => {
    const db = req.app.get("db");
    const journalId = req.params.id;
    const id = req.params.userId;

    const journal = await db.posts.journal.get_journal({ id, journalId });

    res.status(200).send(journal);
  },
  updateJournal: async (req, res) => {
    const db = req.app.get("db");
    const {
      date,
      gratitude,
      worries,
      journal,
      goals,
      reflections,
      id,
    } = req.body;

    const journalId = req.params.id;

    db.posts.journal.edit_journal({
      date,
      gratitude,
      worries,
      journal,
      goals,
      reflections,
      id,
      journalId,
    });

    res.sendStatus(200);
  },
  deleteJournal: async (req, res) => {
    const db = req.app.get("db");
    const journalId = req.params.id;
    const id = req.params.userId;

    await db.posts.journal.delete_journal({ journalId, id });

    res.sendStatus(200);
  },
  getJournalsBasedOn: async (req, res) => {
    const db = req.app.get("db");
    const { date, userId } = req.params;

    const journals = await db.posts.journal.get_journals_anything([
      userId,
      date,
    ]);

    res.status(200).send(journals);
  },
};

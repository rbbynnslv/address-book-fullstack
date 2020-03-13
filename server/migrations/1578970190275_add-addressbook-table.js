exports.up = pgm => {
  pgm.createTable('addressbook', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    contact_id: {
      type: 'integer',
      notNull: true,
      references: '"contacts"'
    }
  });
};

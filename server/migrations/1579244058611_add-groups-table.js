exports.up = pgm => {
  pgm.createTable('groups', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    groupname: {
      type: 'text',
      notNull: true
    }
  });
};

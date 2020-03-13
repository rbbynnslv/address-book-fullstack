exports.up = pgm => {
  pgm.createTable('group_members', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    contact_id: {
      type: 'integer',
      notNull: true,
      reference: '"contacts"'
    },
    group_id: {
      type: 'integer',
      notNull: true,
      references: '"groups"'
    }
  });
};

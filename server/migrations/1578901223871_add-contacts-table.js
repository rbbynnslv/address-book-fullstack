exports.up = pgm => {
  pgm.createTable('contacts', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    firstname: {
      type: 'text',
      notNull: true
    },
    lastname: {
      type: 'text',
      notNull: true
    },
    email: {
      type: 'text',
      notNull: true
    },
    home_phone: {
      type: 'text',
      notNull: true
    },
    mobile_phone: {
      type: 'text',
      notNull: true
    },
    work_phone: {
      type: 'text',
      notNull: true
    },
    city: {
      type: 'text',
      notNull: true
    },
    state: {
      type: 'text',
      notNull: true
    },
    country: {
      type: 'text',
      notNull: true
    },
    postal_code: {
      type: 'text',
      notNull: true
    }
  });
};

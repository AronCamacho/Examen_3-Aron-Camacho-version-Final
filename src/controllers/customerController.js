const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM datos', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('customers', {
        data: customers
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO datos set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { num_dato } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM datos WHERE num_dato = ?", [num_dato], (err, rows) => {
      res.render('customers_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { num_dato } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE datos set ? where num_dato = ?', [newCustomer, num_dato], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { num_dato } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM datos WHERE num_dato = ?', [num_dato], (err, rows) => {
      res.redirect('/');
    });
  });
};
controller.buscar = (req, res) => {
  req.getConnection((err, conn) => {
    const { query } = req.params;
    conn.query('SELECT * FROM datos where num_dato like"'+ query +'%";', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('buscar', {
        data: customers
     });
    });
  });
};


module.exports = controller;

export const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route under development yet.',
  });
};

export const getUser = (req, res) => {
  const msg = process.env.DB_CON;
  console.log('msg: ' + msg);
  res.status(201).json({
    var: msg,
  });
  /* res.status(500).json({
        status: 'error',
        message: 'Route under development yet.',
    }); */
};

export const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route under development yet.',
  });
};

export const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route under development yet.',
  });
};

export const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route under development yet.',
  });
};

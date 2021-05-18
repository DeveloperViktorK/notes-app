const DEFAULT_ITEMS_ON_PAGE = 3;

exports.getPagination = (page, size) => {
  const limit = size ? +size : DEFAULT_ITEMS_ON_PAGE;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};

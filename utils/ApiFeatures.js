class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

    // Filtering
    filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'keyword'];
    excludedFields.forEach((field) => delete queryObj[field]);

    // gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  // Field Limiting
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  // Search
  search(modelName) {
    if (this.queryString.keyword) {
      let searchQuery = {};

      if (modelName === 'Product') {
        searchQuery = {
          $or: [
            { name: { $regex: this.queryString.keyword, $options: 'i' } },
            { description: { $regex: this.queryString.keyword, $options: 'i' } },
          ],
        };
      } else {
        searchQuery = {
          name: { $regex: this.queryString.keyword, $options: 'i' },
        };
      }

      this.query = this.query.find(searchQuery);
    }
    return this;
  }

  // Pagination
  paginate(totalDocs) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(totalDocs / limit);

    this.query = this.query.skip(skip).limit(limit);

    this.paginationResult = {
      totalDocs,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return this;
  }
}
export default ApiFeatures;
import { Query, Document } from "mongoose";

export interface QueryString {
  page?: string;
  limit?: string;
  sort?: string;
  fields?: string;
  keyword?: string;
  [key: string]: string | undefined;
}

export interface PaginationResult {
  totalDocs: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

class ApiFeatures<T extends Document> {
  public query: Query<T[], T>;
  public queryString: QueryString;
  public paginationResult!: PaginationResult;

  constructor(query: Query<T[], T>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    const queryObj: Record<string, unknown> = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields", "keyword"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }

  search(modelName: string): this {
    if (this.queryString.keyword) {
      let searchQuery: Record<string, unknown> = {};

      if (modelName === "Product") {
        searchQuery = {
          $or: [
            { name: { $regex: this.queryString.keyword, $options: "i" } },
            { description: { $regex: this.queryString.keyword, $options: "i" } },
          ],
        };
      } else {
        searchQuery = {
          name: { $regex: this.queryString.keyword, $options: "i" },
        };
      }

      this.query = this.query.find(searchQuery);
    }
    return this;
  }

  paginate(totalDocs: number): this {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
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
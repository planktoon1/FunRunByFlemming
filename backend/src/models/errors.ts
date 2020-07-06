export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
export class DataImportError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataImportError";
  }
}

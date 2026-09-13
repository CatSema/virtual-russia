/** Stable boundary for any S3-compatible provider (MinIO in development). */
export interface ObjectStorage {
  checkHealth(): Promise<boolean>;
}

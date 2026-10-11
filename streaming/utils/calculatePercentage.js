/**
 * Calculates the percentage of a file that has been processed.
 *
 * Progress is based on actual bytes loaded rather than the number
 * of chunks because the final chunk may be smaller than the
 * configured chunk size.
 *
 * @param {number} loadedBytes - Number of bytes processed so far.
 * @param {number} totalSize - Total size of the file in bytes.
 * @returns {number} Percentage of the file processed.
 */
export function calculatePercentage(loadedBytes, totalSize) {
  return (loadedBytes / totalSize) * 100;
}
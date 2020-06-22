/** @interface */
class Updatable {
  /** 
   * Updates model and/or view when data is fetched. 
   * @param {JSON Object} data Data that has been fetched.
   */
  onDataFetched(data) {}  
}

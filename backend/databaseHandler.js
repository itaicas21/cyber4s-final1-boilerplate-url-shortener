const fs = require("fs");
const { nanoid } = require("nanoid");
const utils = require("../utils");
class DataBase {
  //recieves array in fileData,writes object in newData

  static readFile(databaseFileLocation) {
    return new Promise((res, rej) => {
      fs.readFile(databaseFileLocation, (_, content) => {
        res(content);
      });
    });
  }

  static createDataSet(URLRequested) {
    return {
      creationDate: utils.getSQLFormat(),
      redirectCount: 0,
      URL: URLRequested,
      short_ID: nanoid(),
    };
  }
  static updateFile(fileLocation, newDataSet, parsedContent) {
    parsedContent.push(newDataSet);
    fs.writeFile(fileLocation, JSON.stringify(parsedContent), () => {});
    return newDataSet;
  }

  static checkForExistingData(fileData, keyToExistingData) {
    return fileData.find((URLItem) => {
      return (
        URLItem.URL === keyToExistingData ||
        URLItem.short_ID === keyToExistingData
      );
    });
  }

  static updateRedirectCount(fileLocation, parsedContent, found) {
    const index = parsedContent.findIndex((parsedData) => {
      return (
        parsedData.URL === found.URL || parsedData.short_ID === found.short_ID
      );
    });
    parsedContent[index]["redirectCount"] =
      parsedContent[index]["redirectCount"] + 1;
    fs.writeFile(fileLocation, JSON.stringify(parsedContent), () => {});
  }
}

module.exports = DataBase;

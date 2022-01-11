var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var File = require("dw/io/File");
var FileWriter = require("dw/io/FileWriter");
// var { File, FileWriter } = require("dw/io");
var XMLStreamWriter = require("dw/io/XMLStreamWriter");

module.exports.execute = function () {
  var demoObjectIterator = CustomObjectMgr.getAllCustomObjects("DemoObject");
  // var file;
  var fileWriter;
  var xsw;

  try {
    var file = new File([File.IMPEX, "test", "text.xml"].join(File.SEPARATOR));
    // var file = new File([File.IMPEX, 'homework.csv'].join(File.SEPARATOR));

    fileWriter = new FileWriter(file);

    xsw = new XMLStreamWriter(fileWriter);
    xsw.writeStartElement("products");

    xsw.writeStartDocument();

    while (demoObjectIterator.hasNext()) {
      // will iterate as many time as the custom objects we have
      var demo = demoObjectIterator.next();
      xsw.writeStartElement("product");
      xsw.writeAttribute("id", demo.custom.product);
      xsw.writeAttribute("name", demo.custom.name);
      xsw.writeEndElement();
    }
    xsw.writeEndElement();
  } catch (e) {
  } finally {
    xsw.close();
    fileWriter.close();
  }
};

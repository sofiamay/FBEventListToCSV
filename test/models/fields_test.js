var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;

// Files to test:
const Field = require("../../models/fields.js").Field;
const Fields = require("../../models/fields.js").Fields;

//Constants:
const EXAMPLE_KEY = "name";
const EXAMPLE_LABEL = "Name";
const FIELD_DATA = ["name", "Name"];
const FIELD_DATA2 = ["id", "ID"];
const FIELD_DATA3 = ["profile_photo", "Profile Photo"];

// ---- TESTS ----

describe("Field", () => {
  it("should construct a new Field(key, label) instance", () => {
  	let exampleField = new Field(EXAMPLE_KEY, EXAMPLE_LABEL);
  	expect(exampleField.key).to.equal(EXAMPLE_KEY);
  	expect(exampleField.label).to.equal(EXAMPLE_LABEL);
  });
  it(".fromArray(fieldList) should construct field from array of length 2", () => {
  	let exampleField = Field.fromArray(FIELD_DATA);
  	expect(exampleField.key).to.equal(EXAMPLE_KEY);
  	expect(exampleField.label).to.equal(EXAMPLE_LABEL);
  });
  it(".fromArray(fieldList) should throw error if fieldList length != 2", () => {
  	let brokenArray = ["name", "Name", "Something that shouldn't be here"];
  	expect(function(){
    	Field.fromArray(brokenArray);
		}).to.throw(`Field.fromObj(arr): arr must have exactly 2 items, a key followed by a label`);
  });
});

describe("Fields", () => {
  it("should construct a new Fields() instance", () => {
  	let exampleFields = new Fields();
  	expect(exampleFields._ordered).to.be.empty;
  });
  it(".push(Field) should add a field to Fields", () => {
  	let exampleFields = new Fields();
  	let exampleField = new Field(EXAMPLE_KEY, EXAMPLE_LABEL);
  	let testKey = exampleField.key;
  	exampleFields.push(exampleField);
  	expect(exampleFields.containsKey(testKey)).to.be.true;
  });
it(".fromArray(fieldList) constructs new Fields from array of arrays [['name', 'Name'],['id', 'ID'],...]", () => {
  	let arr = [FIELD_DATA, FIELD_DATA2, FIELD_DATA3];
  	let fieldsLength = arr.length;
  	let firstData = arr[0];
  	let firstDataKey = firstData[0];
  	let exampleFields = Fields.fromArray(arr);
  	expect(exampleFields._ordered.length).to.eql(fieldsLength);
  	expect(exampleFields._ordered[0] instanceof Field).to.be.true;
  	expect(exampleFields._ordered[0].key).to.equal(firstDataKey);
  });
  it(".length should return number of field objects in Fields", () => {
  	let arr = [FIELD_DATA, FIELD_DATA2, FIELD_DATA3];
  	let expectedLength = arr.length;
  	let exampleFields = Fields.fromArray(arr);
  	expect(exampleFields.length).to.equal(expectedLength);
  });
  it(".containsKey('key') should return true if a field in FieldList has .key ='key' ", () => {
  	let arr = [FIELD_DATA, FIELD_DATA2, FIELD_DATA3];
  	let testKey = FIELD_DATA[0];
  	let exampleFields = Fields.fromArray(arr);
  	expect(exampleFields.containsKey(testKey)).to.be.true;
  });
  it(".getField('key') should return Field object with key='key' if 'key' in Fields", () => {
  	let arr = [FIELD_DATA, FIELD_DATA2, FIELD_DATA3];
  	let testKey = FIELD_DATA[0];
  	let testLabel = FIELD_DATA[1];
  	let exampleFields = Fields.fromArray(arr);
  	expect(exampleFields.getField(testKey)).to.exist;
  	expect(exampleFields.getField(testKey) instanceof Field).to.be.true;
  	expect(exampleFields.getField(testKey).label).to.equal(testLabel);
  });
  it(".getLabelof('key') should return 'label' string associated with key if Field with key in Fields", () => {
  	let arr = [FIELD_DATA, FIELD_DATA2, FIELD_DATA3];
  	let testKey = FIELD_DATA[0];
  	let testLabel = FIELD_DATA[1];
  	let exampleFields = Fields.fromArray(arr);
  	expect(exampleFields.getLabelof(testKey)).to.equal(testLabel);
  });
  it(".orderedLabels() should return an array containing the labels for all fields within Fields in the order they were added", () => {
  	const firstField = Field.fromArray(FIELD_DATA);
  	const firstLabel = firstField.label;
  	const secondField = Field.fromArray(FIELD_DATA2);
  	const secondLabel = secondField.label;
  	const thirdField = Field.fromArray(FIELD_DATA3);
  	const thirdLabel = thirdField.label;

  	let exampleFields = new Fields();
  	exampleFields.push(firstField);
  	exampleFields.push(secondField);
  	exampleFields.push(thirdField);
  	let orderedLabels = exampleFields.orderedLabels();
  	expect(orderedLabels[0]).to.equal(firstLabel);
  	expect(orderedLabels[1]).to.equal(secondLabel);
  	expect(orderedLabels[2]).to.equal(thirdLabel);
  });
  it(".orderedKeys() should return an array containing the keys for all fields within Fields in the order they were added", () => {
  	const firstField = Field.fromArray(FIELD_DATA);
  	const firstKey = firstField.key;
  	const secondField = Field.fromArray(FIELD_DATA2);
  	const secondKey = secondField.key;
  	const thirdField = Field.fromArray(FIELD_DATA3);
  	const thirdKey = thirdField.key;

  	let exampleFields = new Fields();
  	exampleFields.push(firstField);
  	exampleFields.push(secondField);
  	exampleFields.push(thirdField);
  	let orderedKeys = exampleFields.orderedKeys();
  	expect(orderedKeys[0]).to.equal(firstKey);
  	expect(orderedKeys[1]).to.equal(secondKey);
  	expect(orderedKeys[2]).to.equal(thirdKey);
  });
  it(".removeKey('key') should remove field with 'key' from Fields", () => {
  	const firstField = Field.fromArray(FIELD_DATA);
  	const secondField = Field.fromArray(FIELD_DATA2);
  	const secondKey = secondField.key;
  	const thirdField = Field.fromArray(FIELD_DATA3);

  	let exampleFields = new Fields();
  	exampleFields.push(firstField);
  	exampleFields.push(secondField);
  	exampleFields.push(thirdField);

  	exampleFields.remove(secondKey);
  	expect(exampleFields.containsKey(secondKey)).to.be.false;
  });
});
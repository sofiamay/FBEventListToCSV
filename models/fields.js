'use strict';

/* --- Keys in graph API and their associated labels to print----
attributes:
- key | e.g. "name" or "profile_picture"
- label | e.g. "Name" or "Profile Picture"
*/

// required key<string>, title<string>
class Field {
  constructor(key, label) {
  	if (!key || !label) throw `Field instance is missing key or title`;
    this.key = key;
    this.label = label;
  }

  // [key, label] --> new Field
  static fromArray(arr) {
  	if (arr.length != 2) throw `Field.fromObj(arr): arr must have exactly 2 items, a key followed by a label`;
  	const key = arr[0];	
  	const label = arr[1];
  	return new Field(key, label);
  }
}

// add Field to Fields with Fields.append(Field) in the order they should appear
class Fields {
  constructor() {
    this._ordered = [];
    this._fields = {}; //eg. { "name": <Field>{key: "name", label: "Name"} }
  }

  // [["id", "User ID],["name," "Name"], [...]] --> new Fields
  static fromArray(fieldList) {
  	let fields = new Fields(); 
  	fieldList.forEach((keyAndLabel, index) => {
  		if (keyAndLabel.length != 2) throw `Fields.fromMap: each field must contain 2 strings exactly, a key value pair`;
  		let key = keyAndLabel[0];
  		let label = keyAndLabel[1];
  		let field = new Field(key, label);
  		fields.push(field);
  	});
  	return fields;
  }

  get length() {
    return this._ordered.length;
  }


  push(field) {
    if (! (field instanceof Field)) throw `Fields.push only accepts Field objects`;
    if (!this._fields[field.key]) {
      this._ordered.push(field);
      this._fields[field.key] = field;
    } else {
      console.log(`Cannot add field to Fields. Field with key ${field.key} already in Fields`);
    }
  }

  containsKey(key) {
    if (!this._fields[key]) return false;
    return true;
  }

  getField(key) {
    return this._fields[key];
  }

  getLabelof(key) {
    if (! this._fields[key]) {
      console.log(`field with key ${key} doesn't exist in Fields`);
      return null;
    }
    let field = this._fields[key];
    return field.label;
  }

  // returns list of labels
  orderedLabels() {
    let labels = [];
    this._ordered.forEach((field, index) => {
      labels.push(field.label);
    });
    return labels;
  }

  // returns list of keys
  orderedKeys() {
    let keys = [];
    this._ordered.forEach((field, index) => {
      keys.push(field.key);
    });
    return keys;
  }

  remove(key) {
  	if (!this._fields[key]) {
  		console.log(`Key: ${key} not found in fields. Nothing to remove`);
  		return null;
  	}
  	const index = this.orderedKeys().indexOf(key);
		if (index > -1) { // only splice array when item is found
		  this._ordered.splice(index, 1);
		  delete this._fields[key];
		}
  }
}

module.exports = {
	Field: Field,
	Fields, Fields
};
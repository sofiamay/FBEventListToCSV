var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;

// Files to test:
const User = require("../../models/users.js").User;
const Users = require("../../models/users.js").Users;

//Constants:
const USER_DATA = {
	"id": "123456",
	"name": "John",
	"profile_picture": {
		"uri": "https://url-to-photo.jpg"
	},
};
const USER2_DATA = {
	"id": "198765",
	"name": "Claire",
	"profile_picture": {
		"uri": "https://url-to-claire-photo.jpg"
	},
};
const USER3_DATA = {
	"id": "1928347",
	"name": "Max",
};
const EMPTY_USER_DATA = {
	"mistake": "captured the wrong data",
};


// ---- TESTS ----

describe("User", () => {
  it("should construct a new User instance from an object", () => {
  	let exampleUser = new User(USER_DATA);
  	expect(exampleUser.id).to.equal(USER_DATA.id);
  	expect(exampleUser.name).to.equal(USER_DATA.name);
  	expect(exampleUser.profilePicture).to.equal(USER_DATA.profile_picture.uri);
  });
  it("should have a .JSONObj property that converts the user properties to an object", () => {
  	let DATA = {
			"id": "123456",
			"name": "John",
			"profile_picture": "https://url-to-photo.jpg",
		};
  	let exampleUser = new User(USER_DATA);
  	expect(exampleUser.JSONObj).to.eql(DATA);
  });
   it("should construct a new user with an empty profilePicture property", () => {
  	let exampleUser = new User(USER3_DATA);
  	expect(exampleUser.profilePicture).to.equal(null);
  });
     it("should construct a new user with empty name, id, and profilePicture fields", () => {
  	let exampleUser = new User(EMPTY_USER_DATA);
  	expect(exampleUser.id).to.equal(null);
  	expect(exampleUser.name).to.equal(null);
  	expect(exampleUser.profilePicture).to.equal(null);

  });
});

describe("Users", () => {
  it("should construct a new Users instance from array of User [User, User, ...]", () => {
  	let user1 = new User(USER_DATA);
  	let user2 = new User(USER2_DATA);
  	let user3 = new User(USER3_DATA);
  	let userList = [user1, user2, user3];
  	let exampleUsers = new Users(userList);
  	expect(exampleUsers.users).to.eql(userList);

  });
  it("should construct a new Users instance with empty users list", () => {
  	let exampleUsers = new Users();
  	expect(exampleUsers.users).to.be.empty;;

  });
  it(".fromArray() should construct a new Users instance from array of objects", () => {
  	let userList = [USER_DATA, USER2_DATA, USER3_DATA];
  	let listLength = userList.length;
  	let exampleUsers = Users.fromArray(userList);
  	expect(exampleUsers.users.length).to.equal(listLength);
  });
  it("should have a length property = number of users", () => {
  	let userList = [USER_DATA, USER2_DATA, USER3_DATA];
  	let listLength = userList.length;
  	let exampleUsers = Users.fromArray(userList);
  	expect(exampleUsers.length).to.equal(listLength);
  });
    it("should have a push property to add new user", () => {
  	let userList = [USER_DATA, USER2_DATA];
  	let listLength = userList.length;
  	let exampleUsers = Users.fromArray(userList);
  	let newUser = new User(USER3_DATA);

  	exampleUsers.push(newUser);
  	expect(exampleUsers.length).to.equal(listLength + 1);
  });
  it("should have a .toList() method that outputs an array of JSON Objects", () => {
  	let userList = [USER_DATA, USER2_DATA, USER3_DATA];
  	let firstUser = userList[0];
  	let listLength = userList.length;
  	let exampleUsers = Users.fromArray(userList);

  	let result = exampleUsers.toList();
  	expect(result.length).to.equal(listLength);
  	expect(result[0].name).to.equal(firstUser.name);
  });
});
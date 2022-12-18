'use strict';

/* --- Representation based on FB Graph API ----
attributes:
- id
- name
- profilePicture
- JSONOBJ {
	"id": id,
	"name": name,
	"profile_picture": "uri": "https://url-to-photo.jpg",
}
*/


class User {
	constructor(jsonObj) {
		this.id = jsonObj.id || null;
		this.name = jsonObj.name || null;
		if (jsonObj.profile_picture) {
			this.profilePicture = jsonObj.profile_picture.uri || null;
		}
		else {
			this.profilePicture = null;
		}
		this.JSONObj = {
			"id": this.id,
			"name": this.name,
			"profile_picture": this.profilePicture,
		};
	}
}

// [User, User, ...] --> new Users
class Users {
	constructor(users) {
		let self = this;
		this.users = users || [];
		this.users.forEach((person)=>{
			if (! person instanceof User) throw `Type Error: Users accept array of User`;
		});
		// access users[index]
		return new Proxy(this, {
      get(target, prop) {
        if (Number(prop) == prop && !(prop in target)) {
          return self.users[prop];
        }
        return target[prop];
      }
    });
	}

	// [{name: "John", id: "12345"}, {...}, ...]--> new Users
	static fromArray(usersInfo) {
		let userList = [];
		usersInfo.forEach((userInfo) => {
			let user = new User(userInfo);
			userList.push(user);
		});
		return new Users(userList);
	}

	get length() {
		return this.users.length;
	}

	push(user) {
		this.users.push(user);
	}

	toList() {
		let list = [];
		this.users.forEach((user) => {
			list.push(user.JSONObj);
		});
		return list;
	}
}

module.exports = {
	User: User,
	Users: Users
};

module.exports = {
	User: User,
	Users, Users
};
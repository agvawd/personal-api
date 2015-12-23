var me = {
	name: "Allen",
	location: "Orem, UT",
	occupation: ['Web Developer', 'Mentor', 'Coding Wizard'],
	hobbies: [
		{
			name: "Programming",
			type: "current"
		}, 
		{
			name: "Saving the World",
			type: "future"
		}, 
		{
			name: "Riding Dragons",
			type: "whenever"
		}],
	skillz: [
		{
			id: "1",
			name: "Dragon Slaying",
			experience: "Master"
		},
		{
			id: "2",
			name: "Force Lightening",
			experience: "Intermediate"
		},
		{
			id: "3",
			name: "Fire Bending",
			experience: "Beginner"
		}]
};

var typeHobbies = [];

function cmpObj(o1, o2){
	var findSkillz = [];
	for(var i = 0; i < o1.length; i++){
		for(var key in o1[i]){
			if(Object.prototype.hasOwnProperty.call(o2, key)){
				if(o1[i][key].toLowerCase() == o2[key].toLowerCase()){
					findSkillz.push(o1[i])
				}
			}
		}
	}
	return findSkillz.unique();
}

Array.prototype.unique = function() {
    return this.reduce(function(accum, current) {
        if (accum.indexOf(current) < 0) {
            accum.push(current);
        }
        return accum;
    }, []);
}

module.exports = {
	getMe: function(req, res){
		return me;
	},

	getName: function(req, res){
		return res.json(me.name);
	},

	getLocation: function(req, res){
		return res.json(me.location);
	},

	getOccupation: function(req, res){
		return res.json(me.occupation);
	},

	getOccupationOrder: function(req, res){
		if(req.params.order === "asc"){
			return res.json(me.occupation.sort());
		}
		else if (req.params.order === "desc"){
			return res.json(me.occupation.sort().reverse());
		}
	},

	getLatest: function(req, res){
		return res.json(me.occupation[me.occupation.length - 1]);
	},

	getHobbies: function(req, res){
		return res.json(me.hobbies);
	},

	getHobbyType: function(req, res){
		for(var i = 0; i < me.hobbies.length; i++){
			if(req.params.type == me.hobbies[i].type){
				typeHobbies.push(me.hobbies[i]);
			}
		}
		return res.json(typeHobbies);
	},

	getSkillz: function(req, res){
		if(Object.keys(req.query).length == 0){
			return res.json(me.skillz);
		}
		else{
			return res.json(cmpObj(me.skillz, req.query));
		}
	},

	postName: function(req, res){
		if(req.body.name){
			me.name = req.body.name;
			return res.json("changed name");
		}
		else{
			return res.json("Give me a name");
		}
	},

	postLocation: function(req, res){
		if(req.body.location){
			me.location = req.body.location;
			return res.json("changed location");
		}
		else {
			return res.json("Give me a location");
		}
	},

	postOccupation: function(req, res){
		if(req.body.occupation) {
			me.occupation.push(req.body.occupation);
			return res.json("Added occupation");
		}
		else{
			return res.json("Give me an occupation to add");
		}
	},

	postHobbies: function(req, res){
		if(req.body.hobby.name && req.body.hobby.type){
			me.hobbies.push(req.body.hobby);
			return res.json("Added hobby");
		}
		else{
			return res.json("Give me a hobby to add");
		}
	},

	postSkillz: function(req, res){
		if(req.body.skill.id && req.body.skill.name && req.body.skill.experience){
			me.skillz.push(req.body.skill);
			return res.json("Added skill");
		}
		else {
			return res.json("Give me a skill to add");
		}
	}
};
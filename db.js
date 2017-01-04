import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';

const Connection = new Sequelize(
	'properties',
	'walterayalae',
	'postgres',
	{
		dialect: 'postgres',
		host: 'localhost'
	}
);

const Property = Connection.define('property', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	location: {
		type: Sequelize.STRING,
		allowNull: false
	},
	address: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const Realtor = Connection.define('realtor', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	}, 
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	phone: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

//Relationships
Property.hasMany(Realtor);
Realtor.belongsTo(Property);

Connection.sync({force: true}).then(() => {
	_.times(10, ()=> {
		return Property.create({
			name: Faker.address.streetName(),
			location: Faker.address.country(),
			address: Faker.address.streetAddress("###")
		}).then(property => {
			return property.createRealtor({
				firstName: Faker.name.firstName(),
				lastName:Faker.name.lastName(),
				title: 'Realtor',
				phone: Faker.phone.phoneNumber()
			});
		});
	});
});

export default Connection;

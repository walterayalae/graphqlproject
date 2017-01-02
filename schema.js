import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull

} from 'graphql';
import Db from './db';


const Property = new GraphQLObjectType({
	name: 'Property',
	description: 'List of properties for sale',
	fields:() => {
		return{
			id:{
				type:GraphQLInt,
				resolve(property){
					return property.id;
				}
			},
			name:{
				type:GraphQLString,
				resolve(property){
					return property.name;
				}
			},
			location:{
				type:GraphQLString,
				resolve(property){
					return property.location;
				}
			},
			address:{
				type:GraphQLString,
				resolve(property){
					return property.address;
				}
			},
			realtor:{
				type:new GraphQLList(Realtors),
				resolve(property){
					return property.getRealtors();
				}
			}

		};
	}
});

const Realtors = new GraphQLObjectType({
	name: 'Realtors',
	description: 'List of realtors',
	fields:() => {
		return {
			id:{
			 	type:GraphQLInt,
				resolve(property){
					return property.id;
				}
			},
			firstName:{
				type:GraphQLString,
				resolve(realtors){
					return realtors.firstName;
				}
			},
			lastName:{
				type:GraphQLString,
				resolve(realtors){
					return realtors.lastName;
				}
			},
			title:{
				type:GraphQLString,
				resolve(realtors){
					return realtors.title;
				}
			},
			phone:{
				type:GraphQLString,
				resolve(realtors){
					return realtors.phone;
				}
			},
			property:{
				type: Property,
				resolve(realtor){
					return realtor.getProperty();
;				}
			}
		};
	}
});

const Query = new GraphQLObjectType({
	name: 'RootQuery',
	description: 'This is our root query',
	fields: () => {
		return {
			properties:{
				type: new GraphQLList(Property),
				resolve(root, args) {
					return Db.models.property.findAll({where: args});
				}
			},
			realtor: {
			type: new GraphQLList(Realtors),
			resolve(root, args) {
				return Db.models.realtor.findAll({where: args});
			}
			}
		};
	}
});

const Mutation = new GraphQLObjectType({
	name:'Mutation',
	description:'Functions to create properties',
	fields (){
		return {
			addProperty: {
				type: Property,
				args: {
					name:{ 
						type: new GraphQLNonNull(GraphQLString)
					},
					location:{
						type: new GraphQLNonNull(GraphQLString)
					},
					address: {
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve(_, args){
					return Db.models.property.create({
						name: args.name,
						location: args.location,
						address: args.address
					});
				}
			}
		};
	}
});

const Schema = new GraphQLSchema({
	query:Query,
	mutation: Mutation
});

export default Schema;
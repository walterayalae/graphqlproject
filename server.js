
import express from 'express';
import graphqlHTTP from 'express-graphql';
import Schema from './schema';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';


const app = express();


app.use('/graphql', graphqlHTTP({ schema: Schema, pretty: true, graphiql: true}));
app.listen(8080, () => {
	console.log({running:true});
});


const compiler = webpack({
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/static/"
  },
  module: {
    loaders: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader"
      }
    ]
  }
});

const appServer = new WebpackDevServer(compiler, {
 contentBase: "/public/",
 proxy: {"/graphql": `http://localhost:${8080}`},
 publicPath: "/static/",
 stats: {colors: true}
});
appServer.use("/", express.static("static"));
appServer.listen(3000);
console.log("The App Server is running.");




// import express from 'express';
// import * as _ from 'underscore';

// const app = express();

// import graphqlHTTP from 'express-graphql';
// import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';


// const PostsList = [{'title':'Hello', 'content':'it works','author': 'peter'},
// 				   {'title':'Hi there', 'content':'it does work', 'author': 'walt'}
// 				  ];

// const AuthorsList = [{_id: 'peter', name: 'Peter'},
// 					 {_id: 'walt', name: 'Walter'},
// 					 {_id: 'annie', name: 'Ana'}
// 					];


// const Author = new GraphQLObjectType({
// 	name: "Author",
// 	description: "Authors in post",
// 	fields: () =>({
// 		_id: {type:GraphQLString},
// 		name: {type: GraphQLString}
// 	})
// });


// const Post = new GraphQLObjectType({
//   name: "Post",
//   description: "This represent a Post",
//   fields: () => ({
//     title: {type: GraphQLString},
//     content: {type: GraphQLString},
//     author:{
//     	type:Author,
//     	resolve:function(post){
//     		console.log('post', post);
//     		 return _.find(AuthorsList, a => a._id == post.author);
//     	}
//     }
//   })
// });


// const RootQuery = new GraphQLObjectType({
// 	name: 'RootQuery',
// 	description: 'The root query',
// 	fields: {
// 		viewer: {
// 			type: GraphQLString,
// 			resolve() {
// 				return 'noel!';
// 			}
// 		},
// 		text: {
// 			type:GraphQLString,
// 			resolve(){
// 				return 'yes it works!';
// 			}
// 		},
// 		posts: {
// 			type: new GraphQLList(Post),
// 			resolve(){
// 				return PostsList;
// 			}
// 		}
// 	}
// });


// const Schema = new GraphQLSchema({
// 	query: RootQuery
// });



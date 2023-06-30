const {readFile, multipleReadFile} = require("../Middlewares/file");
const {SingleFile} = require("../Model/singleUploadModel");
const {MultipleFile} = require("../Model/multipleUpload");

module.exports = {
    Query: {
        greetings: () => {
            return "Hello World"
        },

        hello: ()=> {
            return "Hello GraphQL"
        },

        getSingleUploads: async () => {
            return await SingleFile.find();
        }

    },
    
    Mutation: {
        singleUpload: async (_, { file, title, author, description, release_year, genre }) => {
            const imageUrl = await readFile(file);
            const singlefile = new SingleFile({ image: imageUrl, title, author, description, release_year, genre });
            await singlefile.save();
            return {
                message: "Single file uploaded successfully!",
            };
        },

        singleUploadEdit: async (_, { id, file, title, author, description, release_year, genre }) => {
            const updatedData = { title, author, description, release_year, genre };
            if (file) {
              const imageUrl = await readFile(file);
              updatedData.image = imageUrl;
            }
            const updatedSingleFile = await SingleFile.findByIdAndUpdate(id, updatedData, { new: true });
            return updatedSingleFile;
        },

        deleteSingleUpload: async (_, { id }) => {
            const deletedSingleFile = await SingleFile.findByIdAndRemove(id);
            if (!deletedSingleFile) {
              throw new Error("File not found.");
            }
            return {
              message: "File deleted successfully!",
            };
          },

        multipleUpload: async (_, {file}) => {
            const imageUrl = await multipleReadFile(file);
            const multiplefile = new MultipleFile();
            multiplefile.images.push(...imageUrl);
            multiplefile.save();
            return {
                message: "Multiple File uploaded successfully!"
            }
        }
    }
} 
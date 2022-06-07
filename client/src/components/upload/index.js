import './styles.css'
import axios from 'axios'
import { config } from '../../App'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { toast } from 'react-toastify'

const schema = yup.object().shape({
    jsonData: yup.mixed()
        .required('You need to provide a file')
        .test("fileType", "Unsupported file! Only Json file supported", (value) => (
            // console.log(value),
            value[0].type === "application/json"
        ))
});

export default function Upload() {

    const uploadData = async (data) => {
        try {
            const response = await axios.post(`${config.baseUrl}/upload`, {
                jsonData: data
            });
            console.log(response);
            toast.success('Upload successful');
        }
        catch (error) {
            toast.error('Upload failed');
            console.log(error);
        }
    }

    const submitForm = (data) => {
        console.log(data.jsonData[0]);
        // console.log('submit')
        toast.info('Reading file...');
        const fileReader = new FileReader();
        fileReader.readAsText(data.jsonData[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            // setFiles(e.target.result);
            toast.info('Uploading file...');
            uploadData(e.target.result);
        };
    
        // console.log(JSON.parse(e.target.files));
        // console.log(JSON.stringify(e.target.files));
        // console.log(e.target.result);
        

    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <div className="upload">
        <h1>Upload</h1>
        <form onSubmit={handleSubmit(submitForm)}>
            <input type="file" {...register('jsonData')} />
            {errors.jsonData && <p className="error">{errors.jsonData.message}</p>}
            <button type="submit">Upload</button>
        </form>
    </div>
    );
}


// import React, { useState } from "react";

// export default function Upload({ children }) {
//   const [files, setFiles] = useState("");

//   const handleChange = e => {
//     const fileReader = new FileReader();
//     fileReader.readAsText(e.target.files[0], "UTF-8");
//     fileReader.onload = e => {
//       console.log("e.target.result", e.target.result);
//       setFiles(e.target.result);
//     };

//     console.log(e.target.result);

//   };
//   return (
//     <>
//       <h1>Upload Json file - Example</h1>

//       <input type="file" onChange={handleChange} />
//       <br />
//       {"uploaded file content -- " + files}
//     </>
//   );
// }
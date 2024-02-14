import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from './imageHelper';

const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);

    const [image, setImage] = useState('');
    const [imageInineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [aiResponse2, setResponse2] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Generative AI Call to fetch image insights
     */
    async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
            "Convert ER Model into SQL Query", imageInineData
        ]);

        const response = await result.response;
        const text = response.text();

        const result2 = await model.generateContent([
            `${text}, for each table what is its primary key and relation of the table with other in short summary`, imageInineData
        ]);

        const response2 = await result2.response;
        const text2 = response2.text();
        setResponse(text);
        setResponse2(text2);
        setLoading(false);
    }

    const handleClick = () => {
        aiImageRun();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // getting base64 from file to render in DOM
        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e))

        // generating content model for Gemini Google AI
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }

    // Converts a File object to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
        <div>

            <div>
                <div style={{ display: 'flex' }}>
                    <input type='file' onChange={(e) => handleImageChange(e)} />
                    <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
                </div>
                <img src={image} style={{ width: '30%', marginTop: 30 }} />
            </div>

            {
                loading === true && (aiResponse === '') ?
                    <p style={{ margin: '30px 0' }}>Loading ...</p>
                    :
                    <div style={{ margin: '30px 0' }}>
                        <p>{aiResponse}</p>
                        <p>{aiResponse2}</p>
                    </div>
            }
        </div>
    );
};

export default AiwithImage;
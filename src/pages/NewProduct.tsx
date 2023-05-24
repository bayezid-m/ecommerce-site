import React, { useEffect, useState } from 'react'
import axios from 'axios';

import useAppSelector from '../hooks/useAppSelecter';
import useAppDispatch from '../hooks/useAppDispatch'
import categoryDetails, { fetchAllCategories } from '../redux/reducers/categoryReducer';
import { Link } from 'react-router-dom';
import { createNewProduct } from '../redux/reducers/productReducer';
const NewProduct = () => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const [description, setDesciption] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState(0)
    const [images, setImages] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState('')
    const { categories } = useAppSelector(state => state.categoryReducer);

    useEffect(() => {
        dispatch(fetchAllCategories());

    }, [])
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0]; // Get the selected file
        if (file) {
            const formData = new FormData();
            formData.append('file', file); // Append the file to the FormData
            imageUpload(formData);
        }
    }
    console.log(errorMessage);
    console.log(title);
    const imageUpload = (formData: FormData) => {
        axios
            .post('https://api.escuelajs.co/api/v1/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                setImages((imageArr) => [...imageArr, res.data.location]);
                console.log(res.data.location);

            })
            .catch((err) => console.error(err));
    }
    const addProduct = () =>{
        if(title === '' || price <= 0 || description === '' || category === 0 || images.length === 0){
            setErrorMessage("Please check all input again")
        }
        else{
            dispatch(createNewProduct({newProduct: {title: title, price: price, description: description, categoryId:category, images: images}}))
            console.log("successful");
        }
    }
    
    return (
        <div className='newproduct'>
            <form>
                <div>
                    <label htmlFor="title" className="title"><h4>Title</h4></label>
                    <input type="text" className="title" value={title}
                    onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="price" className="price"><h4>Price</h4></label>
                    <input type="number" className="price" value={price}
                    onChange={e => setPrice(e.target.valueAsNumber)}/>
                </div>
                <div>
                    <label htmlFor="description" className="description"><h4>Prodict description</h4></label>
                    <input type="text" className="description" value={description}
                    onChange={e => setDesciption(e.target.value)}/>
                </div>
                <div >
                    <h4>Category</h4>
                    <select id="category" name="category" onChange={(e) => setCategory(parseInt(e.target.value))}>
                        {categories.map((cat) => (
                            <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <h4>Upload 3 images for your product</h4>
                    <label htmlFor="image1" className="image1">Image 1</label>
                    <input type="file" className="image1" accept="image/png, image/gif, image/jpeg" onChange={handleImageUpload}/>
                    <div>
                        <label htmlFor="image2" className="image2">Image 2</label>
                        <input type="file" className="image2" accept="image/png, image/gif, image/jpeg" onChange={handleImageUpload}/>
                    </div>
                    <div>
                        <label htmlFor="image3" className="image3">Image 3</label>
                        <input type="file" className="image3" accept="image/png, image/gif, image/jpeg" onChange={handleImageUpload}/>
                    </div>
                </div>
                <button onClick={addProduct}>add</button>
            </form>
        </div>
    )
}

export default NewProduct
import { useState } from 'react'
import uploadImage from '../assets/grid.jpg'
import Swal from "sweetalert2";

const Addproduct = () => {
  const t = 1500
  const [preview, setPreview] = useState(null)
  const [image, setImage] = useState(null)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(null)

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)

    const previewURL = URL.createObjectURL(selectedImage)
    setPreview(previewURL)
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!image || !name || !description || !price) {
      Swal.fire({
        icon: "error",
        text: "Please Fill In all Fields",
        timer: t
      })
    }
  }

  return (
    <form className="p-[1rem] flex flex-col gap-[1rem]" onSubmit={handleUpload}>
      <button type="submit" className="border-2 border-gray-500 text-red-500 text-[1.5rem] font-bold cursor-pointer">
        UPLOAD
      </button>
      <input placeholder="Product Name" />
      <textarea placeholder="Description Of Your Product" className="h-[10rem]" />
      <input placeholder="Price" type="number" min="0.10" step="0.01" />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <img src={preview || uploadImage} alt="Preview" className="w-full object-contain" />
    </form>
  )
}

export default Addproduct

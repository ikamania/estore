import { useState } from 'react'
import uploadImage from '../assets/grid.jpg'
import Swal from "sweetalert2";
import { useAuth, url } from "../auth/Auth"


const Addproduct = () => {
  const { token } = useAuth()
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
        text: "please fill in all fields",
        timer: t
      })
      return
    }

    const priceValue = parseFloat(price)
    if (isNaN(priceValue) || priceValue <= 0 || !/^\d+(\.\d{1,2})?$/.test(price)) {
      Swal.fire({
        icon: "error",
        text: "please enter a valid price",
        timer: 2000,
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", parseFloat(price));
      formData.append("image", image);

      console.log(formData)
      const response = await fetch(`${url}/products/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Upload error:", errorData)
        Swal.fire({
          icon: "error",
          text: "failed to upload product",
          timer: t
        })
        return
      }

      const data = await response.json()
      Swal.fire({
        icon: "success",
        text: "product uploaded successfully",
        timer: t
      })

      // redirect to product page
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "something went wrong. please try again",
        timer: t
      })
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form className="p-[1rem] flex flex-col gap-3 max-w-[25rem]" onSubmit={handleUpload}>
        <h1 className="flex justify-center text-[2rem] font-bold">Your Product</h1>
        <input placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="Description Of Your Product" className="h-[10rem]" onChange={(e) => setDescription(e.target.value)} />
        <input placeholder="Price" type="number" min="0.10" step="0.01" onChange={(e) => setPrice(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <img src={preview} alt="" className="w-full object-contain" />
        <button type="submit" className="border-1 rounded-[.4rem] border-gray-500 text-[1.3rem] font-bold cursor-pointer">
          Post Product
        </button>
      </form>
    </div>
  )
}

export default Addproduct

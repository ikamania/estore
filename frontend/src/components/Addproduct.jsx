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
    <div className="w-full h-full flex justify-center items-center bg-white">
      <form
        className="p-6 flex flex-col gap-4 max-w-[25rem] w-full bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
        onSubmit={handleUpload}
      >
        <h1 className="text-center text-2xl font-bold text-gray-800">Your Product</h1>

        <input
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <textarea
          placeholder="Description Of Your Product"
          className="h-40 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Price"
          type="number"
          min="0.10"
          step="0.01"
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 rounded p-1 cursor-pointer"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-contain rounded border border-gray-200"
          />
        )}

        <button
          type="submit"
          className="p-2 bg-gray-800 text-white font-bold text-lg rounded hover:bg-gray-700 transition-colors"
        >
          Post Product
        </button>
      </form>
    </div>
  )
}

export default Addproduct
